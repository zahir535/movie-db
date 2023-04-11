import axios from "axios";

const LIST_URL = "https://api.themoviedb.org/3/list/524?api_key=d7e8086aebd8c4229f62b61de17ad1c8&language=en-US";
const TRENDING_URL = "https://api.themoviedb.org/3/trending/all/week?api_key=d7e8086aebd8c4229f62b61de17ad1c8";
const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=d7e8086aebd8c4229f62b61de17ad1c8&language=en-US";

export const dataDashboard = async () => {
  const listResponse = await axios({
    method: "get",
    url: LIST_URL,
  });

  //   console.log("listResponse", listResponse.data.items);
};

export const trendingDataDashboard = async () => {
  const trendingResponse = await axios({
    method: "get",
    url: TRENDING_URL,
  });

  //   console.log("trendingResponse", trendingResponse.data.results);
  return trendingResponse.data.results;
};

export const fetchGenreData = async () => {
  const genreResponse = await axios({
    method: "get",
    url: GENRE_URL,
  });

  //   console.log("trendingResponse", trendingResponse.data.results);
  return genreResponse.data.genres;
};
