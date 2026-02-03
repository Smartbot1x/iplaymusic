import Image from "next/image";
import TrackItem from "./track-item";

export default function PlaylistCard({ playlist }) {
  const imageUrl = playlist.images?.[0]?.url;

  return (
    <div className="max-w-md mx-auto">
      <div className="relative flex justify-center items-center mb-8 h-64">
        {imageUrl ? (
          <>
            <div className="relative w-52 h-52">
              <Image
                src={imageUrl}
                alt={"Playlist Cover"}
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </>
        ) : (
          <div className="w-52 h-52 bg-gray-300 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-gray-500 dark:text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Playlist Name */}
      <div className="text-center mb-8">
        <h2 className="text-xl text-gray-900 dark:text-gray-100 font-bold leading-tight">
          {playlist.name}
        </h2>
      </div>

      {/* Track List */}
      <div className="space-y-3 pb-8">
        {playlist.tracks?.items && playlist.tracks.items.length > 0 ? (
          playlist.tracks.items
            .slice(0, 6)
            .map((item) => (
              <TrackItem key={item.track?.id} track={item.track} />
            ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No tracks available
          </p>
        )}
      </div>

      {/* Listen Button */}
      <div className="fixed bottom-6 left-6 right-6 z-20">
        {/* <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all uppercase tracking-wider">
          Listen
        </button> */}
      </div>
    </div>
  );
}
