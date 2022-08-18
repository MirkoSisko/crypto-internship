import Airdrop from "@assets/icons/airdrop.svg";
import Blank from "@assets/icons/blank.svg";
import Sparkle from "@assets/icons/sparkle.svg";
import Hoodie from "@assets/images/landing-hoodie.png";
import MintButton from "@components/mintButton";
import clsx from "clsx";

import { useEffect, useState } from "react";

import styles from "./BlankHoodie.module.scss";

const defaultNotificationResponse = {
  success: null,
  message: "",
  link: null,
};

const BlankHoodie = () => {
  return (
    <>
      <section id="hoodie" className={("section", styles.container)}>
        <div className={styles.titleMintFeaturesContainer}>
          <div className={styles.titleAndMintContainer}>
            <h1>
              Blank&apos;s{" "}
              <span className={styles.yellowRedHighlight}>Meta-builder</span>{" "}
              Hoodie
            </h1>
            <p className={styles.description}>
              Become a part of our trip to the Metaverse by owning Blank&apos;s
              &quot;Meta-builder&quot; Hoodie NFT.
            </p>

            <div className={styles.mintContainer}>
              <div className={styles.priceAndSupply}>
                <div className={styles.priceSection}>
                  <p className={styles.priceTitle}>Price</p>
                  <p className={styles.priceNumber}>0.1 ETH</p>
                </div>

                <div className={styles.supplySection}>
                  <p className={styles.supplyTitle}>Minted</p>
                  <p className={styles.supplyNumber}>300 / 500</p>
                </div>
              </div>
              <div className={styles.counterAndMintContainer}>
                <div className={styles.count}></div>
                <MintButton />
              </div>
            </div>
          </div>

          <div className={styles.featuresContainer}>
            <div className={styles.featureItem}>
              <div
                className={clsx(styles.featureIcons, styles.firstFeatureIcon)}
              >
                <img src={Airdrop.src} alt="airdrop" />
              </div>
              <p className={styles.featureTitle}>Random NFT airdrops</p>
              <p className={styles.featureDesc}>
                Gives you a chance to receive{" "}
                <span className={styles.bold}>random NFT airdrops</span> of the
                projects we work on to your holder&apos;s wallet.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div
                className={clsx(styles.featureIcons, styles.secondFeatureIcon)}
              >
                <img src={Blank.src} alt="blank" />
              </div>
              <p className={styles.featureTitle}>Blank Drops</p>
              <p className={styles.featureDesc}>
                It grants you whitelist access to our{" "}
                <span className={styles.bold}>future Drops</span>.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div
                className={clsx(styles.featureIcons, styles.thirdFeatureIcon)}
              >
                <img src={Sparkle.src} alt="box" />
              </div>
              <p className={styles.featureTitle}>Real hoodie</p>
              <p className={styles.featureDesc}>
                As a holder, you will also receive a real{" "}
                <span className={styles.bold}>
                  &quot;Meta-builder&quot; hoodie
                </span>{" "}
                that will be <span className={styles.bold}>shipped</span>{" "}
                directly to your{" "}
                <span className={styles.bold}>home address</span>.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img src={Hoodie.src} alt="Blank Hoodie" />
        </div>
      </section>
    </>
  );
};

export default BlankHoodie;
