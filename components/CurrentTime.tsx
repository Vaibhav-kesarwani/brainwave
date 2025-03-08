"use client";
import getCurrentTime from "@/lib/functions/getCurrentTime";
import React from "react";
export default function CurrentTime() {
  const [time, setTime] = React.useState(getCurrentTime());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div>{time}</div>;
}
