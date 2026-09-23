"use client";

import { useState } from "react";
import VideoLightbox from "./VideoLightbox";

/* 评价卡片内的视频入口：海报图 + 居中圆形播放按钮，点击打开灯箱播放 */
export default function TestimonialVideo({ src, poster }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <img src={poster} alt="" className="block w-full" />
        <button
          type="button"
          aria-label="播放视频"
          onClick={() => setOpen(true)}
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-white/90 bg-black/20 shadow-lg sm:h-24 sm:w-24">
            <svg
              className="ml-1 h-8 w-8 text-white sm:h-10 sm:w-10"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>

      {open && (
        <VideoLightbox src={src} poster={poster} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
