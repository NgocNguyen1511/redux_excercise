import { Button, StyleSheet, Text, View } from "react-native";
import { decreasement, increasement } from "../redux/counterSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const CounterScreen = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>

      <Text style={styles.count}>{count}</Text>

      <View style={styles.buttonRow}>
        <Button title="-" onPress={() => dispatch(decreasement())} />
        <View style={{ width: 20 }} />
        <Button title="+" onPress={() => dispatch(increasement())} />
      </View>
    </View>
  );
};

export default CounterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
  count: {
    fontSize: 48,
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
