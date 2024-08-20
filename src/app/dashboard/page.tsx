import { getSession } from "@/auth/actions";
import LogoutForm from "@/components/LogoutForm";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getSession();
  console.log(session);
  return (
    <div>
      <div>Dashboard</div>
      Session is logged in: {session.isLoggedIn ? "true" : "false"}
      <LogoutForm />
    </div>
  );
}
