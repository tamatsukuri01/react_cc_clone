import { Header } from "@/components/header";
import { MIN_LANDSCAPE_WIDTH } from "@/hooks/useWindowSize";
import { useMediaQuery } from "@mui/material";
import React from "react";

type LayoutProps = {
  children: JSX.Element;
};
export const Layout = ({ children }: LayoutProps) => {
  const isLandscape = useMediaQuery(MIN_LANDSCAPE_WIDTH);

  return (
    <div className="app">
      <Header isLandscape={isLandscape} />
      <main>{children}</main>
    </div>
  );
};
