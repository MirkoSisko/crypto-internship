import Link from "next/link";
import Logo from "@assets/icons/blank-logo.png";

import styles from "./Navbar.module.scss";
import ConnectButton from "@components/connectButton";

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
  return (
    <nav className={styles.navbar}>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <img src={Logo.src} className={styles["blank-logo"]} />
        </Link>
      </div>
      <div>
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
    </nav>
  );
};

export default Navbar;
