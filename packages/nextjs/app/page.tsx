"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-around h-screen">
        <div className="w-[50%] flex flex-col gap-4 justify-center">
          <div className="px-5">
            <h1 className="text-center">
              <span className="block text-[2.5rem] font-bold text-left">Decentralized Energy Payment System</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis ipsa sit repellat sequi beatae quasi
              assumenda quos libero iusto maiores!
            </p>
          </div>
          <div className="px-5 ">
            <button className="py-3 px-6 bg-primary rounded-[10px]">Get Started</button>
          </div>
        </div>
        <div className="w-[30%]"></div>
      </div>
    </>
  );
};

export default Home;
