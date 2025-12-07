import Image from "next/image";
import { BookOpen, Github, Star } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap"
});

export default function HomePage() {
    return (
        <main
            className={`${spaceGrotesk.className} relative flex min-h-screen flex-col overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]`}
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
            </div>

            <div className="relative mx-auto flex w-full max-w-xl flex-1 flex-col px-6 pb-12 pt-8">
                <section className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
                    <div className="space-y-3">
                        <Link href={'https://www.next-wora.dev/'} className="flex flex-wrap items-center justify-center gap-3 text-5xl font-semibold tracking-tight text-white">
                            <span className="flex h-12 w-12 items-center justify-center">
                                <Image
                                    src="/logo.svg"
                                    alt="Next-Wora logo"
                                    width={48}
                                    height={48}
                                    priority
                                />
                            </span>
                            <span className="leading-tight">
                                Next-Wora{" "}
                                <span className="text-base -ml-2 font-medium text-white/60">
                                    v1
                                </span>
                            </span>
                        </Link>
                        <p className="text-sm text-white/70">
                            Ready-to-ship Next.js PWA for web and mobile devices!
                        </p>
                    </div>

                    <div className="w-full space-y-3">
                        <div className="flex transition hover:scale-[0.99] hover:bg-white/10 select-none items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                            <span className="text-white/50">1.</span>
                            <div className="text-left text-white/80">
                                Get started by working like you would normally do with <span className={'text-brand-glow'}>Next</span>.js
                            </div>
                        </div>
                        <div className="flex transition hover:scale-[0.99] hover:bg-white/10 select-none items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
                            <span className="text-white/50">2.</span>
                            <p className="text-left text-white/80">
                                Let <span className={'text-brand-glow'}>Wora</span> do the rest for you!
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                        <button className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[0.99] hover:bg-primary/90 active:scale-[0.98]">
                            <BookOpen className="h-5 w-5" />
                            <span>Read our docs</span>
                        </button>
                        <button className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-base font-semibold text-white/80 backdrop-blur transition hover:scale-[0.99] hover:bg-white/10 active:scale-[0.98]">
                            <Star className="h-5 w-5 text-primary" />
                            <span>Star on GitHub</span>
                            <Github className="h-5 w-5" />
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
