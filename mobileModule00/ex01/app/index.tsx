import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [toggled, setToggled] = useState(false);

  const toggle = () => setToggled((prev) => !prev);

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
        {toggled ? "Hello World" : "A simple text"}
      </Text>
      <Button title="click me" onPress={toggle} />
    </View>
  );
}
