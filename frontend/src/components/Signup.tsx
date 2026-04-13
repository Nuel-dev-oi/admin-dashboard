import { useEffect, useState, type JSX } from "react";
import { Link, useNavigate } from "react-router";
import axios, { AxiosError } from "axios";

const Signup = (): JSX.Element => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/users";
      if (!name || !email || !password) {
        throw new Error("A name, email and password are required");
      }
      const body = { name, email, password, isAdmin };
      const response = await axios.post(url, body);
      const data = response.data.user;
      if (data) {
        setMessage("User created");
        navigate("/login");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong, please try again later.";
      setMessage(message);
      console.log(err);
      if (err instanceof AxiosError) {
        setMessage(
          err.response?.data.message || "Duplicate user, please login up",
        );
        console.log(err.response?.data);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    let timerId: number | undefined;
    if (message) {
      timerId = setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [message]);

  return (
    <div className="relative flex flex-col min-h-screen justify-center items-center bg-gray-200">
      <h1 className="text-3xl text-orange-400">Sign Up</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-2 justify-center items-center min-h-max h-[50vh] min-w-max w-[30%] p-4 rounded shadow-[0px_2px_5px_1px_rgb(0,0,0)]"
      >
        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="name" className="text-orange-400">
            Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={name}
            placeholder="name"
            className="border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-2 text-[14px]"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="email" className="text-orange-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={email}
            placeholder="email"
            className="border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-2 text-[14px] "
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="password" className="text-orange-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            defaultValue={password}
            placeholder="password"
            className="border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-2 text-[14px] "
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-center items-center gap-2 text-xl w-[50%]">
          <input
            type="checkbox"
            id="admin"
            checked={isAdmin}
            onChange={() => {
              setIsAdmin(!isAdmin);
            }}
          />
          <label htmlFor="admin" className="text-orange-400">
            Admin
          </label>
        </div>
        <button
          type="submit"
          className="text-orange-400 rounded bg-blue-500 text-center p-2 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
        >
          Sign up
        </button>
      </form>
      <p>{message}</p>

      <div className=" absolute top-1 right-1 flex min-w-max gap-2 justify-center items-center min-h-max">
        <Link
          to="/"
          className="bg-blue-600 rounded p-1 flex-1 whitespace-nowrap cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
        >
          Home Page
        </Link>
        <Link
          to="/login"
          className="bg-blue-600 rounded p-1 flex-1 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
