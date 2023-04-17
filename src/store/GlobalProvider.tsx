import React, { createContext, FunctionComponent, ReactNode, useState } from "react";

interface IGlobalState {
  sessionId: string;
  accountId: string;
}

export interface IGlobalContext {
  globalState: IGlobalState;
  handleUpdateSessionIdAccountId: (value: string, accountId: string) => void;
  handleResetGlobal: () => void;
}

interface IGlobalProvider {
  children: ReactNode;
}

const initialState: IGlobalState = {
  sessionId: "",
  accountId: "",
};

export const GlobalContext = createContext<IGlobalContext>({
  globalState: initialState,
  handleUpdateSessionIdAccountId: () => {},
  handleResetGlobal: () => {},
});

const { Provider } = GlobalContext;

export const GlobalProvider: FunctionComponent<IGlobalProvider> = ({ children }: IGlobalProvider) => {
  const [globalState, setGlobalState] = useState<IGlobalState>(initialState);

  const handleUpdateSessionIdAccountId = (value: string, accountId: string) => {
    setGlobalState({ ...globalState, sessionId: value, accountId: accountId });
  };

  const handleResetGlobal = () => {
    setGlobalState({ ...initialState });
  };

  return <Provider value={{ globalState, handleUpdateSessionIdAccountId, handleResetGlobal }}>{children}</Provider>;
};
