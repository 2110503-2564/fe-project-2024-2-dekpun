"use client";
import RoleCatalog from "@/components/RoleCatalog";
import { Suspense, useEffect } from "react";
import NProgress from "nprogress";
import { LinearProgress } from "@mui/material";
import 'nprogress/nprogress.css';
import Image from "next/image";

export default function DentistRoles() {

  useEffect(() => {
    // Start progress bar when page starts loading
    NProgress.start();

    // Stop progress bar when page finishes loading
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <main className="text-center p-5">
      <Suspense fallback={
        <div className="flex items-center justify-center space-x-3 h-[70%] mt-[250px]">
          <div className="animate-spin rounded-full border-t-2 border-green-500 w-10 h-10">
            <Image src="/img/tooth.png" alt="tooth" width={600} height={600}/>   
          </div> {/* Tooth icon spinner */}
          <p className="text-3xl">Loading...</p>
        </div>
      }>
        <RoleCatalog />
      </Suspense>
    </main>
  );
}
