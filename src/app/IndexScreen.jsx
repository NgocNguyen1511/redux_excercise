import APP_COLORS from "@/src/constants/Colors";
import ListItem from "../components/ListItem";
import { useEffect, useRef } from "react";
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
import {
  clearEdited,
  resetToOriginal,
  confirmChanges,
} from "../redux/dataSlice";

const IndexScreen = () => {
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.data);
  const editedIds = useAppSelector((state) => state.data.editedIds);
  const isDisabled = editedIds.length === 0;

  const ref = useRef(null);

  const moveTo = () => {
    ref?.current.scrollToIndex({index: 20});
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

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
                dispatch(clearEdited());
              }}
            />
            <Button
              title={"Reset"}
              disabled={isDisabled}
              onPress={() => {
                dispatch(resetToOriginal());
                dispatch(clearEdited());
              }}
            />
            <Button title={"Move"} onPress={moveTo} />
          </View>

          <FlatList
            ref={ref}
            contentContainerStyle={{ paddingBottom: 50 }}
            scrollEventThrottle={400}
            ListFooterComponent={renderFooter}
            onEndReached={() => {
              if (!loading) dispatch(fetchData());
            }}
            onEndReachedThreshold={0.2}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <ListItem item={item} {...{ index }} />
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
