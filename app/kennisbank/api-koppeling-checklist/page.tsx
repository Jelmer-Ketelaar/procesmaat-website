import { KnowledgeArticlePage } from "@/app/components/knowledge-article";
import { knowledgeArticles } from "@/lib/knowledge";
import { knowledgeMetadata } from "@/lib/metadata";

const article = knowledgeArticles["api-koppeling-checklist"];
export const metadata = knowledgeMetadata(article);

export default function ApiKoppelingChecklistPage() {
  return <KnowledgeArticlePage article={article} />;
}

