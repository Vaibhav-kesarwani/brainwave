import React from "react";

export default function LoadingNote() {
  return (
    <div className="w-full px-6 py-10 lg:px-16 lg:py-12">
      <div className="flex animate-pulse flex-col gap-1">
        <div className="h-9 w-[270px] rounded-md bg-muted-foreground" />
        <div className="h-4 w-[90px] rounded-md bg-muted-foreground"></div>
        <hr className="mt-4" />
      </div>
    </div>
  );
}
