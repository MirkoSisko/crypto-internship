import Navbar from "@shared/navbar";
import React from "react";

import styles from "./Header.module.scss";

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <Navbar />
      {children}
    </header>
  );
};

export default Header;
