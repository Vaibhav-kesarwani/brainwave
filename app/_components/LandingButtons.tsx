import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/providers/global-context";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, LaptopMinimal } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LandingButtons() {
  return (
    <div className="mx-auto flex w-fit items-center gap-4 bg-transparent">
      <SignedIn>
        <div className="flex items-center gap-4">
          <Link href={"/notes"}>
            <Button className="flex items-center gap-2 p-6">
              Notes <ArrowRight className="size-5 stroke-2" />
            </Button>
          </Link>
          <Button className="flex items-center justify-center gap-2 p-6">
            <a
              href="https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/03c8dcb1-10db-4b98-986b-ebe560b47279-bzfb4k.exe"
              download
              className="flex items-center gap-3"
            >
              Download for Windows <LaptopMinimal className="size-5 stroke-2" />
            </a>
          </Button>
        </div>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="flex items-center gap-2 p-6">
            Get Started <ArrowRight className="size-5 stroke-2" />
          </Button>
        </Link>
      </SignedOut>
    </div>
  );
}
