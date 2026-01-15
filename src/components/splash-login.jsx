"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Login from "./ui/button";

export default function SplashLogin({ href, delayMs = 2000 }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      {!ready && (
        <section className="w-full h-full items-center flex flex-col justify-center">
          <Image
            src="/icons/music-logo-solid.svg"
            alt="iPlayMusic intro image"
            width={200}
            height={215.963}
            className="-auto mt-40 mb-10"
          />
          <h1 className="text-4xl font-poppins text-center text-txt-primary mb-4">
            iPlayMusic
          </h1>
        </section>
      )}

      {ready && (
        <Link href={href}>
          <Login />
        </Link>
      )}
    </div>
  );
}
