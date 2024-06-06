import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  darkModeText: {
    color: "white",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  icon: {
    width: 24,
    height: 24,
    color: "white",
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    opacity: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: "#18181b",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});
