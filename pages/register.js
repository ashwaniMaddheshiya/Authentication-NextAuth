import { registerValidate } from "@/lib/validate";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch(
      "http://localhost:3000/api/auth/signup",
      options
    );
    const data = response.json();
    if (data) {
      router.push("/");
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-orange-500">
                  Welcome to the #HashTag
                </h1>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="name"
                        name="name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                      />
                      <label
                        for="name"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Name
                      </label>
                    </div>
                    {formik.errors.name && formik.touched.name ? (
                      <span className="text-rose-500 text-xs">
                        {formik.errors.name}
                      </span>
                    ) : (
                      <></>
                    )}

                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="email"
                        name="email"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                        {...formik.getFieldProps("email")}
                      />
                      <label
                        for="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    {formik.errors.email && formik.touched.email ? (
                      <span className="text-rose-500 text-xs">
                        {formik.errors.email}
                      </span>
                    ) : (
                      <></>
                    )}
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="password"
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                      />
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    {formik.errors.password && formik.touched.password ? (
                      <span className="text-rose-500 text-xs">
                        {formik.errors.password}
                      </span>
                    ) : (
                      <></>
                    )}
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="cpassword"
                        name="cpassword"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-sm font-semibold text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Confirm Password"
                        {...formik.getFieldProps("cpassword")}
                      />
                      <label
                        for="cpassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Confirm Password
                      </label>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? (
                      <span className="text-rose-500 text-xs">
                        {formik.errors.cpassword}
                      </span>
                    ) : (
                      <></>
                    )}
                    <div className="relative">
                      <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                        Submit
                      </button>
                    </div>
                    <span className="text-sm ml-2">
                      Already have an account ? &nbsp;
                      <span className="text-blue-600  hover:underline cursor-pointer">
                        <Link href="/login">Sign In</Link>
                      </span>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
