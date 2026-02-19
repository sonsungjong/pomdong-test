import { apiContracts } from "@/lib/api/contracts";
import {
  buildComplianceFlags,
  buildMonthlyTrend,
  buildReportSections,
  buildSiteRecords,
  buildSummary,
  createDefaultScenario,
  isServiceId,
  SERVICE_CATALOG,
  SERVICE_INDEX,
} from "@/lib/api/mockData";
import type {
  ApiEnvelope,
  ScenarioConfig,
  ServiceId,
  ServiceMeta,
  SimulationQuery,
  SimulationReport,
  SimulationResult,
  SiteSimulationRecord,
} from "@/lib/api/types";

const scenarioStore = new Map<ServiceId, ScenarioConfig>();

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

function compareNumber(a: number, b: number, order: "asc" | "desc"): number {
  return order === "asc" ? a - b : b - a;
}

function compareText(a: string, b: string, order: "asc" | "desc"): number {
  if (a === b) {
    return 0;
  }
  if (order === "asc") {
    return a > b ? 1 : -1;
  }
  return a < b ? 1 : -1;
}

function sortRecords(records: SiteSimulationRecord[], query: SimulationQuery): SiteSimulationRecord[] {
  const sorted = [...records];
  sorted.sort((left, right) => {
    if (query.sortBy === "siteName") {
      return compareText(left.siteName, right.siteName, query.sortOrder);
    }
    if (query.sortBy === "enrollmentActual") {
      return compareNumber(left.enrollmentActual, right.enrollmentActual, query.sortOrder);
    }
    if (query.sortBy === "screeningFailureRate") {
      return compareNumber(left.screeningFailureRate, right.screeningFailureRate, query.sortOrder);
    }
    return compareNumber(left.costKrwMillion, right.costKrwMillion, query.sortOrder);
  });
  return sorted;
}

function buildRiskAlerts(records: SiteSimulationRecord[]): string[] {
  if (!records.length) {
    return ["표시할 경고가 없습니다."];
  }
  const criticalCount = records.filter((record) => record.status === "critical").length;
  const watchCount = records.filter((record) => record.status === "watch").length;
  const highScreening = records.filter((record) => record.screeningFailureRate >= 25).length;
  const alerts: string[] = [];

  if (criticalCount > 0) {
    alerts.push(`Critical 기관 ${criticalCount}곳: 즉시 CAPA 점검 필요`);
  }
  if (watchCount > 0) {
    alerts.push(`Watch 기관 ${watchCount}곳: 주간 enrollment 모니터링 강화`);
  }
  if (highScreening > 0) {
    alerts.push(`Screening failure 25% 이상 기관 ${highScreening}곳`);
  }
  return alerts.length ? alerts : ["현재 유의미한 경고가 없습니다."];
}

export function resolveServiceId(raw: string): ServiceId | null {
  return isServiceId(raw) ? raw : null;
}

export async function listServices(): Promise<ApiEnvelope<ServiceMeta[]>> {
  await sleep(180);
  return {
    endpoint: apiContracts.listServices.endpoint,
    schema: apiContracts.listServices.response,
    data: clone(SERVICE_CATALOG),
  };
}

export async function getScenario(serviceId: ServiceId): Promise<ApiEnvelope<ScenarioConfig>> {
  await sleep(240);
  const scenario = scenarioStore.get(serviceId) ?? createDefaultScenario(serviceId);
  return {
    endpoint: apiContracts.getScenario.endpoint,
    schema: apiContracts.getScenario.response,
    data: clone(scenario),
  };
}

export async function saveScenario(serviceId: ServiceId, scenario: ScenarioConfig): Promise<ApiEnvelope<ScenarioConfig>> {
  await sleep(320);
  scenarioStore.set(serviceId, clone(scenario));
  return {
    endpoint: apiContracts.saveScenario.endpoint,
    schema: apiContracts.saveScenario.response,
    data: clone(scenario),
  };
}

export async function getSimulation(serviceId: ServiceId, query: SimulationQuery): Promise<ApiEnvelope<SimulationResult>> {
  await sleep(520);

  if (query.uiState === "error") {
    throw new Error("네트워크 오류(모의) 상태입니다. 다시 시도해주세요.");
  }

  const baseRecords = query.uiState === "empty" ? [] : buildSiteRecords(serviceId);

  const searched = baseRecords.filter((record) => {
    if (!query.search.trim()) {
      return true;
    }
    const keyword = query.search.trim().toLowerCase();
    return record.siteName.toLowerCase().includes(keyword) || record.country.toLowerCase().includes(keyword);
  });

  const statusFiltered =
    query.status === "all" ? searched : searched.filter((record) => record.status === query.status);

  const sorted = sortRecords(statusFiltered, query);
  const total = sorted.length;
  const offset = (query.page - 1) * query.pageSize;
  const records = sorted.slice(offset, offset + query.pageSize);
  const summary = buildSummary(baseRecords);
  const monthlyTrend = query.uiState === "empty" ? [] : buildMonthlyTrend(serviceId);

  return {
    endpoint: apiContracts.getSimulation.endpoint,
    schema: apiContracts.getSimulation.response,
    data: {
      summary,
      monthlyTrend,
      records,
      total,
      riskAlerts: buildRiskAlerts(baseRecords),
    },
  };
}

export async function getReport(serviceId: ServiceId): Promise<ApiEnvelope<SimulationReport>> {
  await sleep(300);
  const records = buildSiteRecords(serviceId);
  const summary = buildSummary(records);
  return {
    endpoint: apiContracts.getReport.endpoint,
    schema: apiContracts.getReport.response,
    data: {
      generatedAt: new Date().toISOString(),
      owner: SERVICE_INDEX[serviceId].ownerTeam,
      sections: buildReportSections(serviceId, summary),
      complianceFlags: buildComplianceFlags(serviceId),
    },
  };
}
