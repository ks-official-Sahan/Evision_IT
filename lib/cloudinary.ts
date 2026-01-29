import { siteConfig } from "./config";

type ImageFormat = "auto" | "webp" | "avif" | "jpg" | "png";
type ImageQuality = "auto" | "auto:low" | "auto:eco" | "auto:good" | "auto:best" | number;

interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "scale" | "fit" | "limit" | "thumb" | "crop";
  gravity?: "auto" | "face" | "faces" | "center" | "north" | "south" | "east" | "west";
  format?: ImageFormat;
  quality?: ImageQuality;
  blur?: number;
  effect?: string;
  aspectRatio?: string;
}

export function cloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const cloudName = siteConfig.cloudinary.cloudName;
  const {
    width,
    height,
    crop = "fill",
    gravity = "auto",
    format = "auto",
    quality = "auto",
    blur,
    effect,
    aspectRatio,
  } = options;

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  if (aspectRatio) transformations.push(`ar_${aspectRatio}`);
  if (blur) transformations.push(`e_blur:${blur}`);
  if (effect) transformations.push(`e_${effect}`);
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  const transformationString = transformations.join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
}

export function cloudinaryBlurPlaceholder(publicId: string): string {
  return cloudinaryUrl(publicId, {
    width: 10,
    height: 10,
    blur: 1000,
    quality: 1,
  });
}

interface ResponsiveImageProps {
  publicId: string;
  alt: string;
  sizes?: string;
  widths?: number[];
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}

export function getResponsiveImageProps({
  publicId,
  widths = [640, 768, 1024, 1280, 1536],
  aspectRatio,
}: ResponsiveImageProps) {
  const srcSet = widths
    .map((w) => `${cloudinaryUrl(publicId, { width: w, aspectRatio })} ${w}w`)
    .join(", ");

  const src = cloudinaryUrl(publicId, { width: widths[widths.length - 1], aspectRatio });
  const blurDataURL = cloudinaryBlurPlaceholder(publicId);

  return {
    src,
    srcSet,
    blurDataURL,
  };
}
