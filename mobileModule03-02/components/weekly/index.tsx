import { View } from "react-native";
import { useOrientation } from "../hooks/use-orientation";
import ThemedText from "../themed-text";

export function WeeklyScreen() {
  const orientation = useOrientation();

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        flexDirection: orientation === "landscape" ? "row" : "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <ThemedText>weekly screen</ThemedText>
    </View>
  );
}
