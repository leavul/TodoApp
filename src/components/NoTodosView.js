import { View, Text, StyleSheet } from "react-native";
import { Colors, FontFamilies, FontSizes } from "../constants";

const NoTodosView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.noTodosText}>Nothing here yet 👀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTodosText: {
    fontFamily: FontFamilies.medium,
    fontSize: FontSizes.medium,
    color: Colors.tertiary,
    textAlign: "center",
  },
});

export default NoTodosView;
