"use client";

import { useRouter } from "next/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { IoLogOutOutline } from "react-icons/io5";

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Settings
      </h1>

      <div className="space-y-4 ">
        <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Appearance
          </h2>
          <ThemeSwitcher />
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 bg-red-50 shadow-md dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition text-red-600 dark:text-red-400"
        >
          <span className="font-medium">Log out</span>
          <IoLogOutOutline size={24} />
        </button>
      </div>
    </div>
  );
}
