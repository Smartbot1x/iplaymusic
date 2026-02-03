import { MdArrowBackIos } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";

export default function PlaylistHeader() {
  return (
    <div className="relative w-full">
      <Image
        src="/finalwave.png"
        alt="bg"
        fill
        sizes="208px"
        className="absolute top-0 left-0 sm:w-full lg:w-full md:w-full"
      />

      <div className="relative z-10 flex flex-col justify-between h-64 ">
        {/* Navigation */}
        <div className="flex justify-between items-center p-6">
          <Link
            href="/"
            className="text-gray-900 dark:text-white hover:opacity-80 transition"
          >
            <MdArrowBackIos size={24} />
          </Link>
          <p className="text-gray-900 dark:text-white font-semibold tracking-wider">
            PLAYLISTS
          </p>
          <CiSearch
            size={24}
            className="text-gray-900 dark:text-white cursor-pointer hover:opacity-80 transition"
          />
        </div>

        {/* Title */}
        <div className="px-6">
          <h1 className="text-gray-900 dark:text-white text-5xl font-bold">
            Playlists
          </h1>
        </div>
      </div>
    </div>
  );
}
