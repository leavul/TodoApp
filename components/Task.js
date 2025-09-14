import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Task = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.toggleCompletion}>
      <View style={styles.item}>
        <View style={styles.circular}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 18,
    backgroundColor: "#FEFEFEFF",
    borderRadius: 12,
  },
  circular: {
    height: 12,
    width: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
  itemText: {
    fontFamily: "Ubuntu Regular",
  },
});

export default Task;
