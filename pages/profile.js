import Navbar from "@/components/NavBar";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { registerValidate } from "@/lib/validate";

const Profile = () => {
  const session = useSession();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: session.data.user.name,
      email: session.data.user.email,
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    const response = await fetch("/api/auth/signup", options);

    if (response.ok) {
      router.push("/");
    } else {
      const data = await response.json();
    }
  }

  return (
    <>
      <Navbar />
      <h3 className="text-2xl font-bold text-gray-800 text-center mt-4">
        Update Profile
      </h3>
      <br />
      <hr />
      <div className="flex justify-center mt-8">
        <form className="w-full max-w-sm" onSubmit={formik.handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3 text-right">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                {...formik.getFieldProps("name")}
              />
              {formik.errors.name && formik.touched.name ? (
                <span className="text-rose-500 text-xs">
                  {formik.errors.name}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3 text-right">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                readOnly="readOnly"
                {...formik.getFieldProps("email")}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3 text-right">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                placeholder="******************"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <span className="text-rose-500 text-xs">
                  {formik.errors.password}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Confirm Password
              </label>
            </div>
            <div className="md:w-2/3 text-right">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                placeholder="******************"
                {...formik.getFieldProps("cpassword")}
              />
              {formik.errors.cpassword && formik.touched.cpassword ? (
                <span className="text-rose-500 text-xs">
                  {formik.errors.cpassword}
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="flex items-center justify-evenly">
            <div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link href="/">Home</Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  // authorize user return session
  return {
    props: { session },
  };
}
