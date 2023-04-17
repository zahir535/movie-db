import React, { Fragment, useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { Container, ItemView, Spacer } from "../components";
import { getMovieWatchList } from "../network";
import { GlobalContext, MovieContext } from "../store";

export const WatchList = ({ navigation }) => {
  const { handleUpdateWatchList, contextState, handleUpdatedSelectedItem } = useContext(MovieContext);
  const { globalState } = useContext(GlobalContext);
  const { sessionId, accountId } = globalState;
  const { watchList } = contextState;

  const handleShowDetail = () => {
    navigation.navigate("MovieDetail");
  };

  const handleFetchWatchList = async () => {
    handleUpdateWatchList(await getMovieWatchList({ sessionId: sessionId, accountId: parseInt(accountId) }, 1));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const itemStyles: ViewStyle = {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  };

  useEffect(() => {
    handleFetchWatchList();
  }, []);

  return (
    <Fragment>
      <Container>
        <Pressable onPress={handleGoBack}>
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

        <Spacer space={36} />
        {watchList.length > 1 ? (
          <Fragment>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <View style={itemStyles}>
                {watchList.map((item, index) => {
                  const { title, poster_path } = item;

                  const handleOpenItem = () => {
                    handleShowDetail();
                    handleUpdatedSelectedItem(item);
                  };

                  return (
                    <Pressable key={index} onPress={handleOpenItem}>
                      <ItemView image={poster_path} title={title} />
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </Fragment>
        ) : (
          <Fragment>
            <Text style={{ color: "white" }}>No item in watch list</Text>
          </Fragment>
        )}
      </Container>
    </Fragment>
  );
};
