import ThemeSwitcher from "../../components/ThemeSwitcher.jsx";
import Loading from "../loading.js";

export default function Theme() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-6 py-12 pb-24">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Theme Settings
      </h1>
      <div className="flex flex-col items-start gap-4">
        <p className="text-gray-600 dark:text-gray-400">
          Toggle between light and dark mode
        </p>
        <ThemeSwitcher />
      </div>
      <Loading />
    </div>
  );
}
