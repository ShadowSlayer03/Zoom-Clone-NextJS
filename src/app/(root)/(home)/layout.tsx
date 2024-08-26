import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SyncSpace | Seamless Meetings, Effortless Scheduling, and Instant Collaboration",
  description:
    "An awesome NextJS application to schedule and join real-time meetings and video conferences, built using Stream",
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default HomeLayout;
