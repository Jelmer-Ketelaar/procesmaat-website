import { ServicePage } from "@/app/components/service-page";
import { serviceMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

const service = services["ai-agents"];
export const metadata = serviceMetadata(service);

export default function AiAgentsPage() {
  return <ServicePage service={service} />;
}
