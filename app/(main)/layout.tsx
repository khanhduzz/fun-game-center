import Header from "@/components/layout/Header";
// import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Providers from "@/components/providers/SessionProvider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth();
  const session = await getServerSession(authConfig);

  if (!session) redirect("/login");

  return (
    <Providers>
      <div className="min-h-screen bg-zinc-950 text-white">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </Providers>
  );
}
