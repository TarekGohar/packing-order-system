import CreateNewForm from "@/components/CreateNewForm";
import CreatePage from "@/components/CreatePage";
import Navbar from "@/components/Navbar";

export default function CreateNewOrderPage() {
  return (
    <section>
      <Navbar />
      <div className="flex items-center justify-center">
        <CreatePage />
      </div>
    </section>
  );
}
