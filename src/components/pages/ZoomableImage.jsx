"use client";

import { useEffect, useState } from "react";

/* 图片灯箱：双击触发，全屏遮罩 + 居中原图；ESC / 点遮罩 / 再次双击 / 点 X 关闭 */
export default function ZoomableImage({ src, alt = "", className = "" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* 原图：保留传入的 className 与样式 */}
      <img
        src={src}
        alt={alt}
        className={className}
        onDoubleClick={() => setOpen(true)}
        style={{ cursor: "zoom-in" }}
      />

      {/* 灯箱遮罩 */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          {/* 关闭按钮 X */}
          <button
            type="button"
            aria-label="关闭"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center text-white transition hover:text-gray-300 sm:right-6 sm:top-6"
          >
            <svg className="h-8 w-8 sm:h-9 sm:w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* 大图：再次双击或单击均关闭 */}
          <img
            src={src}
            alt={alt}
            onDoubleClick={() => setOpen(false)}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="max-h-[92vh] max-w-[92vw] cursor:zoom-out object-contain"
          />
        </div>
      )}
    </>
  );
}
