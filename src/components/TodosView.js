import { useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  View as AnimatableView,
  Text as AnimatableText,
} from "react-native-animatable";
import Todo from "./Todo";
import { Durations, Colors, FontFamilies, FontSizes } from "../constants";

const TodosView = (props) => {
  // Store the section title ref
  const sectionTitleRef = useRef(null);

  // Create a ref map for all todo refs
  const todoRefs = useRef({});

  // Handle delete todo
  const onDeleteTodo = (id) => {
    // Get the todo ref
    const todoRef = todoRefs.current[id];
    // Check if it's the last todo
    const isLastTodo = props.todos.length === 1;

    // Create array of animations to run
    const animations = [];

    if (todoRef)
      animations.push(todoRef.animate("fadeOutRight", Durations.short));
    if (isLastTodo && sectionTitleRef.current)
      animations.push(
        sectionTitleRef.current.animate("fadeOutLeft", Durations.short)
      );

    // Run all animations in parallel, then delete todo
    Promise.all(animations).then(() => {
      props.handleDeleteTodo(id);
    });
  };

  return (
    <View style={styles.container}>
      <AnimatableText
        ref={sectionTitleRef}
        animation="fadeInDown"
        duration={Durations.long}
        easing="ease-out"
        style={styles.sectionTitle}
      >
        📋 What To Do
      </AnimatableText>
      <ScrollView>
        <View style={styles.itemWrapper}>
          {props.todos.map((item) => {
            const id = item.id;
            return (
              <AnimatableView
                key={id}
                ref={(ref) => (todoRefs.current[item.id] = ref)} // Store the ref in the map
                animation="fadeInUp"
                easing="ease-out"
                duration={Durations.long}
              >
                <Todo
                  handleToggleCompletion={() =>
                    props.handleToggleCompletion(id)
                  }
                  handleDeletion={() => onDeleteTodo(id)}
                  completed={item.completed}
                  text={item.text}
                />
              </AnimatableView>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    color: Colors.primary,
    fontFamily: FontFamilies.bold,
    fontSize: FontSizes.extraLarge,
    paddingHorizontal: 20,
  },
  itemWrapper: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default TodosView;
