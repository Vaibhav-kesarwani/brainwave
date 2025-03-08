import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-full min-h-[100dvh] w-full flex-col items-center justify-center">
      <div className="mb-4 flex w-full flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-extrabold">
          Hey There! Welcome to{" "}
          <span className="bg-gradient-to-b from-red-400 to-rose-800 bg-clip-text text-transparent">
            Nota Rapida
          </span>
        </h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          Your Notes, Anytime, Anywhere
        </p>
      </div>

      <SignUp />
    </div>
  );
}
