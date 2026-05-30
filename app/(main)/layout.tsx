import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Providers from "@/components/providers/SessionProvider";
import GameSidebar from "@/components/layout/GameSidebar";
import Footer from "@/components/layout/Footer";
import HeaderModern from "@/components/layout/HeaderModern";
import GameSidebarModern from "@/components/layout/GameSidebarModern";
import FooterModern from "@/components/layout/FooterModern";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) redirect("/login");

  return (
    <Providers>
      <div className="flex min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-yellow-300 selection:text-slate-900 relative overflow-hidden">
        {/* 🌤️ SKY + FIELD BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-white to-emerald-50 pointer-events-none z-0" />

        {/* 🌈 Soft World Cup Glow */}
        <div className="absolute top-0 left-64 right-0 h-[500px] bg-gradient-to-b from-emerald-400/20 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />
        <div className="absolute right-0 top-20 w-[400px] h-[400px] bg-yellow-300/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute left-72 bottom-0 w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* ⚽ LIGHT FIELD GRID (subtle) */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(0deg, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
        />

        {/* Sidebar */}
        <GameSidebarModern />

        {/* Content */}
        <div className="flex-1 pl-64 flex flex-col min-h-screen relative z-10">
          <HeaderModern />

          {/* 🚀 FULL WIDTH CONTENT (no more boxed layout) */}
          <main className="flex-1 w-full">{children}</main>
          <FooterModern />
        </div>
      </div>
    </Providers>
  );
}
