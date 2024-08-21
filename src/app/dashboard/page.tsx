import { getSession } from "@/auth/actions";
import MostRecent from "@/components/dashboard/MostRecent";
import OrderActions from "@/components/dashboard/OrderActions";
import RecentlyViewed from "@/components/dashboard/RecentlyViewed";
import LogoutForm from "@/components/LogoutForm";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  console.log(session);
  if (!session.isLoggedIn) {
    redirect("/signin");
  }
  return (
    <section>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-6 space-y-8">
        <div className="text-3xl font-semibold">Dashboard</div>
        <div className="md:px-6 space-y-8">
          <OrderActions />
          <MostRecent session={session} />
          <RecentlyViewed session={session} />
        </div>
      </div>
    </section>
  );
}
