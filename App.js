import { useFonts } from "expo-font";
import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import Task from "./components/Task";

// TODO: Add animations to: sectionTitle and noTaskText
export default function App() {
  useFonts({
    "Ubuntu Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });

  // Store the add task input value
  const [task, setTask] = useState("");
  // Store the task items
  const [taskItems, setTaskItems] = useState([]);

  // Handle add task
  const handleAddTask = () => {
    // Add the task if it's not empty
    if (task.trim() !== "") {
      const newTask = {
        id: Date.now().toString(),
        text: task,
        completed: false,
      };
      setTaskItems([...taskItems, newTask]);

      // Close the keyboard
      Keyboard.dismiss();
      // Clear the add task input
      setTask("");
    }
  };

  // Handle toggle completion
  const handleToggleCompletion = (id) => {
    setTaskItems((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle delete task
  const handleDeleteTask = (id) => {
    setTaskItems((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      {taskItems.length > 0 ? (
        // There are tasks section
        <View style={styles.tasksWrapper}>
          {/* Section Title */}
          <Text style={styles.tasksSectionTitle}>📋 Today's tasks</Text>
          {/* Items wrapper - this wrapper is used to add padding to the view without including it in the scroll view */}
          <View style={styles.itemsWrapper}>
            <ScrollView>
              {/* Items - use to add gap between items */}
              <View style={styles.items}>
                {taskItems.map((item) => {
                  const id = item.id;
                  return (
                    <Task
                      key={id}
                      handleToggleCompletion={() => handleToggleCompletion(id)}
                      handleDeletion={() => handleDeleteTask(id)}
                      completed={item.completed}
                      text={item.text}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      ) : (
        // No tasks section
        <View style={styles.noTasksWrapper}>
          <Text style={styles.noTasksText}>
            🎉 All caught up! No tasks left.
          </Text>
        </View>
      )}

      {/* Add task input and button */}
      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
        behavior={Platform.OS ? "padding" : "height"}
        keyboardVerticalOffset={"15"}
      >
        {/* Add task input */}
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          returnKeyType="done"
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        {/* Add task button */}
        <TouchableOpacity onPress={handleAddTask} activeOpacity={0.5}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  tasksSectionTitle: {
    fontFamily: "Ubuntu Bold",
    fontSize: 24,
    fontWeight: "bold",
  },
  itemsWrapper: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 120,
  },
  items: {
    gap: 16,
  },
  noTasksWrapper: {
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
  writeTaskWrapper: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    paddingTop: 10,
    backgroundColor: "#E8EAED",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    width: "70%",
    backgroundColor: "#FEFEFEFF",
    borderRadius: 12,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    height: 50,
    width: 70,
    backgroundColor: "#FEFEFEFF",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 24,
    color: "#6C6C6CFF",
  },
});
