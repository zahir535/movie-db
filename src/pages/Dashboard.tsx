import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { Container } from "../components/container";
import { Search } from "../components/input";
import { ItemView, Spacer } from "../components/view";
import { fetchGenreData, getRating, trendingDataDashboard } from "../network";
import { GlobalContext, MovieContext } from "../store";

export const Dashboard = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { handleUpdateFetchDashboard, contextState, handleUpdatedSelectedItem } = useContext(MovieContext);
  const { handleResetGlobal, globalState } = useContext(GlobalContext);
  const { movie } = contextState;
  const { sessionId, accountId } = globalState;

  const handleFetch = async () => {
    // todo - no error handling for network yet
    // setData(await trendingDataDashboard());
    // handleUpdateMovie(await trendingDataDashboard());
    // handleUpdateGenre(await fetchGenreData());
    handleUpdateFetchDashboard(
      await fetchGenreData(),
      await trendingDataDashboard(),
      await getRating({ sessionId: sessionId, accountId: parseInt(accountId) }),
    );
  };

  const handleLogOut = () => {
    handleResetGlobal();
    navigation.goBack();
  };

  const handleShowDetail = () => {
    navigation.navigate("MovieDetail");
  };

  const handleSearch = () => {
    setSearch(query);
  };

  const handleGoToWatchList = () => {
    navigation.navigate("WatchList");
  };

  const itemStyles: ViewStyle = {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  };

  const searchStyles: ViewStyle = {
    marginBottom: 20,
    marginRight: 16,
  };

  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (query === "") {
      setSearch("");
    }
  }, [query]);

  return (
    <Container>
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <Search onPress={handleSearch} value={query} onChangeText={setQuery} viewStyle={searchStyles} />

        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
          <Pressable onPress={handleGoToWatchList} style={{ alignItems: "center" }}>
            <Icon name="drink" size={24} color="white" />
            <Text style={{ color: "white" }}>Watchlist</Text>
          </Pressable>

          <Spacer space={12} isHorizontal={true} />

          <Pressable onPress={handleLogOut} style={{ alignItems: "center" }}>
            <Icon name="log-out" size={24} color="white" />
            <Text style={{ color: "white" }}>Log out</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={itemStyles}>
          {movie
            .filter((item) => item.title !== undefined && item.title.toLowerCase().includes(search !== "" ? search.toLowerCase() : ""))
            .map((item, index) => {
              const { title, poster_path } = item;

              const handleOpenItem = () => {
                handleUpdatedSelectedItem(item);
                handleShowDetail();
              };

              return (
                <Pressable key={index} onPress={handleOpenItem}>
                  <ItemView image={poster_path} title={title} />
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
    </Container>
  );
};
