import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitcherProps {
  className?: string;
  variant?: "outline" | "ghost";
}

const ThemeSwitcher = ({
  variant = "outline",
  className,
}: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={className}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeSwitcher;

{
  /* <Button
  variant="ghost"
  size="icon"
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  aria-label="Toggle theme"
>
  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
</Button>; */
}
