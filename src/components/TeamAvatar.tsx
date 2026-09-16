"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamAvatarProps {
  member: {
    name: string;
    avatar: string;
    role: string;
  };
  /** Optional class for the wrapper — useful for aspect ratio overrides */
  className?: string;
  /** Show a subtle gradient overlay (useful behind badges/chips) */
  overlay?: boolean;
  /** Sizes attribute for responsive loading — tune per layout */
  sizes?: string;
}

export function TeamAvatar({
  member,
  className = "",
  overlay = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: TeamAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative aspect-[4/4.6] overflow-hidden bg-gradient-to-br from-[#4F6BFF]/15 via-[#8B5CF6]/10 to-[#06B6D4]/15 ${className}`}
    >
      {/* Initials fallback — always rendered underneath, hidden when image loads */}
      <div
        aria-hidden={!imgError}
        className={`absolute inset-0 z-0 flex items-center justify-center ${
          imgError ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <span className="bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-4xl font-light tracking-tight text-transparent">
          {initials}
        </span>
      </div>

      {/* Image */}
      {!imgError && (
        <Image
          src={member.avatar}
          alt={`${member.name} — ${member.role}`}
          fill
          sizes={sizes}
          className="relative z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={() => setImgError(true)}
        />
      )}

      {/* Optional dark gradient overlay for badge legibility */}
      {overlay && (
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-[#0A1330]/85 via-[#0A1330]/25 to-transparent" />
      )}
    </div>
  );
}