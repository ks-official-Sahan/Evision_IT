import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="text-muted-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    </Container>
  );
}
