import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text
        style={{
          backgroundColor: "#0000000f",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          fontWeight: "semibold",
        }}
      >
        A simple text
      </Text>
      <Button title="click me" onPress={() => console.log("Button pressed")} />
    </View>
  );
}
