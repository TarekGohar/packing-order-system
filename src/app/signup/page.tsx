import PhoneInput from "@/components/PhoneInput";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="py-12 px-10 w-full max-w-lg flex items-center justify-center flex-col rounded-xl space-y-6">
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
