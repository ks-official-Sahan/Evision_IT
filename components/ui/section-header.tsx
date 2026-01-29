import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 lg:mb-14",
        {
          "text-center": align === "center",
          "text-left": align === "left",
        },
        className
      )}
    >
      {badge && (
        <Badge variant="secondary" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
