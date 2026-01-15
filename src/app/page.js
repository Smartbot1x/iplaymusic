
import SplashLogin from "../components/splash-login";
/* import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa"; */
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;



export default function Home() {
  return (
    <>
      <h1 className="">Welcome to iPlayMusic</h1>
      <SplashLogin
        delayMs={2000}
        href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private `}
      />









    </>
  );
}

{/*   <p className="text-white  ">or</p>

  <Link
    href=""
    className="w-80 h-12 border border-gray-600 text-white rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition font-semibold"
  >
    <span>
      <FcGoogle className="text-2xl" />
    </span>{" "}
    Continue with Google
  </Link>

  <Link
    href=""
    className="w-80 h-12 border border-gray-600 text-white rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition font-semibold"
  >
    <span>
      <FaFacebook className="text-2xl" />
    </span>{" "}
    Continue with Facebook
  </Link>

  <Link
    href=""
    className="w-80 h-12 border border-gray-600 text-white rounded-full flex items-center justify-center gap-3 hover:bg-gray-800 transition font-semibold"
  >
    <span>
      <FaApple className="text-2xl" />
    </span>{" "}
    Continue with Apple
  </Link> */}