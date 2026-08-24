import { ServicePage } from "@/app/components/service-page";
import { serviceMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

const service = services.maatwerksoftware;

export const metadata = serviceMetadata(service);

export default function MaatwerksoftwarePage() {
  return <ServicePage service={service} />;
}
