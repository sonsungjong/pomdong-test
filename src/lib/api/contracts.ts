import type { SimulationQuery } from "@/lib/api/types";

export const apiContracts = {
  listServices: {
    endpoint: "GET /api/v1/services",
    response: "ServiceMeta[]",
  },
  getScenario: {
    endpoint: "GET /api/v1/services/:serviceId/scenario",
    response: "ScenarioConfig",
  },
  saveScenario: {
    endpoint: "PUT /api/v1/services/:serviceId/scenario",
    request: "ScenarioConfig",
    response: "ScenarioConfig",
  },
  getSimulation: {
    endpoint: "POST /api/v1/services/:serviceId/simulation/query",
    request: "SimulationQuery",
    response: "SimulationResult",
  },
  getReport: {
    endpoint: "GET /api/v1/services/:serviceId/report",
    response: "SimulationReport",
  },
} as const;

export const defaultSimulationQuery: SimulationQuery = {
  page: 1,
  pageSize: 8,
  search: "",
  status: "all",
  sortBy: "enrollmentActual",
  sortOrder: "desc",
  uiState: "normal",
};
