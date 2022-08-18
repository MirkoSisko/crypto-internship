import React from "react";
import wallet1 from "@assets/icons/wallet1.svg";
import wallet2 from "@assets/icons/wallet2.svg";
import wallet3 from "@assets/icons/wallet3.svg";

import styles from "./ConnectTitle.module.scss";
import Image from "next/image";

const WALLETS = [
  { id: 1, url: wallet1.src },
  { id: 2, url: wallet2.src },
  { id: 3, url: wallet3.src },
];

const ConnectTitle = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          <h1>Connect</h1>
          <h1>wallet</h1>
        </div>

        <div className={styles.subtitle}>
          Connect your wallet to use full features of the site
        </div>
      </div>

      <div className={styles.walletContainer}>
        {WALLETS.map((wallet) => (
          <div className={styles.wallet} key={wallet.id}>
            <div className={styles.image}>
              <Image src={wallet.url} layout="fill" alt="wallet" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectTitle;
