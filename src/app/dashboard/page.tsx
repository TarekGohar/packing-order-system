import { getSession } from "@/auth/actions";
import RecentlyViewed from "@/components/dashboard/Recently-Viewed";
import LogoutForm from "@/components/LogoutForm";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  const session = await getSession();
  console.log(session);
  return (
    <section>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-12 space-y-8">
        <div className="text-3xl font-semibold">Dashboard</div>
        <RecentlyViewed session={session} />
      </div>
    </section>
  );
}
