import React from "react";
import { useAppName } from "@app/hooks/useAppName";
import markUrl from "@app/assets/brand/modern-logo/favicon.svg";

interface LogoIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
}

/** The INTEGRA mark as an image; the same asset in either colour scheme. */
export function LogoIcon({ alt, ...props }: LogoIconProps) {
  const appName = useAppName();
  return <img src={markUrl} alt={alt ?? appName} {...props} />;
}
