import { KnowledgeArticlePage } from "@/app/components/knowledge-article";
import { knowledgeArticles } from "@/lib/knowledge";
import { knowledgeMetadata } from "@/lib/metadata";

const article = knowledgeArticles["maatwerksoftware-of-standaardpakket"];
export const metadata = knowledgeMetadata(article);

export default function MaatwerksoftwareOfStandaardpakketPage() {
  return <KnowledgeArticlePage article={article} />;
}

