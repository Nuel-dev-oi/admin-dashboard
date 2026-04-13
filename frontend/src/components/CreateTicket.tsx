import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface FormData {
  name: string;
  email: string;
  priority: "low" | "medium" | "high";
  description: string;
  user: string;
}

const CreateTicket = (): React.JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    priority: "medium",
    description: "",
    user: "",
  });
  const [users, setUsers] = useState<string[]>(["", "Loading..."]);

  const onSetFormData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((f) => ({
      ...f,
      [id]: value,
    }));
  };

  const handleFormSubmission = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: "",
      email: "",
      priority: "medium",
      description: "",
      user: "",
    });
  };

  useEffect(() => {
    const fetchUsers = async (url: string) => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.users) {
          const users = data.users;
          const optionUsers = users.map(
            (user: { [key: string]: string | boolean; name: string }) =>
              user.name,
          );
          setUsers(["", ...optionUsers]);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
        if (err instanceof AxiosError) {
          console.log(err.response?.data);
        }
      }
    };

    fetchUsers("http://localhost:3000/api/users/");
  }, []);

  return (
    <div className=" text-white flex flex-col justify-center items-center min-w-max max-w-screen gap-4 p-2 min-h-screen bg-[rgb(20_20_20)] ">
      <h1 className="text-3xl text-orange-400">Create Ticket</h1>
      <form
        onSubmit={(e) => handleFormSubmission(e)}
        className="flex flex-col gap-2 justify-center items-center min-h-max h-[50vh] min-w-max w-[30%] p-4 rounded shadow-[0px_2px_5px_1px_rgb(0,0,0)]"
      >
        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="name" className="text-orange-400 w-[41%]">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={formData?.name || ""}
            placeholder="name"
            onChange={(e) => onSetFormData(e)}
            className="border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-2 text-[12px] w-[59%]"
          />
        </div>
        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="email" className="text-orange-400 w-[41%]">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={formData?.email || ""}
            placeholder="email"
            onChange={(e) => onSetFormData(e)}
            className="border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-2 text-[12px] w-[59%]"
          />
        </div>

        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="priority" className="text-orange-400 w-[40%]">
            Priority:
          </label>
          <select
            value={formData?.priority}
            id="priority"
            onChange={(e) => onSetFormData(e)}
            className="border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-1 flex-1 w-[60%] bg-[rgb(20_20_20)] text-[12px]"
          >
            {["low", "medium", "high"].map((option, index) => {
              return (
                <option
                  key={index}
                  value={option}
                  className="border text-[10px] font-bold"
                >
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="user" className="text-orange-400 w-[40%]">
            User:
          </label>
          <select
            value={formData?.user || ""}
            onChange={(e) => onSetFormData(e)}
            id="user"
            disabled={users.includes("Loading...")}
            className={`border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-1 flex-1 w-[60%] text-[12px] bg-[rgb(20_20_20)] ${users.includes("Loading...") ? "opacity-5" : "opacity-100"}`}
          >
            {users
              .sort((a, b) => b.localeCompare(a))
              .map((option, index) => {
                return (
                  <option
                    key={index}
                    value={option}
                    className="border text-[10px] font-bold"
                  >
                    {option}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="flex justify-between items-center gap-2 text-xl w-full">
          <label htmlFor="description" className="text-orange-400 w-[40%]">
            Description:
          </label>
          <textarea
            id="description"
            value={formData?.description || ""}
            onChange={(e) => onSetFormData(e)}
            placeholder="Describe the ticket"
            className="border-0 outline focus:outline-0 focus:border-2 border-blue-500 p-2 text-[14px] w-[58%]"
          />
        </div>
        <button
          type="submit"
          className="text-orange-400 rounded bg-blue-500 text-center p-2 cursor-pointer shadow-[0px_2px_5px_1px_rgb(0,0,0)] active:shadow-[0px_1px_3px_1px_rgb(0,0,0)]"
        >
          Create Ticket
        </button>
      </form>
    </div>
  );
};

export default CreateTicket;
