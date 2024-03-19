import Link from "next/link";
import React from "react";
import { Navigation } from "./navigation";
import styles from "../styles/header.module.scss";

export const Header = ({
  isLandscape,
}: {
  isLandscape: boolean;
}): JSX.Element => {
  return (
    <header className={`${styles["app-header"]}`}>
      <Link href={""} passHref legacyBehavior>
        <div className={``}>test</div>
      </Link>
      <Navigation isLandscape={isLandscape} />
    </header>
  );
};
