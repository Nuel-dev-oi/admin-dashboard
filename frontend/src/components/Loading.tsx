import { type JSX } from "react";

const Loader = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center w-10 h-10 bg-transparent">
      <div className="w-[90%] h-[90%] rounded-full border-2 border-t-blue-500 border-gray-100 animate-spin"></div>
    </div>
  );
};

export const PulseLoader = (): JSX.Element => {
  return (
    <div className="w-[50%] h-[5vh] rounded-lg bg-zinc-300 animate-pulse"></div>
  );
};
export default Loader;
