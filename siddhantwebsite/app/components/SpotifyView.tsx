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
  const intervalId = setInterval(getCurrentlyStreamingFromSpotify, 1000 * 15); // reloads my currently playing song every minute
    return () => clearInterval(intervalId)
  }, []) 

  const [streaming, setStreaming] = useState({})
  const imageUrl = streaming && (streaming as any)["out"] && (streaming as any)["out"]["image-url"] && (streaming as any)["out"]["image-url"]["url"] ? (streaming as any)["out"]["image-url"]["url"] : "";

  return (
    <div 
      className="w-48 h-48 bg-cover bg-center rounded shadow-lg" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Other card content */}
    </div>
  );
}

export default SpotifyView