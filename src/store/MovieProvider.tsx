import React, { createContext, FunctionComponent, ReactNode, useState } from "react";

interface IProfile {
  name: string;
  password: string;
  key: string;
}

interface IReview {
  title: string;
  review: string;
}

interface IContextState {
  watchList: string[];
  profile: IProfile;
  review: IReview[];
}

export interface IMovieContext {
  contextState: IContextState;
  handleUpdateWatchList: (value: string) => void;
  handleUpdateProfile: (value: IProfile) => void;
  handleAddReview: (value: IReview) => void;
}

interface IMovieProvider {
  children: ReactNode;
}

const initialState: IContextState = {
  watchList: [],
  profile: {
    name: "",
    password: "",
    key: "",
  },
  review: [],
};

export const MovieContext = createContext<IMovieContext>({
  contextState: initialState,
  handleUpdateWatchList: () => {},
  handleUpdateProfile: () => {},
  handleAddReview: () => {},
});

const { Provider } = MovieContext;

export const MovieProvider: FunctionComponent<IMovieProvider> = ({ children }: IMovieProvider) => {
  const [contextState, setContextState] = useState<IContextState>(initialState);

  const handleUpdateWatchList = (value: string) => {
    const { watchList } = contextState;
    const updatedWatchList = [...watchList];

    const isExist = updatedWatchList.indexOf(value);
    if (isExist === -1) {
      updatedWatchList.push(value);
    } else {
      updatedWatchList.splice(isExist, 1);
    }

    setContextState({ ...contextState, watchList: [...updatedWatchList] });
  };

  const handleUpdateProfile = (value: IProfile) => {
    setContextState({ ...contextState, profile: value });
  };

  const handleAddReview = (value: IReview) => {
    const { review } = contextState;
    const updatedReview = [...review];
    updatedReview.push(value);

    setContextState({ ...contextState, review: updatedReview });
  };

  return <Provider value={{ contextState, handleUpdateWatchList, handleUpdateProfile, handleAddReview }}>{children}</Provider>;
};
