"use client";
import { getUserDetails } from "@/app/_actions/actions";
import LoadingScreen from "@/components/LoadingScreen";
import UserDetails from "@/types/User";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Folder, User } from "@prisma/client";
import React, { useContext, useEffect } from "react";

const GlobalContext = React.createContext<{
  clientUser: UserDetails | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
}>({
  clientUser: null,
  isLoading: true,
  isAuthenticated: false,
  selectedFolder: "",
  setSelectedFolder: () => {},
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useClerk();
  const { isSignedIn } = useAuth();
  const [clientUser, setClientUser] = React.useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState<string>("");

  React.useEffect(() => {
    if (!user) {
      setClientUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }
    const authHandler = async () => {
      try {
        const userDetails = await getUserDetails(
          user!.id,
          user!.primaryEmailAddress!.emailAddress,
          user!.fullName!,
        );
        setClientUser(userDetails.data);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    authHandler();
  }, [user]);

  useEffect(() => {
    if (!isSignedIn) {
      setIsAuthenticated(false);
    }
  }, [isSignedIn]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <GlobalContext.Provider
      value={{
        clientUser,
        isLoading,
        isAuthenticated,
        selectedFolder,
        setSelectedFolder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within the GlobalProvider");
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
