import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPlaylists } from "../../lib/services";
import PlaylistHeader from "../../components/playlist-header";
import PlaylistPreview from "../../components/playlist-preview";

export default async function playlistPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("IPM_AT");

  if (!accessToken) {
    redirect("/");
  }

  const playlists = await getPlaylists(accessToken.value);

  return (
    <>
      <PlaylistHeader />

      <section className="px-6 py-8 bg-white dark:bg-gray-950 min-h-screen pb-40">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Your Playlists
        </h2>

        {playlists && playlists.length > 0 ? (
          <div className="space-y-4 space-x-5 ">
            {playlists.map((playlist) => (
              <PlaylistPreview key={playlist.id} playlist={playlist} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-16">
            No playlists found.
          </p>
        )}
      </section>
    </>
  );
}
