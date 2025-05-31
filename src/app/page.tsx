"use client";
import MobileDashboard from "@/components/home/mobile";
import Header from "../components/common/header";
import HomeComp from "../components/home";
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
// import CentralLoader from "@/components/common/central-loader";

export default function Home() {
  const matches = useMediaQuery("(min-width:601px)");
  const [isDesktop, setIsDesktop] = useState<null | boolean>(null);

  useEffect(() => {
    setIsDesktop(matches);
  }, [matches]);

  // if (isDesktop === null) {
  //   return <CentralLoader />;
  // }

  return (
    <div>
      <Header />
      {isDesktop ? <HomeComp /> : <MobileDashboard />}
    </div>
  );
}
