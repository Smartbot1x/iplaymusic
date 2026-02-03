"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IoIosPulse,
  IoIosMicrophone,
  IoIosContrast,
  IoMdSettings,
  IoMdWifi,
  IoIosHome,
  IoMdPerson,
} from "react-icons/io";
import { GiLoveSong } from "react-icons/gi";
import GradientIcon from "./ui/gradienticon";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 shadow-[0_-5px_12.5px_0_rgba(0,0,0,0.20)] bg-white border-t border-gray-200 z-30 dark:bg-gray-900 dark:border-gray-700">
      <nav className="flex justify-around items-center py-4 px-4 max-w-md mx-auto">
        <Link href="/">
          <GradientIcon Icon={IoIosHome} active={pathname === "/"} />
        </Link>

        <Link href="/songs">
          <GradientIcon Icon={GiLoveSong} active={pathname === "/songs"} />
        </Link>

        <Link href="/playlist">
          <GradientIcon Icon={IoMdWifi} active={pathname === "/playlist"} />
        </Link>

        <Link href="/profile">
          <GradientIcon Icon={IoMdPerson} active={pathname === "/profile"} />
        </Link>

        <Link href="/settings">
          <GradientIcon Icon={IoMdSettings} active={pathname === "/settings"} />
        </Link>
      </nav>
    </footer>
  );
}
