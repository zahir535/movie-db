import React, { Fragment, useEffect, useState } from "react";
import { Pressable, ScrollView, View, ViewStyle } from "react-native";
import Modal from "react-native-modal";

import { Container } from "../components/container";
import { Search } from "../components/input";
import { ShowDetails } from "../components/modal";
import { ItemView } from "../components/view";
import { DUMMY_DATA } from "../dummyData/dummyData";

export const Dashboard = () => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");

  const [showDetail, setShowDetail] = useState(false);

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
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <Container>
      <View>
        <Search onPress={handleSearch} value={query} onChangeText={setQuery} viewStyle={searchStyles} />
      </View>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={itemStyles}>
          {data
            .filter((item) => item.title !== undefined && item.title.toLowerCase().includes(query.toLowerCase()))
            .map((item, index) => {
              const { title, popularity } = item;

              const handleOpenItem = () => {
                setShowDetail(true);
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
        <ShowDetails setVisible={handleCloseDetails} />
      </Modal>
    </Container>
  );
};
