import React, { Fragment, FunctionComponent, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { Alert, Dimensions, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { POSTER_PATH } from "../../config";
import { MovieContext } from "../../store";
import { Input } from "../input";
import { Rating, Title } from "../text";
import { GeneralButton, Spacer } from "../view";

interface IShowDetails {
  setVisible: () => void;
  data: IDataItem;
}

interface IRatingStar {
  value: number;
  isFilled: boolean;
}

export const ShowDetails: FunctionComponent<IShowDetails> = ({ setVisible, data }: IShowDetails) => {
  const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");
  const insets = useSafeAreaInsets();
  const { contextState, handleUpdateWatchList, handleAddReview } = useContext(MovieContext);
  const { title, overview, release_date, original_language, adult, vote_average, poster_path, backdrop_path, genre_ids } = data;
  const { review: contextReview, genre: contextGenre } = contextState;
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

  // console.log("genre", { idLists: idLists, genre_ids: genre_ids });

  const showReview = [...contextReview]
    .map((item) => {
      if (item.title === title) {
        return item;
      } else {
        return "";
      }
    })
    .filter((review) => review !== "");
  // console.log("showReview", { showReview: showReview, title: title });

  const isWatchList = contextState.watchList.indexOf(title);
  const [addWatch, setAddWatch] = useState<boolean>(isWatchList !== -1);

  const [addReview, setAddReview] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");

  const [seeReview, setSeeReview] = useState<boolean>(false);

  const [seeRating, setSeeRating] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  // console.log("isWatchList", { isWatchList: isWatchList, addWatch: addWatch });
  // console.log("context", { contextState: contextState.review });

  const handleUpdateWatchlist = () => {
    handleUpdateWatchList(title);
  };

  const handleSeeReview = () => {
    setSeeReview(!seeReview);
    setSeeRating(false);
    setAddReview(false);
  };

  const handleUpdateReview = () => {
    setAddReview(!addReview);
    setSeeRating(false);
    setSeeReview(false);

    if (addReview) {
      handleResetReview();
    }
  };

  const handleSetRating = () => {
    setSeeRating(!seeRating);
    setSeeReview(false);
    setAddReview(false);
  };

  const handleResetReview = () => {
    setReview("");
  };

  const handleSaveReview = () => {
    if (review !== "") {
      const newReview = {
        title: title,
        review: review,
      };
      handleAddReview(newReview);
      setReview("");
      setAddReview(false);
      setSeeReview(true);
    } else {
      setAddReview(false);
      Alert.alert("No review added.");
    }
  };

  const handleAddRating = (value: number) => {
    setRating(value);
  };

  const handleDeleteRating = () => {
    setRating(0);
  };

  const modalStyle: ViewStyle = {
    // flex: 1,
    justifyContent: "space-between",
    // alignItems: "center",
    backgroundColor: Colors.darker,
    width: screenWidth,
    height: screenHeight - insets.bottom,
    // marginTop: -8,
    marginHorizontal: -20,
    // paddingHorizontal: 8,
  };

  const coverImageStyle: ViewStyle = {
    marginTop: 24,
    height: (screenHeight / 3) * 2,
    width: screenWidth,
    backgroundColor: "lightgreen",
    zIndex: -1,
    position: "absolute",
    // marginHorizontal: -8,
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

  const buttonInvertedStyle: ViewStyle = {
    // backgroundColor: "white",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  };

  const buttonInvertedTextStyle: TextStyle = {
    color: "white",
  };

  const multiInputStyle: ViewStyle = {
    height: 56,
    paddingLeft: 16,
    width: (screenWidth * 5) / 6,
  };

  const starArray: IRatingStar[] = [];
  for (let i = 0; i < 10; i++) {
    const item = { value: i + 1, isFilled: i < rating ? true : false };
    starArray.push(item);
  }

  let ratingStar = (
    <Fragment>
      {starArray.map((item, index) => {
        const handleUpdateRating = () => {
          handleAddRating(index + 1);
        };

        return (
          <Fragment key={index}>
            <Pressable onPress={handleUpdateRating} style={{}}>
              <Icon name={item.isFilled === true ? "heart" : "heart-outlined"} size={14} color="white" style={{ opacity: 0.6 }} />
            </Pressable>
          </Fragment>
        );
      })}
    </Fragment>
  );

  let contentAddRating = (
    <Fragment>
      {rating > 0 ? (
        <Fragment>
          <View style={{ flexDirection: "row" }}>{ratingStar}</View>
          <Spacer space={12} />
          <Text onPress={handleDeleteRating} style={{ color: "white", marginTop: 4, opacity: 0.6, flexWrap: "wrap" }}>
            Delete rating
          </Text>
        </Fragment>
      ) : (
        <Fragment>
          <View style={{ flexDirection: "row" }}>{ratingStar}</View>
          <Spacer space={12} />
          <Text style={{ color: "white", marginTop: 4, opacity: 0.6, flexWrap: "wrap" }}>You didn't rate this movie yet</Text>
          {/* <Text style={{ color: "white", marginTop: 4, opacity: 0.6, flexWrap: "wrap" }}>{rating}</Text> */}
        </Fragment>
      )}
    </Fragment>
  );

  useEffect(() => {
    setAddWatch(isWatchList !== -1);
  }, [isWatchList]);

  const posterImage = { uri: `${POSTER_PATH}${backdrop_path}` };

  const Loading = () => {
    return <View />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data !== undefined ? (
        <Fragment>
          <View style={modalStyle}>
            <ScrollView style={{}}>
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

              <View style={{ paddingHorizontal: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Pressable onPress={setVisible}>
                    <View
                      style={{
                        marginTop: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        // shadowOffset: {
                        //   width: 8,
                        //   height: -8,
                        // },
                        // shadowOpacity: 0.5,
                        // shadowRadius: 8,
                      }}>
                      <Icon name="chevron-left" size={30} color="white" />
                      <Text style={{ fontWeight: "700", color: "white" }}>Back</Text>
                    </View>
                  </Pressable>
                  <Rating label={Number.parseFloat(vote_average.toString()).toFixed(1)} iconName={"star"} />
                </View>

                <View style={{ marginTop: (screenHeight / 2) * 1.2 }}>
                  <Title
                    label={title}
                    subLabel_1={release_date}
                    subLabel_2={original_language}
                    overview={overview}
                    labelIcon={adult}
                    iconName={"warning"}
                  />
                  {idLists.length > 0 ? (
                    <Fragment>
                      <Spacer space={8} />
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "white", marginTop: 4, opacity: 0.6, marginRight: 8 }}>Genre: </Text>
                        <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>{idLists.join(", ")}</Text>
                      </View>
                    </Fragment>
                  ) : null}
                  <Spacer space={24} />
                  <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <View style={{ alignItems: "center" }}>
                      <Pressable onPress={handleUpdateWatchlist} style={{}}>
                        <Icon name={addWatch === true ? "check" : "plus"} size={28} color="white" style={{ opacity: 0.6 }} />
                      </Pressable>
                      <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>My List</Text>
                    </View>

                    <Spacer space={24} isHorizontal={true} />
                    <View style={{ alignItems: "center" }}>
                      <Pressable onPress={handleUpdateReview} style={{}}>
                        <Icon name={"emoji-flirt"} size={28} color="white" style={{ opacity: 0.6 }} />
                      </Pressable>
                      <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>Add Review</Text>
                    </View>

                    <Spacer space={24} isHorizontal={true} />
                    <View style={{ alignItems: "center" }}>
                      <Pressable onPress={handleSeeReview} style={{}}>
                        <Icon name={"emoji-flirt"} size={28} color="white" style={{ opacity: 0.6 }} />
                      </Pressable>
                      <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>See Review</Text>
                    </View>

                    <Spacer space={24} isHorizontal={true} />
                    <View style={{ alignItems: "center" }}>
                      <Pressable onPress={handleSetRating} style={{}}>
                        <Icon name={"heart-outlined"} size={28} color="white" style={{ opacity: 0.6 }} />
                      </Pressable>
                      <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>Add Rating</Text>
                    </View>
                  </View>

                  <Fragment>
                    <Spacer space={24} />
                    <Text style={overviewStyle}>{overview}</Text>
                  </Fragment>
                  <Spacer space={36} />

                  {addReview ? (
                    <Fragment>
                      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>Your Review</Text>
                        <Pressable onPress={handleUpdateReview} style={{}}>
                          <Icon name={"cross"} size={28} color="white" style={{ opacity: 0.6 }} />
                        </Pressable>
                      </View>
                      <Input placeholder="review" multiline value={review} onChangeText={setReview} viewStyle={multiInputStyle} />
                      <GeneralButton
                        label={"Add review"}
                        onPress={handleSaveReview}
                        viewStyle={buttonInvertedStyle}
                        textStyle={buttonInvertedTextStyle}
                      />
                      <Spacer space={36} />
                    </Fragment>
                  ) : null}

                  {seeReview ? (
                    <Fragment>
                      {showReview.length > 1 ? (
                        <Fragment>
                          {showReview.map((theReview, index) => {
                            return (
                              <Text key={index} style={{ color: "white", marginTop: 4, opacity: 0.6, flexWrap: "wrap" }}>
                                {theReview.title} - {theReview.review}
                              </Text>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <Text style={{ color: "white", marginTop: 4, opacity: 0.6, flexWrap: "wrap" }}>No review for this movie</Text>
                      )}
                    </Fragment>
                  ) : null}

                  {seeRating ? <Fragment>{contentAddRating}</Fragment> : null}

                  <GeneralButton
                    label={addWatch !== true ? "Add to my watchlist" : "Remove from my watchlist"}
                    onPress={handleUpdateWatchlist}
                    viewStyle={buttonStyle}
                    icon={addWatch === true ? "check" : "plus"}
                  />
                  <Spacer space={56} />
                </View>
              </View>
            </ScrollView>
          </View>
        </Fragment>
      ) : null}
    </SafeAreaView>
  );
};
