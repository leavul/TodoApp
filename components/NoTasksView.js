import { View, StyleSheet } from "react-native";
import { Text as AnimatableText } from "react-native-animatable";

const NoTasksView = (props) => {
  return (
    <View style={styles.container}>
      <AnimatableText
        animation="fadeIn"
        duration={props.initialAnimationDuration}
        easing="ease-out"
        style={styles.noTasksText}
      >
        🎉 All caught up! No tasks left.
      </AnimatableText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTasksText: {
    fontFamily: "Ubuntu Medium",
    fontSize: 16,
    color: "#6C6C6CFF",
    textAlign: "center",
  },
});

export default NoTasksView;
