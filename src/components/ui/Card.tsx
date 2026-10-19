import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { IconButton } from "@/components/ui/IconButton";

export type CardProps = {
  /** Vertical Card u Horizontal Card en Figma. */
  orientation?: "vertical" | "horizontal";
  /** Imagen superior (vertical) o lateral (horizontal). alt vacío si es decorativa. */
  image?: { src: string; alt: string };
  /** Ícono dentro del Icon Button Medium. */
  icon?: ReactNode;
  /** Tags adicionales sobre el título (Additional tags). */
  tags?: ReactNode;
  title?: ReactNode;
  /** Si existe, toda la tarjeta lleva a este enlace (estados Hover y Press). */
  href?: string;
  /** Estado o dato al pie, normalmente un Tag. */
  status?: ReactNode;
  /** Acción al pie, normalmente un Button. Sigue siendo clicable aparte del enlace. */
  action?: ReactNode;
  disabled?: boolean;
  /** Descripción. */
  children?: ReactNode;
  className?: string;
};

// Vertical Card y Horizontal Card del D.S. Tramita (03_Card en Figma).
// Con href, el título es el enlace y su área cubre toda la tarjeta; la acción
// del pie queda por encima, así el HTML no anida un botón dentro de un enlace.
export function Card({
  orientation = "vertical",
  image,
  icon,
  tags,
  title,
  href,
  status,
  action,
  disabled = false,
  children,
  className = "",
}: CardProps) {
  const horizontal = orientation === "horizontal";
  const interactive = Boolean(href) && !disabled;

  const surface = disabled
    ? "border border-[#9496a8] bg-[#ebebed]"
    : `border border-transparent bg-white shadow-[0_4px_16px_rgba(0,0,0,0.07)] ${
        interactive ? "hover:bg-[#e4e5f4] has-[a:active]:border-[#2a32a2]" : ""
      }`;

  const titleNode = title ? (
    <h3 className="text-lg font-bold leading-[21px] text-[#2a32a2]">
      {interactive ? (
        // Figma no define foco para la Card: se usa el indicador del navegador.
        <Link href={href!} className="after:absolute after:inset-0 after:rounded-[16px] after:content-['']">
          {title}
        </Link>
      ) : (
        title
      )}
    </h3>
  ) : null;

  const media = image ? (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[12px] ${horizontal ? "h-[226px] w-[196px]" : "h-[170px] w-full"}`}
    >
      <Image src={image.src} alt={image.alt} fill sizes={horizontal ? "196px" : "410px"} className="object-cover" />
    </div>
  ) : null;

  const body = (
    <div className="flex flex-col gap-5">
      {!horizontal ? media : null}
      {icon ? <IconButton icon={icon} size="Medium" /> : null}
      <div className="flex flex-col gap-2">
        {tags ? <div className="flex flex-wrap gap-5">{tags}</div> : null}
        {titleNode}
        {children ? <div className="text-sm leading-4 text-[#484956]">{children}</div> : null}
      </div>
    </div>
  );

  const footer =
    status || (action && !disabled) ? (
      <div className={`flex flex-wrap items-center pt-6 ${horizontal ? "gap-4" : "justify-between gap-4"}`}>
        {status}
        {/* Disabled oculta la acción, como en Figma. */}
        {action && !disabled ? <div className="relative z-10">{action}</div> : null}
      </div>
    ) : null;

  return (
    <article
      className={`relative flex rounded-[16px] p-6 ${horizontal ? "flex-row gap-6" : "flex-col"} ${surface} ${className}`}
    >
      {horizontal ? media : null}
      <div className={`flex min-w-0 flex-1 flex-col ${horizontal ? "justify-between" : ""}`}>
        {body}
        {footer}
      </div>
    </article>
  );
}
