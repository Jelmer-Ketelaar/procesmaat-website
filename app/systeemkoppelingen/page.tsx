import { ServicePage } from "@/app/components/service-page";
import { serviceMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

const service = services.systeemkoppelingen;

export const metadata = serviceMetadata(service);

export default function SysteemkoppelingenPage() {
  return <ServicePage service={service} />;
}
