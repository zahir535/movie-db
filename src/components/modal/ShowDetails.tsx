import React, { Fragment, FunctionComponent, useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, TextStyle, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { MovieContext } from "../../store";
import { Input } from "../input";
import { Rating, Title } from "../text";
import { GeneralButton, Spacer } from "../view";

interface IShowDetails {
  setVisible: () => void;
  data: IDataItem | undefined;
}

export const ShowDetails: FunctionComponent<IShowDetails> = ({ setVisible, data }: IShowDetails) => {
  const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");
  const insets = useSafeAreaInsets();
  const { contextState, handleUpdateWatchList, handleAddReview } = useContext(MovieContext);
  const { title, overview, release_date, original_language, adult, vote_average } = data;
  const { review: contextReview } = contextState;

  const isWatchList = contextState.watchList.indexOf(title);
  const [addWatch, setAddWatch] = useState<boolean>(isWatchList !== -1);

  const [addReview, setAddReview] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");

  const [seeReview, setSeeReview] = useState<boolean>(false);

  // console.log("isWatchList", { isWatchList: isWatchList, addWatch: addWatch });
  console.log("context", { contextState: contextState.review });

  const handleUpdateWatchlist = () => {
    handleUpdateWatchList(title);
  };

  const handleUpdateSeeReview = () => {
    setSeeReview(!seeReview);
  };

  const handleUpdateReview = () => {
    setAddReview(!addReview);

    if (addReview) {
      handleResetReview();
    }
  };

  const handleResetReview = () => {
    setReview("");
  };

  const handleSaveReview = () => {
    const newReview = {
      title: title,
      review: review,
    };
    handleAddReview(newReview);
  };

  const handleSeeReview = () => {};

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

  useEffect(() => {
    setAddWatch(isWatchList !== -1);
  }, [isWatchList]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {data !== undefined ? (
        <Fragment>
          <View style={modalStyle}>
            <ScrollView style={{}}>
              <ImageBackground style={coverImageStyle} source={require("../../dummyData/movie-cover.jpeg")} resizeMode={"cover"}>
                <LinearGradient
                  colors={[Colors.darker, "transparent", Colors.darker]}
                  locations={[0, 0.5, 1]}
                  style={{ paddingLeft: 15, paddingRight: 15, borderRadius: 5 }}>
                  <View style={{ height: (screenHeight / 3) * 2, width: screenWidth }}></View>
                </LinearGradient>
              </ImageBackground>

              <View style={{ paddingHorizontal: 12 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Pressable onPress={setVisible}>
                    <View
                      style={{
                        marginTop: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        shadowOffset: {
                          width: 8,
                          height: -8,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 8,
                      }}>
                      <Icon name="chevron-left" size={30} color="white" />
                      <Text style={{ fontWeight: "700", color: "white" }}>Back</Text>
                    </View>
                  </Pressable>
                  <Rating label={vote_average} iconName={"star"} />
                </View>

                <View style={{ marginTop: (screenHeight / 2) * 1.1 }}>
                  <Title
                    label={title}
                    subLabel_1={release_date}
                    subLabel_2={original_language}
                    overview={overview}
                    labelIcon={adult}
                    iconName={"warning"}
                  />

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
                      <Pressable onPress={handleUpdateSeeReview} style={{}}>
                        <Icon name={"emoji-flirt"} size={28} color="white" style={{ opacity: 0.6 }} />
                      </Pressable>
                      <Text style={{ color: "white", marginTop: 4, opacity: 0.6 }}>See Review</Text>
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
                    // .filter((item) => {
                    //   item.title === title;
                    // })
                    <Fragment>
                      {contextReview.map((theReview, index) => {
                        return (
                          <Text key={index} style={{ color: "white", marginTop: 4, opacity: 0.6, flexWrap: "wrap" }}>
                            {theReview.title} - {theReview.review}
                          </Text>
                        );
                      })}
                    </Fragment>
                  ) : null}

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
