"use client";

import { useEffect } from "react";

/* 视频灯箱：全屏半透明遮罩 + 居中视频（原生控件自动播放）+ 右上角 X，支持 ESC/点遮罩关闭 */
export default function VideoLightbox({ src, poster, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center text-white transition hover:text-gray-300 sm:right-6 sm:top-6"
      >
        <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <video
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-full"
      />
    </div>
  );
}
