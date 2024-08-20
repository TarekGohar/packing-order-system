import { signout } from "@/auth/actions";

export default function LogoutForm() {
  return (
    <form action={signout}>
      <button className="w-full h-12 bg-black text-white rounded-lg mt-8">
        Sign Out
      </button>
    </form>
  );
}
