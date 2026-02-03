"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import {
  FaPlay,
  FaPause,
  /*   FaStepBackward,
  FaStepForward, */
  FaFastBackward,
  FaFastForward,
} from "react-icons/fa";

const WAVE_BARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  baseHeight: 20 + Math.random() * 60,
  delay: i * 0.05,
}));

export default function SongPlayerPage({ params }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songData, setSongData] = useState(null);
  const audioRef = useRef(null);

  const [unwrappedParams, setUnwrappedParams] = useState(null);
  const [trackInfo, setTrackInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.resolve(params).then(setUnwrappedParams);
  }, [params]);

  // Fetch track info
  useEffect(() => {
    if (!unwrappedParams?.songId) return;

    const fetchTrack = async () => {
      try {
        const res = await fetch(`/api/track/${unwrappedParams.songId}`);
        if (res.ok) {
          const data = await res.json();
          setTrackInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch track:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
  }, [unwrappedParams?.songId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const togglePlayer = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration,
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0,
      );
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!unwrappedParams) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href={`/playlist/${unwrappedParams.id}`}
          className="text-gray-900 dark:text-white hover:opacity-70 transition"
        >
          <MdArrowBackIos size={24} />
        </Link>
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider">
          PLAYING
        </h1>
        <div className="w-6" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-72 h-72 mb-12">
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex items-center gap-[2px] h-32">
            {WAVE_BARS.slice(0, 20).map((bar) => (
              <div
                key={bar.id}
                className={`w-[3px] rounded-full bg-gradient-to-t from-[#EE0979] to-[#FF6A00] opacity-30 ${
                  isPlaying ? "animate-wave" : ""
                }`}
                style={{
                  height: isPlaying ? `${bar.baseHeight}%` : "20%",
                  animationDelay: `${bar.delay}s`,
                  transition: "height 0.3s ease",
                }}
              />
            ))}
          </div>

          <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex items-center gap-[2px] h-32">
            {WAVE_BARS.slice(20, 40).map((bar) => (
              <div
                key={bar.id}
                className={`w-[3px] rounded-full bg-gradient-to-t from-[#EE0979] to-[#FF6A00] opacity-30 ${
                  isPlaying ? "animate-wave" : ""
                }`}
                style={{
                  height: isPlaying ? `${bar.baseHeight}%` : "20%",
                  animationDelay: `${bar.delay}s`,
                  transition: "height 0.3s ease",
                }}
              />
            ))}
          </div>

          <div
            className={`relative w-full h-full rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "3s" }}
          >
            {/* Center label  */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/3 rounded-full overflow-hidden shadow-inner relative">
                <Image
                  src="/Asset-2@2x.svg"
                  alt="Album art"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            {trackInfo?.name || "Loading..."}
          </h2>
          <p className="text-gray-500">
            {trackInfo?.artists?.[0]?.name || "Unknown Artist"}
          </p>
        </div>

        <div className="w-full max-w-sm mb-4">
          <div
            onClick={handleSeek}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer overflow-hidden"
          >
            <div
              className="h-full rounded-full relative"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #EE0979 0%, #FF6A00 100%)",
              }}
            >
              {/* progressbar player */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-pink-500" />
            </div>
          </div>

          {/* Time labels */}
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">
              {formatTime(currentTime)}
            </span>
            <span className="text-xs text-gray-500">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center justify-center gap-6">
          {/*  <button
            onClick={() => {}}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <FaStepBackward size={20} />
          </button> */}

          <button
            onClick={skipBackward}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <FaFastBackward size={20} />
          </button>

          <button
            onClick={togglePlayer}
            className="w-16 h-16 rounded-full bg-gradient flex items-center justify-center text-white shadow-lg hover:opacity-90 active:scale-95 transition"
          >
            {isPlaying ? (
              <FaPause size={24} />
            ) : (
              <FaPlay size={24} className="ml-1" />
            )}
          </button>

          <button
            onClick={skipForward}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <FaFastForward size={20} />
          </button>

          {/*   <button
            onClick={() => {}}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
          >
            <FaStepForward size={20} />
          </button> */}
        </div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/lukrembo-jay.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
}
