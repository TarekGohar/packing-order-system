import Image from "next/image";

export default function Login() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="px-16 py-12 flex flex-col rounded-xl divide-y space-y-12">
        <div>
          <h1 className="font-semibold text-3xl">Login</h1>
          <h2 className="mt-2 font-light">
            Please enter your details to sign in.
          </h2>
          <div className="mt-8 flex flex-row gap-x-4">
            <button className="w-32 h-12 flex items-center justify-center rounded-lg border-2">
              <Image
                src={"/images/apple_logo.svg"}
                alt="Apple Inc. logo"
                width={24}
                height={24}
                className="h-1/2"
              />
            </button>
            <button className="w-32 h-12 flex items-center justify-center rounded-lg border-2">
              <Image
                src={"/images/google_logo.svg"}
                alt="Apple Inc. logo"
                width={24}
                height={24}
                className="h-1/2"
              />
            </button>
            <button className="w-32 h-12 flex items-center justify-center rounded-lg border-2">
              <Image
                src={"/images/x_logo.svg"}
                alt="Apple Inc. logo"
                width={24}
                height={24}
                className="h-1/2"
              />
            </button>
          </div>
        </div>
        <div className="pt-12">
          <h1>Email Address</h1>
          <input
            type="email"
            className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none"
            placeholder="Enter your email address"
          />
          <h1 className="mt-4">Password</h1>
          <input
            type="password"
            className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none"
            placeholder="&#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226; &#8226;"
          />
          <button className="w-full h-12 bg-black text-white rounded-lg mt-8">
            Sign In
          </button>
          <div className="mt-4 flex justify-center items-center gap-x-1">
            <span>Don&apos;t have an account yet?</span>
            <button className="font-semibold">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
