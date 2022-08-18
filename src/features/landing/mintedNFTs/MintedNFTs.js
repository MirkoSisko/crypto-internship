import React from "react";

import styles from "./MintedNFTs.module.scss";

const MintedNFTs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Minted NFTs</h1>
      </div>
      <div className={styles.NFTContainer}></div>
    </div>
  );
};

export default MintedNFTs;
