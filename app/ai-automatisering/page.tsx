import { ServicePage } from "@/app/components/service-page";
import { serviceMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

const service = services["ai-automatisering"];
export const metadata = serviceMetadata(service);

export default function AiAutomatiseringPage() {
  return <ServicePage service={service} />;
}
