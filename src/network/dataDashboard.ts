import axios from "axios";

import { API_KEY } from "../config";

export const dataDashboard = async () => {
  const LIST_URL = `https://api.themoviedb.org/3/list/524?api_key=${API_KEY}&language=en-US`;
  const listResponse = await axios({
    method: "get",
    url: LIST_URL,
  });

  return listResponse.data;

  //   console.log("listResponse", listResponse.data.items);
};

export const trendingDataDashboard = async () => {
  const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
  const trendingResponse = await axios({
    method: "get",
    url: TRENDING_URL,
  });

  //   console.log("trendingResponse", trendingResponse.data.results);
  return trendingResponse.data.results;
};

export const fetchGenreData = async () => {
  const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const genreResponse = await axios({
    method: "get",
    url: GENRE_URL,
  });

  //   console.log("trendingResponse", trendingResponse.data.results);
  return genreResponse.data.genres;
};
