import { logout } from "@/actions";

export default function LogoutForm() {
  return (
    <form action={logout}>
      <button className="w-full h-12 bg-black text-white rounded-lg mt-8">
        Sign Out
      </button>
    </form>
  );
}
