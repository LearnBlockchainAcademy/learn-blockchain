"use client";

import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-around h-[70vh]">
        <div className="w-full md:w-[50%] flex flex-col gap-4 justify-center">
          <div className="px-5">
            <h1 className="text-center">
              <span className="block text-[2.5rem] font-bold text-left">Learn Blockchain</span>
            </h1>
            <p>Dive into the world of blockchain technology.</p>
          </div>
          <div className="px-5 mt-12">
            <Link href="/register" className="py-3 px-6 bg-primary rounded-[10px]">
              Get Started
            </Link>
          </div>
        </div>
        <div className="md:w-[30%] w-0"></div>
      </div>
    </>
  );
};

export default Home;
