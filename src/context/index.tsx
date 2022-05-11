import { ReactNode } from "react";
import { AuthProvider } from "./auth";

export const AppProviders = ({ children }: { children: ReactNode }) => <AuthProvider children={children}></AuthProvider>