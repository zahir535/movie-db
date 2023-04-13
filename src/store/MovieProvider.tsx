import React, { createContext, FunctionComponent, ReactNode, useState } from "react";

export interface IMovieContext {
  contextState: IContextState;
  selectedItem: IDataItem | undefined;
  handleUpdateWatchList: (value: IWatchListItem[]) => void;
  handleUpdateProfile: (value: IProfile) => void;
  handleUpdateReview: (value: IReviewItem[]) => void;
  handleUpdateGenre: (value: IGenre[]) => void;
  handleUpdateMovie: (value: IDataItem[]) => void;
  handleUpdateFetchDashboard: (genre: IGenre[], movie: IDataItem[], rating: IDataItem[]) => void;
  handleUpdatedSelectedItem: (value: IDataItem) => void;
  handleUpdateRating: (value: IDataItem[]) => void;
  handleUpdateShowDetails: (watchList: IWatchListItem[], rating: IDataItem[], review: IReviewItem[]) => void;
}

interface IMovieProvider {
  children: ReactNode;
}

const initialState: IContextState = {
  watchList: [],
  rating: [],
  movie: [],
  profile: {
    name: "",
    password: "",
    key: "",
  },
  review: [],
  genre: [],
};

export const MovieContext = createContext<IMovieContext>({
  contextState: initialState,
  selectedItem: undefined,
  handleUpdateWatchList: () => {},
  handleUpdateProfile: () => {},
  handleUpdateReview: () => {},
  handleUpdateGenre: () => {},
  handleUpdateMovie: () => {},
  handleUpdateFetchDashboard: () => {},
  handleUpdatedSelectedItem: () => {},
  handleUpdateRating: () => {},
  handleUpdateShowDetails: () => {},
});

const { Provider } = MovieContext;

export const MovieProvider: FunctionComponent<IMovieProvider> = ({ children }: IMovieProvider) => {
  const [contextState, setContextState] = useState<IContextState>(initialState);
  const [selectedItem, setSelectedItem] = useState<IDataItem | undefined>(undefined);

  const handleUpdateWatchList = (value: IWatchListItem[]) => {
    setContextState({ ...contextState, watchList: [...value] });
  };

  const handleUpdateShowDetails = (watchList: IWatchListItem[], rating: IDataItem[], review: IReviewItem[]) => {
    setContextState({ ...contextState, watchList: [...watchList], rating: [...rating], review: [...review] });
  };

  const handleUpdateProfile = (value: IProfile) => {
    setContextState({ ...contextState, profile: value });
  };

  const handleUpdateReview = (value: IReviewItem[]) => {
    setContextState({ ...contextState, review: [...value] });
  };

  const handleUpdateGenre = (value: IGenre[]) => {
    setContextState({ ...contextState, genre: value });
  };

  const handleUpdateMovie = (value: IDataItem[]) => {
    setContextState({ ...contextState, movie: [...value] });
  };

  const handleUpdateFetchDashboard = (genre: IGenre[], movie: IDataItem[]) => {
    setContextState({ ...contextState, genre: genre, movie: [...movie] });
  };

  const handleUpdatedSelectedItem = (value: IDataItem) => {
    setSelectedItem(value);
  };

  const handleUpdateRating = (value: IDataItem[]) => {
    setContextState({ ...contextState, rating: [...value] });
  };

  return (
    <Provider
      value={{
        contextState,
        selectedItem,
        handleUpdateWatchList,
        handleUpdateProfile,
        handleUpdateReview,
        handleUpdateGenre,
        handleUpdateMovie,
        handleUpdateFetchDashboard,
        handleUpdatedSelectedItem,
        handleUpdateRating,
        handleUpdateShowDetails,
      }}>
      {children}
    </Provider>
  );
};
