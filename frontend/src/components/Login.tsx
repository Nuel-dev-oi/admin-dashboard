import { useEffect, useRef, useState, type JSX } from "react";
import { Link, useNavigate } from "react-router";
import axios, { AxiosError } from "axios";

interface Props {
  onSetUser: (value: User) => void;
}

interface UserIndentity {
  user: {
    name: string;
    isAdmin: boolean;
  };
  token: string;
}

interface User {
  name: string;
  isAdmin: boolean;
}

const Login = ({ onSetUser }: Props): JSX.Element => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const tokenRef = useRef<string>(localStorage.getItem("token") || "");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/login";
      if (!email || !password) {
        throw new Error("name, email and password are required");
      }
      const body = { email, password };
      const response = await axios.post(url, body);
      const { user, token }: UserIndentity = response.data;
      if (user) {
        setMessage("User created");
        localStorage.setItem("user", JSON.stringify(user));
        onSetUser(user);
      }
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong, please try again later.";
      setMessage(message);
      if (err instanceof AxiosError) {
        setMessage(err.response?.data.message || "Error, please sign up");
      }
    }
  };

  useEffect(() => {
    if (tokenRef.current) {
      navigate("/");
    }
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
      <h1 className="text-3xl text-orange-400">Login</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-2 justify-around items-center min-h-max h-[30vh] min-w-max w-[30%] shadow-[0px_2px_5px_1px_rgb(0,0,0)] p-4 rounded"
      >
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

        <button
          type="submit"
          className="text-orange-400 rounded bg-blue-500 text-center p-2 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
        >
          Login
        </button>
      </form>
      <p>{message}</p>
      <Link
        to="/signup"
        className="bg-blue-600 rounded p-1 absolute top-1 right-1 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
      >
        Sign up
      </Link>
    </div>
  );
};

export default Login;
