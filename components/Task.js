import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Task = (props) => {
  return (
    <TouchableOpacity
      onPress={props.handleToggleCompletion}
      activeOpacity={0.5}
    >
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.circular}></View>
          <Text style={styles.itemText}>{props.text}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteWrapper}
          onPress={props.handleDeletion}
        >
          <FontAwesome name="close" size={20} color="#FE7878FF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 18,
    backgroundColor: "#FEFEFEFF",
    borderRadius: 12,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
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
  deleteWrapper: {
    padding: 6,
  },
});

export default Task;
