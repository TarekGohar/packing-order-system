import CreateNewForm from "@/components/CreateNewForm";
import CreateNewPage from "@/components/dashboard/CreateNewPage";
import Navbar from "@/components/Navbar";

export default function CreatePage() {
  return (
    <section>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="max-w-lg w-full bg-neutral-50 rounded-xl p-8">
          <h1 className="font-semibold text-3xl">Create New Order</h1>
          <h2 className="mt-2 font-light">
            Please enter the order details to proceed.
          </h2>
          {/* <CreateNewForm /> */}
          <CreateNewPage />
        </div>
      </div>
    </section>
  );
}
