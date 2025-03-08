import React from "react";

export default function LoadingTrash() {
  return (
    <div className="w-full px-6 py-10 lg:px-16 lg:py-12">
      <div className="flex animate-pulse flex-col gap-1">
        <div className="h-9 w-[110px] rounded-md bg-muted-foreground" />
        <div className="mt-1.5 h-4 w-[280px] rounded-md bg-muted-foreground"></div>
        <hr className="mt-4" />
        <div className="mt-8 h-9 w-[160px] rounded-md bg-muted-foreground" />
        <div className="mt-56 h-9 w-[160px] rounded-md bg-muted-foreground" />
      </div>
    </div>
  );
}
