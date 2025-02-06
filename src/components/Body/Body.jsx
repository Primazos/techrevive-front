import React from "react";

const Body = () => {
  return (
    <div>
      <div>Aqui todo el texto</div>
      <div className="flex w-full h-full flex-col gap-16 justify-center">
        <div className="card bg-base-300 rounded-box w-[80%] self-center grid h-52 place-items-center">
          content
        </div>
        <div className="card bg-base-300 rounded-box w-[80%] self-center grid h-52 place-items-center">
          content
        </div>
      </div>
    </div>
  );
};

export default Body;
