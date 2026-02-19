"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isServiceId, SERVICE_INDEX } from "@/lib/api/mockData";

const serviceTabs = [
  { slug: "scenario", label: "조건 설정" },
  { slug: "simulation", label: "시뮬레이션" },
  { slug: "report", label: "리포트" },
] as const;

export function ServiceTabs() {
  const pathname = usePathname();
  const params = useParams<{ serviceId: string }>();
  const serviceId = isServiceId(params.serviceId) ? params.serviceId : null;

  if (!serviceId) {
    return (
      <section className="service-header glass-panel">
        <h2 className="ui-card-title">서비스를 찾을 수 없습니다.</h2>
      </section>
    );
  }

  const service = SERVICE_INDEX[serviceId];

  return (
    <section className="service-header glass-panel">
      <p className="eyebrow">{service.code}</p>
      <h2 className="ui-card-title">{service.name}</h2>
      <p className="service-description">{service.description}</p>
      <div className="tabs" role="tablist" aria-label="서비스 페이지 탭">
        {serviceTabs.map((tab) => {
          const href = `/services/${service.id}/${tab.slug}`;
          const active = pathname === href;
          return (
            <Link key={tab.slug} href={href} className={cn("tab-link", active && "is-current")}>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
