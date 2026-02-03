"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlay, FaPause } from "react-icons/fa";

const STOP_ALL_EVENT = "stopAllAudio";

export default function TrackItem({ track, playlistId }) {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const trackIdRef = useRef(track?.id || Math.random().toString());

  useEffect(() => {
    const handleStopAll = (e) => {
      if (e.detail !== trackIdRef.current && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener(STOP_ALL_EVENT, handleStopAll);
    return () => window.removeEventListener(STOP_ALL_EVENT, handleStopAll);
  }, []);

  if (!track) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlayer = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      window.dispatchEvent(
        new CustomEvent(STOP_ALL_EVENT, { detail: trackIdRef.current }),
      );
      audioRef.current.play();
      setIsPlaying(true);
    }
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
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const openPlayer = () => {
    if (playlistId && track?.id) {
      router.push(`/playlist/${playlistId}/song/${track.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayer}
          className="bg-gradient text-white rounded-full p-3 shrink-0 transition shadow-md hover:opacity-90 active:scale-95"
        >
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </button>

        {/* Clickable track info - opens full player */}
        <div
          onClick={openPlayer}
          className="grow min-w-0 cursor-pointer hover:opacity-80 transition"
        >
          <p className="font-bold text-gray-900 dark:text-white truncate text-base">
            {track.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {track.artists?.[0]?.name || "Unknown Artist"}
          </p>
        </div>

        {/*   <p className="text-sm text-gray-500 shrink-0 font-medium">
          {formatDuration(track.duration_ms)}
        </p> */}
      </div>

      {/* Custom Audio Player - always show */}
      <div className="flex items-center gap-3 mt-2">
        <span className="text-xs text-gray-500 w-10">
          {formatTime(currentTime)}
        </span>

        {/* Progress bar */}
        <div
          onClick={handleSeek}
          className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer overflow-hidden"
        >
          <div
            className="h-full bg-gradient rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs text-gray-500 w-10 text-right">
          {formatDuration(track.duration_ms)}
        </span>

        {/* Audio element */}
        <audio
          ref={audioRef}
          src="/lukrembo-jay.mp3"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />
      </div>
    </div>
  );
}
