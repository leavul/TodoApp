import { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Platform,
  Keyboard,
  StyleSheet,
} from "react-native";

const AddTaskInput = (props) => {
  // Store the add task input value
  const [task, setTask] = useState("");

  // Handle add task
  const onAddTask = () => {
    // If the task is not empty
    if (task.trim() !== "") {
      // Add the task
      props.handleAddTask(task);
      // Close the keyboard
      Keyboard.dismiss();
      // Clear the add task input
      setTask("");
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS ? "padding" : "height"}
      keyboardVerticalOffset={"15"}
    >
      {/* Task input */}
      <TextInput
        style={styles.input}
        placeholder="Write a task"
        returnKeyType="done"
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      {/* Add task button */}
      <TouchableOpacity onPress={onAddTask} activeOpacity={0.5}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 15,
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

export default AddTaskInput;
