import React from "react";

export default function Loader() {
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-t-slate-100 border-r-slate-100 border-b-black border-2 border-l-black h-5 w-5 animate-spin"></div>
      </div>
    </>
  );
}
