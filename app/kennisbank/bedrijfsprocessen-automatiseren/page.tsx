import { KnowledgeArticlePage } from "@/app/components/knowledge-article";
import { knowledgeArticles } from "@/lib/knowledge";
import { knowledgeMetadata } from "@/lib/metadata";

const article = knowledgeArticles["bedrijfsprocessen-automatiseren"];
export const metadata = knowledgeMetadata(article);

export default function BedrijfsprocessenAutomatiserenPage() {
  return <KnowledgeArticlePage article={article} />;
}

