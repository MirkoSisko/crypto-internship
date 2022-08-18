import Link from "next/link";
import Logo from "@assets/icons/blank-logo.png";
import Menu from "@assets/icons/menu.svg";
import Close from "@assets/icons/close.svg";
import ConnectButton from "@components/connectButton";

import { useState } from "react";

import styles from "./Navbar.module.scss";
import Image from "next/image";

const NAV_LINKS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Stake",
    url: "/stake",
  },
  {
    title: "ERC20 Manager",
    url: "/erc20-manager",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <img src={Logo.src} className={styles["blank-logo"]} />
        </Link>
      </div>
      <div className={styles.linksContainer}>
        <ul className={styles["nav-links"]}>
          {NAV_LINKS.map((link, index) => (
            <li key={index} className={styles["nav-link"]}>
              <Link href={link.url}>
                <p>{link.title}</p>
              </Link>
            </li>
          ))}
          <ConnectButton />
        </ul>
      </div>

      {isOpen ? (
        <div className={styles.hamburgerIcon} onClick={() => setIsOpen(false)}>
          <Image src={Close.src} alt="Close" layout="fill" />
        </div>
      ) : (
        <div className={styles.hamburgerIcon} onClick={() => setIsOpen(true)}>
          <Image src={Menu.src} alt="Menu" layout="fill" />
        </div>
      )}
      {isOpen && (
        <div className={styles.hamburgerMenu}>
          {NAV_LINKS.map((link) => (
            <Link key={link.title} href={link.url}>
              {link.title}
            </Link>
          ))}
          <div>
            <ConnectButton color={"blue"} text={"Connect wallet"} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
