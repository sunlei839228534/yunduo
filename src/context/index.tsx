import { ReactNode } from "react";
import { Provider } from "./provider";

export const AppProviders = ({ children }: { children: ReactNode }) => <Provider children={children}></Provider>