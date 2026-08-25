import { KnowledgeArticlePage } from "@/app/components/knowledge-article";
import { knowledgeArticles } from "@/lib/knowledge";
import { knowledgeMetadata } from "@/lib/metadata";

const article = knowledgeArticles["welk-proces-automatiseren"];
export const metadata = knowledgeMetadata(article);

export default function WelkProcesAutomatiserenPage() {
  return <KnowledgeArticlePage article={article} />;
}

