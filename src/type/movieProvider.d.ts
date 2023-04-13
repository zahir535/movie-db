declare interface IProfile {
  name: string;
  password: string;
  key: string;
}

declare interface IReview {
  title: string;
  review: string;
}

declare interface IGenre {
  id: number;
  name: string;
}

declare interface IWatchListItem {
  id: number;
  backdrop_path: string;
  title: string;
}

declare interface IMovieRating {
  movieId: number;
  myRating: number;
}

declare interface IReviewItem {
  author: string;
  author_details: IAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

declare interface IAuthorDetails {
  name: string;
  username: string;
  avatar_path: string;
  rating: any;
}

declare interface IContextState {
  watchList: IWatchListItem[]; // an array of movie id ?
  rating: IDataItem[];
  movie: IDataItem[];
  profile: IProfile;
  review: IReviewItem[];
  genre: IGenre[];
}
