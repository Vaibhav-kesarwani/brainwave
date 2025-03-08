import React from "react";

export default function LoadingSearch() {
  return (
    <div className="w-full px-6 py-10 lg:px-16 lg:py-12">
      <div className="flex animate-pulse flex-col gap-1">
        <div className="h-11 w-[220px] rounded-md bg-muted-foreground" />
        <div className="mt-1.5 h-3 w-[280px] rounded-md bg-muted-foreground"></div>
        <div className="mt-3">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="mt-2 h-5 w-[140px] rounded-md bg-muted-foreground"
            />
          ))}
        </div>
        <div className="mt-16 h-10 w-[220px] rounded-md bg-muted-foreground" />
        <div className="mt-1.5 h-3 w-[340px] rounded-md bg-muted-foreground"></div>
        <div className="mt-6 h-10 w-[300px] rounded-md bg-muted-foreground" />
      </div>
    </div>
  );
}
