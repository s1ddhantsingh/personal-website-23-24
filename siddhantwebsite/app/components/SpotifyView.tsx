"use client";
import { useState, useEffect } from "react";

const SpotifyView = () => {
  useEffect(() => {
    const getCurrentlyStreamingFromSpotify = async () => {
    const res = await fetch("/api/get_currently_streaming_from_spotify/", {
      method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      setStreaming(data)
    } else {
      setStreaming({status: "NOTOK"})
    }
  };
  getCurrentlyStreamingFromSpotify();
  const intervalId = setInterval(getCurrentlyStreamingFromSpotify, 1000 * 60); // reloads my currently playing song every minute
    return () => clearInterval(intervalId)
  }, []) 

  const [streaming, setStreaming] = useState({})
  const imageUrl = streaming && (streaming as any)["out"] && (streaming as any)["out"]["image-url"] && (streaming as any)["out"]["image-url"]["url"] ? (streaming as any)["out"]["image-url"]["url"] : ""; 
  const songUrl = streaming && (streaming as any)["out"] && (streaming as any)["out"]["song-url"] ? (streaming as any)["out"]["song-url"] : ""; 

  return (
    streaming && (streaming as any)["out"] &&
    <a href={`${(streaming as any)["out"]["song-url"]}`}>
      <div 
            className="w-48 h-48 bg-center rounded bg-cover shadow-lg outline outline-black hover:cursor-pointer hover:scale-105 hover:ease-linear hover: duration-100" 
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            {/* Other card content */}
          </div>
    </a>
    
  );
}

export default SpotifyView