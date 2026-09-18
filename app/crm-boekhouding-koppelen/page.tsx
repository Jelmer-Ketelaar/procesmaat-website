import { ServicePage } from "@/app/components/service-page";
import { serviceMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

const service = services["crm-boekhouding-koppelen"];
export const metadata = serviceMetadata(service);

export default function CrmBoekhoudingPage() {
  return <ServicePage service={service} />;
}
