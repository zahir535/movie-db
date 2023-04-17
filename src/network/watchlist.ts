import axios from "axios";

import { API_KEY } from "../config";

export const getMovieWatchList = async (credential: credential, page: number) => {
  // console.log("param", { credential: credential, page: page });
  const { accountId, sessionId } = credential;
  const GET_MOVIE_WATCHLIST = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`;

  try {
    const getMovieWatchListResponse = await axios.get(GET_MOVIE_WATCHLIST);

    const savedList = getMovieWatchListResponse.data.results;
    // console.log("getMovieWatchListResponse", getMovieWatchListResponse);
    return savedList;
  } catch (e) {
    console.log("e", e);
  }
};

export const addWatchlist = async (credential: credential, type: movieTye, id: number, isAdded: boolean) => {
  const { accountId, sessionId } = credential;
  const ADD_WATCHLIST = `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`;

  const addWatchlistResponse = await axios({
    method: "post",
    url: ADD_WATCHLIST,
    data: {
      media_type: type,
      media_id: id,
      watchlist: isAdded,
    },
  });

  console.log("addWatchlistResponse", addWatchlistResponse.data);
};
