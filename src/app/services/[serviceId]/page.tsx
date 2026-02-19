import { redirect } from "next/navigation";

interface ServiceRootPageProps {
  params: Promise<{ serviceId: string }>;
}

export default async function ServiceRootPage({ params }: ServiceRootPageProps) {
  const { serviceId } = await params;
  redirect(`/services/${serviceId}/scenario`);
}

