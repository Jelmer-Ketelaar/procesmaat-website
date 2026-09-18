import { ServicePage } from "@/app/components/service-page";
import { serviceMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

const service = services["factuur-documentverwerking"];
export const metadata = serviceMetadata(service);

export default function FactuurDocumentverwerkingPage() {
  return <ServicePage service={service} />;
}
