"use client";

import Image from "next/image";
import { useState } from "react";

export default function DeferredVideo({ src, poster, playLabel }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative aspect-[848/480] w-full bg-black">
      {started ? (
        <video
          className="h-full w-full"
          src={src}
          poster={poster}
          controls
          autoPlay
          loop
          playsInline
          preload="none"
          aria-label={playLabel}
        />
      ) : (
        <button
          type="button"
          aria-label={playLabel}
          onClick={() => setStarted(true)}
          className="absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-white"
        >
          <Image src={poster} alt="" fill sizes="80vw" className="object-contain" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-black/60 text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-9 w-9">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
