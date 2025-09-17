import { useFonts } from "expo-font";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import TasksView from "./components/TasksView";
import NoTasksView from "./components/NoTasksView";
import AddTaskInput from "./components/AddTaskInput";

export default function App() {
  useFonts({
    "Ubuntu Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });
  // Store the task items
  const [taskItems, setTaskItems] = useState([]);

  // Animation durations
  const initialAnimationDuration = 500;

  // Handle add task
  const handleAddTask = (task) => {
    // Create a new task object
    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };
    // Add the new task to the task items
    setTaskItems([...taskItems, newTask]);
  };

  // Handle toggle completion
  const handleToggleCompletion = (id) => {
    // Update the task completion status
    setTaskItems((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle delete task
  const handleDeleteTask = (id) => {
    // If it's the last task, clear the task items
    if (taskItems.length === 1) {
      setTaskItems([]);
    } else {
      // Remove the task
      setTaskItems((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {taskItems.length > 0 ? (
          <TasksView
            taskItems={taskItems}
            initialAnimationDuration={initialAnimationDuration}
            handleToggleCompletion={handleToggleCompletion}
            handleDeleteTask={handleDeleteTask}
          />
        ) : (
          <NoTasksView />
        )}

        <AddTaskInput
          handleAddTask={handleAddTask}
          initialAnimationDuration={initialAnimationDuration}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingVertical: 16,
  },
});
