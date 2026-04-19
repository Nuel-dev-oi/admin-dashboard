import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import Loader from "../components/Loading";
import { Link, useNavigate } from "react-router";
import TicketTable from "./TicketTable";

interface Props {
  user: User;
}

interface User {
  name: string;
  isAdmin: boolean;
}

const Home = ({ user }: Props): React.JSX.Element => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const tokenRef = useRef<string>(localStorage.getItem("token") || "");
  const [logout, setLogout] = useState(false);

  const mapedData = data.length > 0 && <TicketTable tickets={data} />;

  const fetchTickets = async () => {
    try {
      setError("");
      setLoading(true);
      const url = `http://localhost:3000/api/tickets/?token=${tokenRef.current}`;
      const response = await axios.get(url);
      const data = response.data.message;
      if (data) {
        console.log(data);
        setLoading(false);
        setData(data);
      }
    } catch (err) {
      setLoading(false);
      setError(
        "Sorry, data can't be fetched at the moment, please try again later",
      );
      console.log(err);
      if (err instanceof AxiosError) {
        console.log("yes, axios Error");
        console.log(err.response?.data);
        setError(err.response?.data.error);
        if (err.response?.data.redirect) {
          localStorage.setItem("token", "");
          navigate(err.response?.data.redirect);
        }
      }
    }
  };

  const handleLogout = () => {
    setLogout(true);
  };

  useEffect(() => {
    if (logout) {
      localStorage.removeItem("token");
      tokenRef.current = "";
    } else {
      tokenRef.current = localStorage.getItem("token")!;
    }
    if (!tokenRef.current) {
      navigate("/login");
    }
  }, [navigate, logout]);

  return (
    <div className="relative w-full min-h-screen flex flex-col gap-2 justify-center items-center text-white border-orange-100 bg-[rgb(20_20_20)]">
      <h1 className="text-[16px] md:text-2xl absolute top-1 left-0.5 p-2 min-w-max max-w-[50vh]">
        Welcome,{" "}
        <span className="italic text-orange-400 text-[18px] md:text-3xl">
          {user.name
            .split(" ")
            .map((word) => {
              let returnVal = "";
              for (let i = 0; i < word.length; i++) {
                if (i === 0) {
                  returnVal = returnVal + word[i].toUpperCase();
                } else {
                  returnVal += word[i];
                }
              }
              return returnVal;
            })
            .join(" ")}
        </span>
      </h1>
      <h2>Ticket web Aplication</h2>
      <button
        onClick={() => fetchTickets()}
        className="rounded bg-blue-500 text-center p-2 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
      >
        Get Tickets
      </button>
      {loading ? <Loader /> : !error ? mapedData : <p>{error}</p>}
      <div className=" absolute top-1 right-1 flex min-w-max gap-2 justify-center items-center min-h-max">
        <Link
          to="/ticket/createticket"
          className="bg-blue-600 rounded p-1 right-0.5 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
        >
          Create Ticket
        </Link>
        <button
          className="bg-blue-600 rounded p-1 flex-1 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Home;
