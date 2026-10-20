import Image from "next/image";
import type { ReactNode } from "react";
import { StarIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr";

export type TestimonialCardProps = {
  /** Ícono superior. Por defecto UserCircle, como en Figma. */
  icon?: ReactNode;
  /** Calificación de 0 a 5 (Qualification). */
  rating?: number;
  title?: ReactNode;
  children?: ReactNode;
  /** Quién da el testimonio (User). */
  author?: { name: string; role?: string; avatarSrc?: string };
  className?: string;
};

// Testimonial card del D.S. Tramita (03_Card en Figma).
export function TestimonialCard({ icon, rating, title, children, author, className = "" }: TestimonialCardProps) {
  return (
    <figure className={`flex flex-col gap-4 rounded-[16px] bg-white p-6 shadow-[0_4px_16px_rgba(0,0,0,0.07)] ${className}`}>
      <span aria-hidden className="inline-flex size-12 text-[#2a32a2] [&>svg]:size-full">
        {icon ?? <UserCircleIcon weight="regular" />}
      </span>
      {rating !== undefined ? (
        <div role="img" aria-label={`Calificación: ${rating} de 5`} className="flex gap-3">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} aria-hidden weight="fill" className={`size-6 ${i < rating ? "text-[#ec9c13]" : "text-[#9496a8]"}`} />
          ))}
        </div>
      ) : null}
      <blockquote className="flex flex-col gap-2">
        {title ? <p className="text-base font-bold leading-[19px] text-[#2a32a2]">{title}</p> : null}
        {children ? <div className="text-sm leading-4 text-[#484956]">{children}</div> : null}
      </blockquote>
      {author ? (
        <figcaption className="flex items-center gap-3">
          {author.avatarSrc ? (
            <Image src={author.avatarSrc} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
          ) : null}
          <div className="flex flex-col gap-2 text-sm leading-4">
            <span className="font-bold text-[#202025]">{author.name}</span>
            {author.role ? <span className="text-[#5c5d70]">{author.role}</span> : null}
          </div>
        </figcaption>
      ) : null}
    </figure>
  );
}
