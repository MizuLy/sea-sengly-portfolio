import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Mainlayout() {
  return (
    <div className="">
      <Nav />
      <section>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
