import Header from "@/components/layout/Header";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Providers from "@/components/providers/SessionProvider";
import GameSidebar from "@/components/layout/GameSidebar";
import Footer from "@/components/layout/Footer";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) redirect("/login");

  return (
    <Providers>
      <div className="flex min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black">
        <GameSidebar />
        <div className="flex-1 pl-64 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 max-w-6xl w-full mx-auto p-8 pt-10">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </Providers>
  );
}
