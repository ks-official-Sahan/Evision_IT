import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ServiceCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="mt-4 h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
        <Skeleton className="mt-4 h-4 w-24" />
      </CardContent>
    </Card>
  );
}

export function CaseStudyCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-2 h-5 w-full" />
        <Skeleton className="mt-1 h-5 w-4/5" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-3/4" />
        <Skeleton className="mt-4 h-4 w-28" />
      </CardContent>
    </Card>
  );
}

export function PostCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-5">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="mt-3 h-5 w-full" />
        <Skeleton className="mt-1 h-5 w-4/5" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      </CardContent>
    </Card>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-10 w-3/4 max-w-xl" />
      <Skeleton className="h-5 w-full max-w-2xl" />
      <Skeleton className="h-5 w-2/3 max-w-xl" />
    </div>
  );
}

export function ServiceDetailSkeleton() {
  return (
    <div className="space-y-8">
      <PageHeaderSkeleton />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
