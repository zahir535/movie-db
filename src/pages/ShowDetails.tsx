import React, { Fragment, Suspense, useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Pressable, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Container, GeneralButton, Rating, Spacer, Title } from "../components";
import { POSTER_PATH } from "../config";
import { addWatchlist, deleteRating, getMovieReview, getMovieWatchList, getRating, postRating } from "../network";
import { GlobalContext, MovieContext } from "../store";

interface IRatingStar {
  value: number;
  isFilled: boolean;
}

export const ShowDetails = ({ navigation }) => {
  const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");

  const { contextState, selectedItem, handleUpdateShowDetails } = useContext(MovieContext);
  const { globalState } = useContext(GlobalContext);
  const { accountId, sessionId } = globalState;
  const { review: contextReview, genre: contextGenre, watchList, rating: contextRating } = contextState;

  const { title, overview, release_date, original_language, adult, vote_average, backdrop_path, genre_ids, id } = selectedItem;
  const movieReview = [...contextReview];
  const posterImage = { uri: `${POSTER_PATH}${backdrop_path}` };
  const idLists = contextGenre
    .map((item, index) => {
      const { id, name } = item;
      if (genre_ids.indexOf(id) !== -1) {
        return name;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);

  const yourRating = contextRating
    .map((item, index) => {
      const { id: itemId, rating } = item;
      if (itemId === id) {
        return rating;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);

  let isWatchList = false;
  if (watchList.length > 1) {
    watchList.forEach((item) => {
      const { id: listId } = item;

      if (listId === id) {
        isWatchList = true;
      }
    });
  }

  const [addWatch, setAddWatch] = useState<boolean>(isWatchList);
  const [fetching, setFetching] = useState(false);

  const [seeReview, setSeeReview] = useState<boolean>(false);

  const [seeRating, setSeeRating] = useState<boolean>(false);
  const theRating = yourRating !== undefined && yourRating !== null && yourRating.length > 0 ? yourRating[0] : 0;
  const [rating, setRating] = useState<number>(theRating);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<number>(0);
  let modalContent = <View />;

  const starArray: IRatingStar[] = [];
  for (let i = 0; i < 10; i++) {
    const item = { value: i + 1, isFilled: i < rating ? true : false };
    starArray.push(item);
  }

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleFetch = async () => {
    setFetching(true);
    handleUpdateShowDetails(
      await getMovieWatchList({ sessionId: sessionId, accountId: parseInt(accountId) }, 1),
      await getRating({ sessionId: sessionId, accountId: parseInt(accountId) }),
      await getMovieReview(id),
    );
    setFetching(false);
  };

  const handleUpdateUserWatchList = async () => {
    // if addWatch == true, that mean the movie is in watchlist. and we run the function to remove it from watchlist
    setFetching(true);
    try {
      if (addWatch === true) {
        await addWatchlist({ sessionId: sessionId, accountId: parseInt(accountId) }, "movie", id, false);
        setAddWatch(false);
      } else {
        await addWatchlist({ sessionId: sessionId, accountId: parseInt(accountId) }, "movie", id, true);
        setAddWatch(true);
      }
    } catch (e) {}
    setFetching(false);
  };

  const handleQuickAction = (value: number) => {
    if (value !== 0) {
      handleShowModal();
      setContent(value);
    } else {
      handleUpdateUserWatchList();
    }
  };

  const handleAddRating = async (value: number) => {
    await postRating(sessionId, value, id);
    setRating(value);
  };

  const handleDeleteRating = async () => {
    await deleteRating(sessionId, id);
    setRating(0);
  };

  const handleCloseShowDetail = async () => {
    navigation.goBack();
  };

  const handleSetRating = () => {
    setSeeRating(!seeRating);
  };

  const handleSeeReview = () => {
    setSeeReview(!seeReview);
    setContent(3);
  };

  const pageStyle: ViewStyle = {
    backgroundColor: Colors.darker,
    marginHorizontal: -8,
  };

  const coverImageStyle: ViewStyle = {
    marginTop: 24,
    backgroundColor: Colors.darker,
    position: "absolute",
  };

  const overviewStyle: TextStyle = {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: "white",
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: "white",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  };

  let ratingStar = (
    <Fragment>
      {starArray.map((item, index) => {
        const handleUpdateRating = () => {
          handleAddRating(index + 1);
        };

        return (
          <Fragment key={index}>
            <Pressable onPress={handleUpdateRating} style={{}}>
              <Icon name={item.isFilled === true ? "heart" : "heart-outlined"} color={"white"} size={18} style={{ opacity: 0.6 }} />
            </Pressable>
          </Fragment>
        );
      })}
    </Fragment>
  );

  let contentAddRating = (
    <View style={{ backgroundColor: Colors.darker, height: 128, padding: 8 }}>
      <View style={{ alignItems: "flex-end" }}>
        <Pressable onPress={handleShowModal} style={{}}>
          <Icon name={"cross"} color={"white"} size={28} style={{ opacity: 0.6 }} />
        </Pressable>
        <Spacer space={12} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", borderRadius: 8 }}>
        <View style={{ flexDirection: "row" }}>{ratingStar}</View>
        <Spacer space={12} />
        {rating > 0 ? (
          <Fragment>
            <Text onPress={handleDeleteRating} style={{ marginTop: 4, opacity: 0.6, flexWrap: "wrap", color: "white" }}>
              Delete rating
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            <Text style={{ color: "white", marginTop: 4, opacity: 0.6, flexWrap: "wrap" }}>You didn't rate this movie yet</Text>
          </Fragment>
        )}
      </View>
    </View>
  );

  let contentReview = (
    <Fragment>
      <View
        style={{
          minHeight: 300,
          backgroundColor: Colors.darker,
          paddingHorizontal: 12,
          paddingBottom: 12,
          marginBottom: 36,
          marginTop: 48,
          borderRadius: 8,
        }}>
        <View style={{ alignItems: "flex-end" }}>
          <Spacer space={12} />
          <Pressable onPress={handleShowModal} style={{}}>
            <Icon name={"cross"} color={"white"} size={28} style={{ opacity: 0.6 }} />
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {movieReview.length > 1 ? (
            <Fragment>
              {/* <Spacer space={36} /> */}
              <Text style={{ color: "white", fontWeight: "bold" }}>Movie Reviews ({movieReview.length}): </Text>
              {movieReview.map((item, index) => {
                const { content, author } = item;

                return (
                  <Fragment key={index}>
                    <Spacer space={24} />
                    <View>
                      <Text style={{ color: "white", fontSize: 16, lineHeight: 20 }}>{content}</Text>
                    </View>

                    <Spacer space={12} />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <View />
                      <Text style={{ color: "white", fontWeight: "700" }}>by: {author}</Text>
                    </View>
                  </Fragment>
                );
              })}
            </Fragment>
          ) : null}
        </ScrollView>
      </View>
    </Fragment>
  );

  const Loading = () => {
    return <View />;
  };

  const optionRender: IOptionRender[] = [
    { onPress: handleUpdateUserWatchList, render: <View /> },
    { onPress: handleSetRating, render: contentAddRating },
    { onPress: handleSeeReview, render: contentReview },
  ];

  const optionButtons: IOptionMenu[] = [
    { title1: "My List", onPress: () => {}, icon1: "check", icon2: "plus", iconCondition: addWatch },
    {
      title1: "Add Rating",
      title2: "My Rating",
      titleCondition: rating === 0,
      onPress: () => {},
      icon1: "heart-outlined",
      icon2: "heart-outlined",
      iconCondition: true,
    },
    { title1: "See Review", title2: "", onPress: () => {}, icon1: "emoji-flirt", icon2: "emoji-flirt", iconCondition: true },
  ];

  switch (content) {
    case 0:
      modalContent = optionRender[content].render;
      break;
    case 1:
      modalContent = optionRender[content].render;
      break;
    case 2:
      modalContent = optionRender[content].render;
      break;

    default:
      modalContent = <View />;
      break;
  }

  useEffect(() => {
    handleFetch();
  }, [addWatch, rating]);

  return (
    <Fragment>
      {selectedItem !== undefined ? (
        <Fragment>
          <Container style={pageStyle}>
            <ScrollView style={{ flex: 1 }}>
              {/* cover image */}
              <Suspense fallback={<Loading />}>
                <ImageBackground style={coverImageStyle} source={posterImage} resizeMode={"cover"}>
                  <LinearGradient
                    colors={[Colors.darker, "transparent", Colors.darker]}
                    locations={[0, 0.5, 1]}
                    style={{ paddingLeft: 15, paddingRight: 15, borderRadius: 5 }}>
                    <View style={{ height: (screenHeight / 3) * 2, width: screenWidth }}></View>
                  </LinearGradient>
                </ImageBackground>
              </Suspense>

              {/* back button & rating movie */}
              <View style={{ paddingHorizontal: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Pressable onPress={handleCloseShowDetail}>
                    <View
                      style={{
                        marginTop: 8,
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <Icon name="chevron-left" size={30} color="white" />
                      <Text style={{ fontWeight: "700", color: "white" }}>Back</Text>
                    </View>
                  </Pressable>
                  <Rating label={Number.parseFloat(vote_average.toString()).toFixed(1)} iconName={"star"} />
                </View>

                {/* content view */}
                <View style={{ marginTop: (screenHeight / 2) * 1.2 }}>
                  {/* movie title */}
                  <Title
                    label={title}
                    subLabel_1={release_date}
                    subLabel_2={original_language}
                    overview={overview}
                    labelIcon={adult}
                    iconName={"warning"}
                  />

                  {/* movie's genre  */}
                  {idLists.length > 0 ? (
                    <Fragment>
                      <Spacer space={8} />
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "white", marginTop: 4, opacity: 0.6, marginRight: 8 }}>Genre: </Text>
                        <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>{idLists.join(", ")}</Text>
                      </View>
                    </Fragment>
                  ) : null}

                  {/* button list */}
                  <Spacer space={24} />
                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    {optionButtons.length > 1 ? (
                      <Fragment>
                        {optionButtons.map((item, index) => {
                          const { title1, onPress, icon1, icon2, iconCondition, titleCondition, title2 = "-" } = item;

                          const handleRunOption = () => {
                            return handleQuickAction(index);
                          };

                          const titleDynamic = titleCondition !== undefined && titleCondition ? title1 : title2;
                          const theTitle = titleCondition !== undefined && title2 !== undefined ? titleDynamic : title1;

                          return (
                            <Fragment key={index}>
                              {index !== 0 ? <Spacer space={24} isHorizontal={true} /> : null}
                              <Pressable onPress={handleRunOption} style={{}}>
                                <View style={{ alignItems: "center" }}>
                                  <Icon name={iconCondition ? icon1 : icon2} size={28} color="white" style={{ opacity: 0.6 }} />
                                  <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>{theTitle}</Text>
                                </View>
                              </Pressable>
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    ) : null}
                  </View>

                  {/* movie overview */}
                  <Fragment>
                    <Spacer space={24} />
                    <Text style={overviewStyle}>{overview}</Text>
                  </Fragment>

                  {/* add watchlist button */}
                  <Spacer space={36} />
                  <GeneralButton
                    label={!addWatch ? "Add to my watchlist" : "Remove from my watchlist"}
                    onPress={handleUpdateUserWatchList}
                    viewStyle={buttonStyle}
                    icon={addWatch ? "check" : "plus"}
                  />
                  <Spacer space={56} />
                </View>
              </View>
            </ScrollView>

            {/* modal content */}
            <Fragment>
              <Modal isVisible={showModal}>{modalContent}</Modal>
            </Fragment>
          </Container>
        </Fragment>
      ) : null}
    </Fragment>
  );
};
