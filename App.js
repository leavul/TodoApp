import { useFonts } from "expo-font";
import { Text, View, StyleSheet } from "react-native";
import Task from "./components/Task";

export default function App() {
  useFonts({
    "Ubuntu Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        {/* Today's tasks */}
        <Text style={styles.sectionTitle}>📋 Today's tasks</Text>
        {/* Here the tasks */}
        <View style={styles.items}>
          <Task
            toggleCompletion={() => {}}
            text="💻 Work on React Native project"
          />
          <Task toggleCompletion={() => {}} text="💪 Upper body workout" />
          <Task toggleCompletion={() => {}} text="😴 Sleep for 8 hours" />
        </View>
      </View>
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
});
