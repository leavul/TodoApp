import { useFonts } from "expo-font";
import { FontFiles, FontFamilies } from "./src/constants/Fonts";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { Colors } from "./src/constants";

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    [FontFamilies.regular]: FontFiles.regular,
    [FontFamilies.medium]: FontFiles.medium,
    [FontFamilies.bold]: FontFiles.bold,
  });

  return (
    <View style={styles.container}>
      {/* Show activity indicator if fonts are not loaded */}
      {!fontsLoaded ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <HomeScreen />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  activityIndicator: {
    flex: 1,
    alignItems: "center",
  },
});
