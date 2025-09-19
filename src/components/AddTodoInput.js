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
import { Colors, FontFamilies, FontSizes, BorderRadius } from "../constants";

const AddTodoInput = (props) => {
  // Store the add todo input value
  const [todo, setTodo] = useState("");

  // Handle add todo
  const onAddTodo = () => {
    // If the todo is not empty
    if (todo.trim() !== "") {
      // Add the todo
      props.handleAddTodo(todo);
      // Close the keyboard
      Keyboard.dismiss();
      // Clear the add todo input
      setTodo("");
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS ? "padding" : "height"}
      keyboardVerticalOffset={"15"}
    >
      {/* Todo input */}
      <TextInput
        style={styles.input}
        placeholder="Write a todo"
        returnKeyType="done"
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />

      {/* Add todo button */}
      <TouchableOpacity onPress={onAddTodo} activeOpacity={0.5}>
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
    fontFamily: FontFamilies.regular,
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.large,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  addWrapper: {
    height: 50,
    width: 70,
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.large,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  addText: {
    fontSize: FontSizes.extraLarge,
    color: Colors.tertiary,
  },
});

export default AddTodoInput;
