import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRef } from "react";
import { View as AnimatableView } from "react-native-animatable";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Durations,
  Colors,
  FontFamilies,
  FontSizes,
  BorderRadius,
} from "../constants";

const SymbolSize = 20;
// TODO: Change the todo text
const Todo = (props) => {
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
      completionSymbolRef.current.animate("bounceIn", Durations.extraLong);
    }

    // Animate completion text
    if (completionTextRef.current) {
      completionTextRef.current.animate(subtleWobbleWithFade, Durations.long);
    }
  };

  return (
    <TouchableOpacity onPress={onToggleCompletion} activeOpacity={0.5}>
      <View style={styles.container}>
        {/* Completion symbol */}
        <AnimatableView ref={completionSymbolRef}>
          {props.completed ? (
            <FontAwesome
              name="check"
              size={SymbolSize}
              color={Colors.completionSymbol}
            />
          ) : (
            <View style={styles.circular}></View>
          )}
        </AnimatableView>

        {/* Todo text */}
        <AnimatableView style={styles.textWrapper} ref={completionTextRef}>
          <Text
            style={[
              styles.text,
              props.completed && {
                textDecorationLine: "line-through",
                color: Colors.completedTodo,
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
          <FontAwesome name="close" size={SymbolSize} color={Colors.delete} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.large,
  },
  circular: {
    height: SymbolSize,
    width: SymbolSize,
    borderColor: Colors.completionSymbol,
    borderWidth: 2,
    borderRadius: BorderRadius.medium,
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: FontFamilies.regular,
    fontSize: FontSizes.medium,
    color: Colors.primary,
  },
  deleteWrapper: {
    padding: 6,
  },
});

export default Todo;
