import PhoneInput from "@/components/PhoneInput";

export default function SignUpPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="px-16 py-12 flex flex-col rounded-xl space-y-12">
        <div>
          <h1 className="font-semibold text-3xl">Sign Up</h1>
          <h2 className="mt-2 font-light">
            Please enter your details below to sign up.
          </h2>
        </div>

        <form actions={undefined} className="">
          <h1>First Name</h1>
          <input
            type="email"
            name="email"
            className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none"
            required
            placeholder="Enter your email address"
          />
          <h1>Last Name</h1>
          <input
            type="email"
            name="email"
            className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none"
            required
            placeholder="Enter your email address"
          />
          <h1>Email Address</h1>
          <input
            type="email"
            name="email"
            className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none"
            required
            placeholder="Enter your email address"
          />
          <h1 className="">Password</h1>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
          />
          <h1 className="">Confirm Password</h1>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none"
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
          />
          <button className="w-full h-12 bg-black text-white rounded-lg mt-8">
            Sign In
          </button>
          <div className="mt-4 flex justify-center items-center gap-x-1">
            <span>Don&apos;t have an account yet?</span>
          </div>
        </form>
      </div>
    </div>
  );
}
