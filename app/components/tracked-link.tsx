"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { emitAnalyticsEvent, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  event: AnalyticsEvent;
  location: string;
  children: ReactNode;
};

export function TrackedLink({ event, location, children, href, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(clickEvent) => {
        emitAnalyticsEvent(event, { location });
        onClick?.(clickEvent);
      }}
    >
      {children}
    </a>
  );
}
