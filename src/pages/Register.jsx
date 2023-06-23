import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import { SERVER_BASE_URL } from "../secret";
import axios from "axios";

export default function Register() {

  const navigate = useNavigate();

  const emailElem = useRef();
  const userElem = useRef();
  const passElem = useRef();
  const regbtn = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !emailElem.current.value ||
      !userElem.current.value ||
      (emailElem.current.value.length < 6)
    )
    {
      passElem.current.value = "";
      return toast.error("Invalid Credentils entered");
    }
    regbtn.current.disabled=true;
      try {
        let result = await axios.post(SERVER_BASE_URL+"/api/register", {
          email: emailElem.current.value,
          username: userElem.current.value,
          password: passElem.current.value,
        });
        localStorage.setItem("auth-token", result.data.token);
        localStorage.setItem("uname", result.data.username);
        toast.success("Registration Successfull");
        navigate("/");
      } catch (error) {
        toast.error(error.response.data);
      }
      regbtn.current.disabled=false;
      passElem.current.value = "";
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        transition={Slide}
        hideProgressBar={1}
        theme="dark"
      />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleRegister(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                  ref={emailElem}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                  ref={userElem}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="johndoe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                  ref={passElem}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="•••••••• (min. 6 characters)"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  ref={regbtn}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already Registered? 
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
