import React, { Fragment, useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";

import { Container } from "../components/container";
import { Search } from "../components/input";
import { ShowDetails } from "../components/modal";
import { ItemView } from "../components/view";
import { fetchGenreData, trendingDataDashboard } from "../network";
import { MovieContext } from "../store";

export const Dashboard = ({ navigation }) => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDataItem | undefined>(undefined);

  const { handleUpdateGenre } = useContext(MovieContext);

  const handleFetch = async () => {
    setData(await trendingDataDashboard());
    handleUpdateGenre(await fetchGenreData());
  };

  const handleCloseDetails = () => {
    setShowDetail(false);
  };

  const handleLogOut = () => {
    navigation.goBack();
  };

  const handleNextPage = () => {};
  const handlePrevPage = () => {};
  const handleSearch = () => {};

  const itemStyles: ViewStyle = {
    // marginTop: 40,
    flexWrap: "wrap",
    flexDirection: "row",
    // justifyContent: "space-around",
    justifyContent: "flex-start",
    // backgroundColor: "black",
  };

  const searchStyles: ViewStyle = {
    marginBottom: 20,
    marginRight: 16,
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Container>
      <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
        <Search onPress={handleSearch} value={query} onChangeText={setQuery} viewStyle={searchStyles} />

        <Pressable onPress={handlePrevPage}>
          <Icon name="chevron-left" size={30} color="#900" />
        </Pressable>
        <Text style={{ color: "white" }}>{page}</Text>
        <Pressable onPress={handleNextPage}>
          <Icon name="chevron-right" size={30} color="#900" />
        </Pressable>

        <Pressable onPress={handleLogOut}>
          <Icon name="network" size={30} color="white" />
        </Pressable>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={itemStyles}>
          {data
            .filter((item) => item.title !== undefined && item.title.toLowerCase().includes(query.toLowerCase()))
            .map((item, index) => {
              const { title, popularity, poster_path, backdrop_path } = item;

              const handleOpenItem = () => {
                setShowDetail(true);
                setSelectedItem(item);
              };

              return (
                <Pressable key={index} onPress={handleOpenItem}>
                  <ItemView image={poster_path} title={title} />
                </Pressable>
              );
            })}
        </View>
      </ScrollView>

      {selectedItem !== undefined ? (
        <Fragment>
          <Modal isVisible={showDetail}>
            <ShowDetails setVisible={handleCloseDetails} data={selectedItem} />
          </Modal>
        </Fragment>
      ) : null}
    </Container>
  );
};
