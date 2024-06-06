import { Stack } from "expo-router";
import { View } from "react-native";

import { TopBar } from "@/components/top-bar";
import BottomBar from "@/components/bottom-bar/inex";

export default function RootLayout() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Stack
        screenOptions={{
          header: () => <TopBar />,
          statusBarTranslucent: true,
          statusBarStyle: "light",
        }}
      ></Stack>
      <BottomBar />
    </View>
  );
}
