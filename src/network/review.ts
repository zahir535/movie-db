import axios from "axios";

import { API_KEY } from "../config";

export const getMovieReview = async (movieId: number) => {
  const GET_MOVIE_REVIEW = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const reviewResponse = await axios.get(GET_MOVIE_REVIEW);

    const movieReview = reviewResponse.data.results;
    // console.log("movieReview", movieReview);
    return movieReview;
  } catch (e) {
    console.log("e", e);
  }
};
