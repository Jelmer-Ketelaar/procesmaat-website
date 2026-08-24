import { ServicePage } from "@/app/components/service-page";
import { serviceMetadata } from "@/lib/metadata";
import { services } from "@/lib/services";

const service = services.procesautomatisering;

export const metadata = serviceMetadata(service);

export default function ProcesautomatiseringPage() {
  return <ServicePage service={service} />;
}
