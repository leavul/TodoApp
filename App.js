import { useFonts } from "expo-font";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  useFonts({
    "Ubuntu Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
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
      setTaskItems([...taskItems, task]);

      // Close the keyboard
      Keyboard.dismiss();
      // Clear the add task input
      setTask("");
    }
  };

  // Handle delete task
  const handleDeleteTask = (index) => {
    // Create a copy of the task items
    let itemsCopy = [...taskItems];
    // Remove the task at the given index
    itemsCopy.splice(index, 1);
    // Update the task items
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        {/* Today's tasks text */}
        <Text style={styles.sectionTitle}>📋 Today's tasks</Text>
        {/* Here the tasks View */}
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <Task
                key={index}
                handleToggleCompletion={() => {}}
                handleDeletion={() => handleDeleteTask(index)}
                text={item}
              />
            );
          })}
        </View>
      </View>
      {/* Write the task */}
      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
        behavior={Platform.OS ? "padding" : "height"}
        keyboardVerticalOffset={"15"}
      >
        <TextInput
          style={styles.input}
          placeholder="Write a task"
          returnKeyType="done"
          value={task}
          onChangeText={(text) => setTask(text)}
        />

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
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: "Ubuntu Bold",
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    paddingTop: 40,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
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
    color: "#6c6c6cff",
  },
});
