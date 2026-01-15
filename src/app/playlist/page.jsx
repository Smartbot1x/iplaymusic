import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getplaylists } from "../../lib/services";
import { MdArrowBackIos } from "react-icons/md";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default async function playlistPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("IPM_AT");

  if (!accessToken) {
    redirect("/");
  }

  const playlists = await getplaylists(accessToken.value);

  return (
    <>
      <div className="top_page bg-[url(/sound-wave.svg)] bg-contain bg-no-repeat w-93.75 h-[272.28px] ">
        <div className="container flex justify-between">
          <Link href="/" className="back_link">
            <MdArrowBackIos className="" />
          </Link>
          <p>Playlist</p>
          <CiSearch />
        </div>
        {/*  <p align="center">
          <a href="https://github.com/kittinan/spotify-github-profile">
            <img src="https://spotify-github-profile.kittinanx.com/api/view?uid=max.deeq2012&cover_image=true&theme=spotify-embed&show_offline=false&background_color=121212&interchange=true&profanity=false&bar_color=53b14f&bar_color_cover=false&mode=dark" />
          </a>
        </p> */}
      </div>
      <h1 className="flex-center">Your playlist</h1>
      <section className="flex-center ">
        {playlists && playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li className="space-y-4" key={playlist.id}>
                {playlist.name}
                <span className="space">
                  <img
                    src={playlist.images[0].url}
                    alt="playlist image"
                    className="w-38.5 h-38.5 object-cover rounded-lg"
                  />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="">Playlists will be displayed here.</p>
        )}
      </section>
    </>
  );
}
