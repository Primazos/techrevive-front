import React from "react";

const Home = () => {
  return (
    <div className="flex w-full h-full flex-col gap-16 py-16 justify-center">
      <div className="card bg-neutral rounded-box w-[80%] self-center grid h-52 place-items-center">
        <label className="swap swap-flip text-9xl">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          <div className="swap-on">😈</div>
          <div className="swap-off">😇</div>
        </label>
      </div>
      <div className="card bg-neutral rounded-box w-[80%] self-center grid h-52 place-items-center">
        content
      </div>
      <div className="card bg-neutral rounded-box w-[80%] self-center grid h-52 place-items-center">
        content
      </div>
    </div>
  );
};

export default Home;
