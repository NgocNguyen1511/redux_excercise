import APP_COLORS from "@/src/constants/Colors";
import ListItem from "../components/ListItem";
// import { useFetchArray } from "@/hooks/fetch_array";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchData } from "../hooks/fetch_array";

import {
  ActivityIndicator,
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearEdited, setOriginalData,resetToOriginal, confirmChanges } from "../redux/dataSlice";

const IndexScreen = () => {
  // const { data, loading, fetchData } = useFetchArray();

  //ALL STATES
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.data);
  // const { data = [], isFetching } = useGetItemsQuery();

  // const [originalData, setOriginalData] = useState([]);
  // const [editedData, setEditedData] = useState([]);
  
  // const [isDisabled, setIsDisabled] = useState(true);
  // const [isEdited, setIsEdited] = useState(null);
  

  const editedIds = useAppSelector((state) => state.data.editedIds);
  const isDisabled = editedIds.length === 0;


  //FIRST RENDER
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setOriginalData(data);
  //     setEditedData((prev) => {
  //       const existId = new Set(prev.map((item) => item.id));
  //       const newItems = data.filter((item) => !existId.has(item.id));
  //       return [...prev, ...newItems];
  //     });
  //   }
  // }, [data]);

  // useEffect(() => {
  //   setIsDisabled(isEdited ? false : true);
  // }, [isEdited]);

  // const handlePressScreen = () => {
  //   Keyboard.dismiss()
  //   // setIsEdited(null);
  // };

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator size="large" color={APP_COLORS.SECONDARY} />
    ) : null;
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.buttonRow}>
            <Button
              title={"Confirm"}
              disabled={isDisabled}
              onPress={() => {
                dispatch(confirmChanges());
                // setOriginalData(editedData);
                dispatch(clearEdited());
                // setIsEdited(null);
              }}
            />
            <Button
              title={"Reset"}
              disabled={isDisabled}
              onPress={() => {
                dispatch(resetToOriginal());
                // setEditedData(originalData);
                dispatch(clearEdited());
                // setIsEdited(null);
              }}
            />
          </View>

          <FlatList
            contentContainerStyle={{ paddingBottom: 50 }}
            scrollEventThrottle={400}
            ListFooterComponent={renderFooter}
            onEndReached={() => {
              if (!loading) dispatch(fetchData());
            }}
            onEndReachedThreshold={0.2}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                item={item}
                // setData={setEditedData}
                // isEdited={isEdited}
                // setIsEdited={setIsEdited}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
});
