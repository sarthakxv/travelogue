import React from "react";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className = "", style }: SkeletonProps) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
      style={style}
    />
  );
}

export function SkeletonText({ width = "100%" }: { width?: string }) {
  return <Skeleton className="h-5" style={{ width }} />;
}

export function SkeletonTitle() {
  return <Skeleton className="h-10 w-1/2 rounded-lg inline-block" />;
}

export function SkeletonCard() {
  return <Skeleton className="h-[200px] w-full rounded-lg" />;
}

export function SkeletonCityItem() {
  return (
    <div className="flex items-center p-5 border-b border-gray-200">
      <Skeleton className="h-5 w-2/5" />
    </div>
  );
}
