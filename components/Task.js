import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRef } from "react";
import { View as AnimatableView } from "react-native-animatable";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Task = (props) => {
  // Animation durations
  const containerAnimationDuration = 400;
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
  const deleteAnimationDuration = 300;

  const taskContainerRef = useRef(null);
  const completionSymbolRef = useRef(null);
  const completionTextRef = useRef(null);

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

  const onDelete = () => {
    // Animate task deletion
    if (taskContainerRef.current) {
      taskContainerRef.current
        .animate("fadeOutRight", deleteAnimationDuration)
        // Handle deletion after animation
        .then(() => props.handleDeletion());
    } else {
      // Handle deletion directly
      props.handleDeletion();
    }
  };

  return (
    <AnimatableView
      ref={taskContainerRef}
      animation="fadeInUp"
      easing="ease-out"
      duration={containerAnimationDuration}
    >
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
          <AnimatableView style={styles.itemText} ref={completionTextRef}>
            <Text
              style={[
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
          <TouchableOpacity style={styles.deleteWrapper} onPress={onDelete}>
            <FontAwesome name="close" size={20} color="#FE7878FF" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </AnimatableView>
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
  itemText: {
    flex: 1,
    fontFamily: "Ubuntu Regular",
    paddingHorizontal: 16,
  },
  deleteWrapper: {
    padding: 6,
  },
});

export default Task;
