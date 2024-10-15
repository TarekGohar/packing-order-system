import PhoneInput from "@/components/PhoneInput";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="w-full min-h-[90vh] sm:min-h-screen flex flex-col items-center justify-center">
      <div className="w-4/5 max-w-md flex flex-col rounded-xl space-y-12">
        <div className="w-full">
          <h1 className="font-semibold text-3xl">Sign Up</h1>
          <h2 className="mt-2 font-light">
            Please enter your details below to sign up.
          </h2>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
