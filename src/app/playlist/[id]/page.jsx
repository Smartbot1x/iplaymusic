import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPlaylistById } from "../../../lib/services";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import TrackItem from "../../../components/track-item";

export const metadata = {
  title: "Playlist Details",
  description: "View details of your playlist",
};

export default async function PlaylistDetailPage({ params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("IPM_AT");

  if (!accessToken) {
    redirect("/");
  }

  const playlist = await getPlaylistById(id, accessToken.value);

  if (!playlist) {
    redirect("/playlist");
  }

  const imageUrl = playlist.images?.[0]?.url;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-24">
      <div className="relative">
        <div className="absolute inset-0 h-72   bg-gradient" />

        <div className="relative z-10 px-6 pt-6">
          <Link
            href="/playlist"
            className="inline-flex items-center text-white hover:opacity-80 transition mb-6"
          >
            <MdArrowBackIos size={24} />
            <span className="ml-1 font-medium">Back</span>
          </Link>

          {/* Playlist cover */}
          <div className="flex flex-col items-center pt-4 pb-8">
            {imageUrl ? (
              <div className="relative w-48 h-48 mb-6">
                <Image
                  src={imageUrl}
                  alt={playlist.name}
                  fill
                  sizes="192px"
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            ) : (
              <div className="w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
                <span className="text-gray-500 dark:text-gray-400">
                  No image
                </span>
              </div>
            )}

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              {playlist.name}
            </h1>

            {playlist.description && (
              <p className="text-white/80 text-sm text-center max-w-xs">
                {playlist.description}
              </p>
            )}

            <p className="text-white/60 text-sm mt-2">
              {playlist.tracks?.total || 0} songs
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          songs
        </h2>

        <div className="space-y-3">
          {playlist.tracks?.items && playlist.tracks.items.length > 0 ? (
            playlist.tracks.items.map((item, index) => (
              <TrackItem
                key={item.track?.id || index}
                track={item.track}
                playlistId={id}
              />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No tracks available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
