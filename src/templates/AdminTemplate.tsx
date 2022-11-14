import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Component/FooterLayout/Footer";
import HeaderAdmin from "../Component/HeaderLayout/HeaderAdmin";

type Props = {};

export default function AdminTemplate({}: Props) {
  return (
    <>
      <div>
        <HeaderAdmin />
        <div>
          <div></div>
          <div>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
