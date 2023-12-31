import React from "react";
import "./Home.css";

import { Topbar } from "../../components/topbar/Topbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Timeline } from "../../components/timeline/Timeline";
import { Rightbar } from "../../components/rightbar/Rightbar";

export const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homecontainer">
        <Sidebar />
        <Timeline />
        <Rightbar />
      </div>
    </>
  );
};
