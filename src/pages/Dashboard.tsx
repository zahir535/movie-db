import React, { Fragment, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Entypo";

import { Container } from "../components/container";
import { Search } from "../components/input";
import { ShowDetails } from "../components/modal";
import { ItemView } from "../components/view";
import { DUMMY_DATA } from "../dummyData/dummyData";

export const Dashboard = () => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [showDetail, setShowDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDataItem | undefined>(undefined);

  // console.log("data", {
  //   DUMMY_DATA: DUMMY_DATA,
  //   data: data,
  // });

  const handleFetch = () => {
    setData(DUMMY_DATA.results);
  };

  const handleSearch = () => {
    if (query !== "") {
      setSearchText(query);
    }
  };

  const handleCloseDetails = () => {
    setShowDetail(false);
  };

  const handleNextPage = () => {};
  const handlePrevPage = () => {};

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
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={itemStyles}>
          {data
            .filter((item) => item.title !== undefined && item.title.toLowerCase().includes(query.toLowerCase()))
            .map((item, index) => {
              const { title, popularity } = item;

              const handleOpenItem = () => {
                setShowDetail(true);
                setSelectedItem(item);
                console.log("handleOpenItem run", title);
              };

              const defaultImage = "../../dummyData/movie-cover.jpeg";

              return (
                <Pressable key={index} onPress={handleOpenItem}>
                  <ItemView image={defaultImage} title={title} />
                </Pressable>
              );
            })}
        </View>
      </ScrollView>

      <Modal isVisible={showDetail}>
        <ShowDetails setVisible={handleCloseDetails} data={selectedItem} />
      </Modal>
    </Container>
  );
};
