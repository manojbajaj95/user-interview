import About from "@/components/landing/about";
import Hero from "@/components/landing/hero";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Example() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <Header items={MainNav} />
          <nav>
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" })
              )}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  );
}
