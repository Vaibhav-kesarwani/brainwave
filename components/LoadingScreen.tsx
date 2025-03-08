import { Loader } from "lucide-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <Loader className="size-10 animate-spin" />
    </div>
  );
}
