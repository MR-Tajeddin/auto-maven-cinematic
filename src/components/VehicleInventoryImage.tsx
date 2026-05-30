"use client";

import Image from "next/image";
import { useState } from "react";

type VehicleInventoryImageProps = {
  src: string;
  alt: string;
  name: string;
};

export default function VehicleInventoryImage({
  src,
  alt,
  name,
}: VehicleInventoryImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0f18] via-[#050a14] to-[#0d1219] p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />
        <p className="relative text-center text-sm font-semibold leading-snug text-white/75">
          {name}
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) calc((100vw - 60px) / 2), 400px"
      onError={() => setFailed(true)}
    />
  );
}
