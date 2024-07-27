import React from "react";
import { View } from "react-native";
import ThemedText from "../themed-text";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>Loading...</ThemedText>
    </View>
  );
}
