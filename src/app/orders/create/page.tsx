import CreateNewForm from "@/components/CreateNewForm";
import CreatePage from "@/components/CreatePage";
import Navbar from "@/components/Navbar";

export default function CreateNewOrderPage() {
  return (
    <section>
      <Navbar />
      <div className="mx-auto w-4/5 my-12 min-h-[80vh] max-w-md flex items-center justify-center">
        <CreatePage />
      </div>
    </section>
  );
}
