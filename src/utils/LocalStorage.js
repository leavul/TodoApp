import AsyncStorage from "@react-native-async-storage/async-storage";

const todosKey = "todos";

export const loadTodosFromLocalStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(todosKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw e;
  }
};

export const storeTodosInLocalStorage = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(todosKey, jsonValue);
  } catch (e) {
    throw e;
  }
};
