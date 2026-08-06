import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, BookOpen } from "lucide-react";

interface ModuleSummary {
  id: number;
  title: string;
  description: string;
  category: "market" | "crop" | "finance" | "rights" | "technology";
  difficulty: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  emoji: string;
  lessonCount: number;
}

interface EducationLesson {
  id: number;
  title: string;
  content: string;
  keyTakeaways: string[];
}

interface EducationModule extends ModuleSummary {
  lessons: EducationLesson[];
}

const CATEGORY_LABELS: Record<string, string> = {
  market: "Market",
  crop: "Crop Science",
  finance: "Finance",
  rights: "Your Rights",
  technology: "Technology",
};

const CATEGORY_COLORS: Record<string, string> = {
  market: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  crop: "bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-900/30 dark:text-lime-300",
  finance: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300",
  rights: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  technology: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  advanced: "bg-rose-100 text-rose-700 border-rose-200",
};

const CATEGORIES = [
  { value: "all", label: "All Topics" },
  { value: "market", label: "Market" },
  { value: "finance", label: "Finance" },
  { value: "rights", label: "Your Rights" },
  { value: "crop", label: "Crop Science" },
  { value: "technology", label: "Technology" },
];

// ─── Module Reader ────────────────────────────────────────────────────────────
function ModuleReader({
  module,
  onClose,
}: {
  module: EducationModule;
  onClose: () => void;
}) {
  const [lessonIdx, setLessonIdx] = useState(0);
  const lesson = module.lessons[lessonIdx];
  const isFirst = lessonIdx === 0;
  const isLast = lessonIdx === module.lessons.length - 1;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Back button + progress */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1 -ml-2">
          <ChevronLeft className="h-4 w-4" /> Back to modules
        </Button>
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((lessonIdx + 1) / module.lessons.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {lessonIdx + 1} / {module.lessons.length}
        </span>
      </div>

      {/* Module title */}
      <div className="flex items-start gap-3">
        <span className="text-4xl mt-0.5">{module.emoji}</span>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{module.title}</h2>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className={CATEGORY_COLORS[module.category]}>
              {CATEGORY_LABELS[module.category]}
            </Badge>
            <Badge variant="outline" className={DIFFICULTY_COLORS[module.difficulty]}>
              {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <Card className="border-primary/20">
        <CardHeader className="pb-4 border-b">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              {lessonIdx + 1}
            </span>
            <CardTitle className="text-xl">{lesson.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <p className="text-foreground/90 leading-relaxed text-base">{lesson.content}</p>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 space-y-3">
            <h4 className="font-bold text-primary flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4" /> Key Takeaways
            </h4>
            <ul className="space-y-2">
              {lesson.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span className="text-primary mt-0.5 shrink-0">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setLessonIdx((i) => i - 1)}
          disabled={isFirst}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {isLast ? (
          <Button onClick={onClose} className="gap-2">
            <CheckCircle2 className="h-4 w-4" /> Complete Module
          </Button>
        ) : (
          <Button onClick={() => setLessonIdx((i) => i + 1)} className="gap-1">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Education() {
  const [modules, setModules] = useState<ModuleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeModule, setActiveModule] = useState<EducationModule | null>(null);
  const [loadingModule, setLoadingModule] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const url =
      activeCategory === "all"
        ? "/api/education"
        : `/api/education?category=${activeCategory}`;
    fetch(url)
      .then((r) => r.json())
      .then((data: ModuleSummary[]) => {
        setModules(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [activeCategory]);

  function openModule(id: number) {
    setLoadingModule(true);
    fetch(`/api/education/${id}`)
      .then((r) => r.json())
      .then((data: EducationModule) => {
        setActiveModule(data);
        setLoadingModule(false);
      })
      .catch(() => setLoadingModule(false));
  }

  if (activeModule) {
    return (
      <ModuleReader
        module={activeModule}
        onClose={() => setActiveModule(null)}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Farmer Education</h1>
        <p className="text-muted-foreground mt-1">
          Free learning modules on markets, finance, crop management, and your legal rights.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.value}
            variant={activeCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.value)}
            className="rounded-full"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Module grid */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array(6).fill(0).map((_, i) => (
              <Card key={i} className="h-60">
                <CardHeader>
                  <Skeleton className="h-10 w-10 rounded-xl mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
          : modules.length === 0
          ? (
            <div className="col-span-full text-center py-16 bg-card border rounded-lg">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-semibold mb-2">No modules found</h3>
              <p className="text-muted-foreground">Try a different category.</p>
            </div>
          )
          : modules.map((mod) => (
              <Card
                key={mod.id}
                className="flex flex-col hover-elevate transition-all cursor-pointer border-t-4 border-t-primary/40 group"
                onClick={() => openModule(mod.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-3xl">{mod.emoji}</span>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className={`text-xs ${CATEGORY_COLORS[mod.category]}`}>
                        {CATEGORY_LABELS[mod.category]}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${DIFFICULTY_COLORS[mod.difficulty]}`}>
                        {mod.difficulty.charAt(0).toUpperCase() + mod.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                    {mod.title}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2 text-sm">
                    {mod.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {mod.lessonCount} {mod.lessonCount === 1 ? "lesson" : "lessons"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {mod.durationMinutes} min
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-3 group-hover:bg-primary/90 transition-colors"
                    disabled={loadingModule}
                  >
                    {loadingModule ? "Loading…" : "Start Learning →"}
                  </Button>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
