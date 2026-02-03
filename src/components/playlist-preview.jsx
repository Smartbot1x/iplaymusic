import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function PlaylistPreview({ playlist }) {
  const imageUrl = playlist.images?.[0]?.url;

  return (
    <Link href={`/playlist/${playlist.id}`}>
      <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer group">
        {/* Playlist image */}
        {imageUrl ? (
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={playlist.name}
              fill
              sizes="64px"
              className="object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
            />
          </div>
        ) : (
          <div className="w-16 h-16 shrink-0 bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              No img
            </span>
          </div>
        )}

        {/* Playlist info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {playlist.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {playlist.tracks?.total || playlist.tracks?.items?.length || 0}{" "}
            Songs
          </p>
        </div>

        <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          <FaArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
