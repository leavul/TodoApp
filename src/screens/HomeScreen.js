import { useState, useEffect, useRef } from "react";
import {
  loadTodosFromLocalStorage,
  storeTodosInLocalStorage,
} from "../utils/LocalStorage.js";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import TodosView from "../components/TodosView.js";
import { Durations } from "../constants/Metrics.js";
import { View as AnimatableView } from "react-native-animatable";
import NoTodosView from "../components/NoTodosView.js";
import AddTodoInput from "../components/AddTodoInput.js";

const HomeScreen = () => {
  //  State variable hold the todos
  const [todos, setTodos] = useState([]);

  // Ref for no todos view
  const noTodosViewRef = useRef(null);

  // Load todos once once app starts
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const retrievedTodos = await loadTodosFromLocalStorage();
        setTodos(retrievedTodos || []);
      } catch (e) {
        console.error("Error loading todos:", e);
        setTodos([]);
      }
    };
    loadTodos();
  }, []);

  // Update todos in local storage whenever change todos change
  useEffect(() => {
    try {
      storeTodosInLocalStorage(todos);
    } catch (e) {
      console.error("Error update todos:", e);
    }
  }, [todos]);

  // Handle add todo
  const handleAddTodo = (todo) => {
    if (todos.length === 0 && noTodosViewRef.current) {
      // Fade out NoTodosView first
      noTodosViewRef.current.fadeOut(Durations.short).then(() => {
        // After fade out, add the todo
        setTodos([
          {
            id: Date.now().toString(),
            text: todo,
            completed: false,
          },
        ]);
      });
    } else {
      // Add the todo
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: todo,
          completed: false,
        },
      ]);
    }
  };

  // Handle toggle completion
  const handleToggleCompletion = (id) => {
    // Update the todo completion status
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Handle delete todo
  const handleDeleteTodo = (id) => {
    // If it's the last todo, clear the todo list
    if (todos.length === 1) {
      setTodos([]);
    } else {
      // Remove the todo
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Render todos if there are any otherwise render NoTodosView */}
        {todos.length > 0 ? (
          <TodosView
            todos={todos}
            handleToggleCompletion={handleToggleCompletion}
            handleDeleteTodo={handleDeleteTodo}
          />
        ) : (
          <AnimatableView
            style={{ flex: 1 }}
            ref={noTodosViewRef}
            animation="fadeIn"
            duration={Durations.long}
            easing="ease-out"
          >
            <NoTodosView />
          </AnimatableView>
        )}

        {/* Add todo input */}
        <AddTodoInput handleAddTodo={handleAddTodo} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
});

export default HomeScreen;
