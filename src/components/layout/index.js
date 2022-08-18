import Title from "@features/landing/landingTitle";
import React from "react";
import Header from "./Header";
import ConnectTitle from "@features/connect/title";

import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div>
      <Header>{router.pathname === "/" ? <Title /> : <ConnectTitle />}</Header>
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
