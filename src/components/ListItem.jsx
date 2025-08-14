import APP_COLORS from "@/src/constants/Colors";
import { useState, memo, useMemo } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { setItemTitle } from "../redux/dataSlice";
import { useAppDispatch } from "../redux/hook";

const ListItem = ({ item, ...props }) => {
  const { index } = props;
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(item.title);

  const backgroundColor =
    item.id % 2 === 0 ? APP_COLORS.GREY : APP_COLORS.WHITE;
  const textColor =
    backgroundColor === APP_COLORS.GREY ? APP_COLORS.WHITE : APP_COLORS.BLACK;

  //handletext
  const handleChangeText = (text) => {
    setInputText(text);
    debouncedSetTitle(text);
  };

  //debouce
  const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const debouncedSetTitle = useMemo(() => {
    return debounce((text) => {
      dispatch(setItemTitle({ id: item.id, title: text }));
    }, 500);
  }, [item.id, dispatch]);

  return (
    <View style={[styles.itemContainer, { backgroundColor }]}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.avatar} />
      <View style={styles.textContainer}>
        {isEditing ? (
          <TextInput
            value={inputText}
            onChangeText={handleChangeText}
            onBlur={() => setIsEditing(false)}
            autoFocus
            style={[styles.input, { color: textColor }]}
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={[styles.title, { color: textColor }]}>
              title: {item.title}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { color: textColor }]}>{item.url}</Text>
        <Text style={[styles.title, { color: textColor }]}>{Date.now()}</Text>
        <Text style={[styles.title, { color: APP_COLORS.ERROR }]}>{index}</Text>
      </View>
    </View>
  );
};

export default memo(ListItem);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: APP_COLORS.LIGHT_GREY,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: APP_COLORS.LIGHT_GREY,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: APP_COLORS.BLACK,
    padding: 8,
    borderRadius: 4,
  },
});
