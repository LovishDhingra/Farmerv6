import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Tag } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: "policy" | "market" | "technology" | "weather" | "advisory";
  tags: string[];
  source: string;
  publishedAt: string;
  imageEmoji: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  policy: "Policy",
  market: "Market",
  technology: "Technology",
  weather: "Weather",
  advisory: "Advisory",
};

const CATEGORY_COLORS: Record<string, string> = {
  policy: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  market: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  technology: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
  weather: "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300",
  advisory: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300",
};

const CATEGORIES = [
  { value: "all", label: "All News" },
  { value: "policy", label: "Policy" },
  { value: "market", label: "Market" },
  { value: "technology", label: "Technology" },
  { value: "weather", label: "Weather" },
  { value: "advisory", label: "Advisory" },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return "Just now";
}

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const url =
      activeCategory === "all"
        ? "/api/news"
        : `/api/news?category=${activeCategory}`;
    fetch(url)
      .then((r) => r.json())
      .then((data: NewsArticle[]) => {
        setArticles(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [activeCategory]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Farmer News</h1>
        <p className="text-muted-foreground mt-1">
          Latest updates on agricultural policy, market trends, weather, and crop advisories.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => { setActiveCategory(cat.value); setExpandedId(null); }}
            className="rounded-full"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array(6).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <Skeleton className="h-10 w-10 rounded-xl mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-1" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))
          : articles.length === 0
          ? (
            <div className="col-span-full text-center py-16 bg-card border rounded-lg">
              <p className="text-4xl mb-4">📰</p>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try a different category.</p>
            </div>
          )
          : articles.map((article) => {
              const isExpanded = expandedId === article.id;
              return (
                <Card
                  key={article.id}
                  className="flex flex-col overflow-hidden hover-elevate transition-all border-t-4 border-t-primary/40 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : article.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-3xl">{article.imageEmoji}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs shrink-0 ${CATEGORY_COLORS[article.category]}`}
                      >
                        {CATEGORY_LABELS[article.category]}
                      </Badge>
                    </div>
                    <CardTitle className="text-base leading-snug line-clamp-3">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timeAgo(article.publishedAt)}
                      </span>
                      <span className="truncate">{article.source}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.summary}
                    </p>

                    {isExpanded && (
                      <div className="pt-2 border-t space-y-3 animate-in fade-in duration-200">
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {article.content}
                        </p>
                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            <Tag className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                            {article.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-primary font-medium pt-1">
                      {isExpanded ? "▲ Show less" : "▼ Read more"}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
}
