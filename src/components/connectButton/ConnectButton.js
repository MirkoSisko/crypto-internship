import Link from "next/link";
import React from "react";

import styles from "./ConnectButton.module.scss";

const ConnectButton = () => {
  return (
    <Link href="/connect">
      <button className={styles.button}>Connect wallet</button>
    </Link>
  );
};

export default ConnectButton;
