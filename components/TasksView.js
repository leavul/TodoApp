import { useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  View as AnimatableView,
  Text as AnimatableText,
} from "react-native-animatable";
import Task from "./Task";

const TasksView = (props) => {
  // Animation duration
  const deleteAnimationDuration = 300;

  // Store the section title ref
  const sectionTitleRef = useRef(null);

  // Create a ref map for all task refs
  const taskRefs = useRef({});

  // Handle delete task
  const onDeleteTask = (id) => {
    // Get the task ref
    const taskRef = taskRefs.current[id];
    // Check if it's the last task
    const isLastTask = props.taskItems.length === 1;

    // Create array of animations to run
    const animations = [];

    if (taskRef)
      animations.push(taskRef.animate("fadeOutRight", deleteAnimationDuration));
    if (isLastTask && sectionTitleRef.current)
      animations.push(
        sectionTitleRef.current.animate("fadeOutLeft", deleteAnimationDuration)
      );

    // Run all animations in parallel, then delete task
    Promise.all(animations).then(() => {
      props.handleDeleteTask(id);
    });
  };

  return (
    <View style={styles.container}>
      <AnimatableText
        ref={sectionTitleRef}
        animation="fadeInDown"
        duration={props.initialAnimationDuration}
        easing="ease-out"
        style={styles.sectionTitle}
      >
        📋 Today's tasks
      </AnimatableText>
      <ScrollView>
        <View style={styles.itemWrapper}>
          {props.taskItems.map((item) => {
            const id = item.id;
            return (
              <AnimatableView
                key={id}
                ref={(ref) => (taskRefs.current[item.id] = ref)} // Store the ref in the map
                animation="fadeInUp"
                easing="ease-out"
                duration={props.initialAnimationDuration}
              >
                <Task
                  handleToggleCompletion={() =>
                    props.handleToggleCompletion(id)
                  }
                  handleDeletion={() => onDeleteTask(id)}
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
    fontFamily: "Ubuntu Bold",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  itemWrapper: {
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default TasksView;
