import Title from "@components/landingTitle";
import Navbar from "@shared/navbar";
import React from "react";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <Title />
    </header>
  );
};

export default Header;
