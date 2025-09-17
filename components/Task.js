import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRef } from "react";
import { View as AnimatableView } from "react-native-animatable";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// TODO: Change the task text
const Task = (props) => {
  // Animation durations
  const completionSymbolAnimationDuration = 1100;
  const completionTextAnimationDuration = 500;
  const subtleWobbleWithFade = {
    0.0: { translateX: 0, opacity: 0.0 },
    0.2: { translateX: 1, opacity: 0.2 },
    0.4: { translateX: -1, opacity: 0.4 },
    0.6: { translateX: 0.5, opacity: 0.6 },
    0.8: { translateX: -0.5, opacity: 0.8 },
    1.0: { translateX: 0, opacity: 1 },
  };

  // Store the completion symbol ref
  const completionSymbolRef = useRef(null);
  // Store the completion text ref
  const completionTextRef = useRef(null);

  // Handle toggle completion
  const onToggleCompletion = () => {
    // Toggle completion
    props.handleToggleCompletion();

    // Animate completion symbol
    if (completionSymbolRef.current) {
      completionSymbolRef.current.animate(
        "bounceIn",
        completionSymbolAnimationDuration
      );
    }

    // Animate completion text
    if (completionTextRef.current) {
      completionTextRef.current.animate(
        subtleWobbleWithFade,
        completionTextAnimationDuration
      );
    }
  };

  return (
    <TouchableOpacity onPress={onToggleCompletion} activeOpacity={0.5}>
      <View style={styles.item}>
        {/* Completion symbol */}
        <AnimatableView ref={completionSymbolRef}>
          {props.completed ? (
            <FontAwesome name="check" size={20} color="#55BCF6" />
          ) : (
            <View style={styles.circular}></View>
          )}
        </AnimatableView>

        {/* Task text */}
        <AnimatableView style={styles.textWrapper} ref={completionTextRef}>
          <Text
            style={[
              styles.text,
              props.completed && {
                textDecorationLine: "line-through",
                color: "#C0C0C0",
              },
            ]}
          >
            {props.text}
          </Text>
        </AnimatableView>

        {/* Delete button */}
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
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: "#FEFEFEFF",
    borderRadius: 12,
  },
  circular: {
    height: 20,
    width: 20,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 7,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "Ubuntu Regular",
  },
  deleteWrapper: {
    padding: 6,
  },
});

export default Task;
