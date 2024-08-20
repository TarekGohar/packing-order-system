import Image from "next/image";
import SignInForm from "@/components/SignInForm";

export default function Login() {
  return (
    <div className="w-screen h-[70vh] flex items-center justify-center">
      <div className="py-12 flex flex-col rounded-xl space-y-12">
        <div>
          <h1 className="font-semibold text-3xl">Login</h1>
          <h2 className="mt-2 font-light">
            Please enter your details to sign in.
          </h2>

          {/* Social Logins */}
          <div className="mt-8 flex flex-row gap-x-4">
            <button className="w-32 h-12 flex items-center justify-center rounded-lg border-2 opacity-50">
              <Image
                src={"/images/apple_logo.svg"}
                alt="Apple Inc. logo"
                width={24}
                height={24}
                className="h-1/2"
              />
            </button>

            <button className="w-32 h-12 flex items-center justify-center rounded-lg border-2 opacity-50">
              <Image
                src={"/images/google_logo.svg"}
                alt="Google Inc. logo"
                width={24}
                height={24}
                className="h-1/2 "
              />
            </button>

            <button className="w-32 h-12 flex items-center justify-center rounded-lg border-2 opacity-50">
              <Image
                src={"/images/x_logo.svg"}
                alt="X Inc. logo"
                width={24}
                height={24}
                className="h-1/2"
              />
            </button>
          </div>
        </div>

        {/* Dividor */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-neutral-300"></div>
          <span className="flex-shrink mx-4 font-light text-neutral-300">
            or
          </span>
          <div className="flex-grow border-t border-neutral-300"></div>
        </div>

        {/* Login Form */}
        <div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
