import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import {
  getUserProfile,
  getTopArtists,
  getTopTracks,
  getPlaylists,
} from "../../lib/services";
import TrackItem from "../../components/track-item";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("IPM_AT");

  if (!accessToken) {
    redirect("/");
  }

  const [user, topArtists, topTracks, playlists] = await Promise.all([
    getUserProfile(accessToken.value),
    getTopArtists(accessToken.value),
    getTopTracks(accessToken.value),
    getPlaylists(accessToken.value),
  ]);

  if (!user) {
    redirect("/");
  }

  const profileImage = user.images?.[0]?.url;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-24">
      <div className="relative">
        <div className="absolute inset-0 h-64 bg-gradient" />

        <div className="relative z-10 px-6 pt-6">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-white hover:opacity-80 transition">
              <MdArrowBackIos size={24} />
            </Link>
            <h1 className="text-white font-semibold">Profile</h1>
            <Link
              href="/settings"
              className="text-white hover:opacity-80 transition"
            >
              <IoMdSettings size={24} />
            </Link>
          </div>

          {/* Profile info */}
          <div className="flex flex-col items-center pt-4 pb-12">
            {profileImage ? (
              <div className="relative w-35 h-35 mb-4">
                <Image
                  src={profileImage}
                  alt={user.display_name}
                  fill
                  sizes="312px"
                  className="object-cover rounded-full border-4 border-white shadow-xl"
                  priority
                />
              </div>
            ) : (
              <span className="text-3xl text-gray-500 dark:text-gray-400">
                {user.display_name?.charAt(0)?.toUpperCase() || "?"}
              </span>
            )}

            <h2 className="text-2xl font-bold text-white mb-1">
              {user.display_name}
            </h2>
            <p className="text-white/70 text-sm">
              {user.followers?.total || 0} followers
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {playlists?.length || 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Playlists
            </p>
          </div>
          <div className="text-center border-x border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.followers?.total || 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Followers
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.product === "premium" ? "Premium" : "Free"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Plan</p>
          </div>
        </div>
      </div>

      {/* Top Artists */}
      {topArtists && topArtists.length > 0 && (
        <div className="px-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Artists
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {topArtists.map((artist) => (
              <div key={artist.id} className="shrink-0 text-center">
                <div className="relative w-20 h-20 mb-2">
                  {artist.images?.[0]?.url ? (
                    <Image
                      src={artist.images[0].url}
                      alt={artist.name}
                      fill
                      sizes="80px"
                      className="object-cover rounded-full shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        ?
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 truncate w-20">
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topTracks && topTracks.length > 0 && (
        <div className="px-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Tracks
          </h3>
          <div className="space-y-3">
            {topTracks.slice(0, 5).map((track) => (
              <TrackItem key={track.id} track={track} />
            ))}
          </div>

          {topTracks.length > 5 && (
            <button className="w-full mt-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition">
              See all {topTracks.length} tracks
            </button>
          )}
        </div>
      )}

      <div className="px-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Links
        </h3>
        <div className="space-y-2">
          <Link
            href="/playlist"
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="text-gray-900 dark:text-white font-medium">
              Your Playlists
            </span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="text-gray-900 dark:text-white font-medium">
              Settings
            </span>
          </Link>
          <Link
            href="/theme"
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="text-gray-900 dark:text-white font-medium">
              Theme Settings
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
