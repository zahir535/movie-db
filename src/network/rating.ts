import axios from "axios";

import { API_KEY } from "../config";

export const postRating = async (sessionId: string, myRating: number, movieId: number) => {
  // console.log("param", { sessionId: sessionId, myRating: myRating, movieId: movieId });
  const POST_RATING = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

  try {
    const postRatingResponse = await axios({
      method: "post",
      url: POST_RATING,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      data: {
        value: myRating,
      },
    });

    const postResultStatus = postRatingResponse.data.success;
    // console.log("postResultStatus", postResultStatus);
    return postResultStatus;
  } catch (e) {
    console.log("e", e);
  }
};

export const deleteRating = async (sessionId: string, movieId: number) => {
  // console.log("param", { sessionId: sessionId, movieId: movieId });
  const DELETE_RATING = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

  try {
    const deleteRatingResponse = await axios({
      method: "delete",
      url: DELETE_RATING,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const deleteResultStatus = deleteRatingResponse.data.success;
    // console.log("deleteResultStatus", deleteResultStatus);
    return deleteResultStatus;
  } catch (e) {
    console.log("e", e);
  }
};

export const getRating = async (credential: credential) => {
  const { sessionId, accountId } = credential;
  const GET_RATING = `https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`;

  try {
    const getRatingResponse = await axios.get(GET_RATING);

    const getResultStatus = getRatingResponse.data.results;
    // console.log("getResultStatus", getResultStatus);
    return getResultStatus;
  } catch (e) {
    console.log("e", e);
  }
};
