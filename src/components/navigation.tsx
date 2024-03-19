import Link from "next/link";
import React, { useMemo } from "react";
import styles from "../styles/navigarion.module.scss";
import { useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

type NavigationItemProps = {
  text: string;
  to: string;
};

const NavigationItem = (props: NavigationItemProps): JSX.Element => {
  const { text, to } = props;
  return (
    <li className={`${styles["nav-item"]}`}>
      <Link href={`/${to}`} passHref legacyBehavior>
        {text === "Home" ? (
          <HomeIcon className={`${styles["nav-icon"]}`} />
        ) : (
          "pokemon"
        )}
      </Link>
    </li>
  );
};

const NavigationItems = ({
  isLandscape,
}: {
  isLandscape: boolean;
}): JSX.Element => {
  const theme = useTheme();
  const modeColor = useMemo(() => {
    return {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.default,
    } as React.CSSProperties;
  }, [theme]);

  return (
    <nav>
      <ul
        style={modeColor}
        className={`${
          isLandscape ? styles["nav-items"] : styles["bottom-nav"]
        }`}
      >
        <NavigationItem text={"Home"} to={""} />
        <NavigationItem text={"tab1"} to={"pokemonData"} />
        {/* <NavigationItem text={"tab2"} to={""} /> */}
      </ul>
    </nav>
  );
};

export const Navigation = ({
  isLandscape,
}: {
  isLandscape: boolean;
}): JSX.Element => {
  return (
    <div className={`${styles["nav-wrapper"]}`}>
      <NavigationItems isLandscape={isLandscape} />
    </div>
  );
};
