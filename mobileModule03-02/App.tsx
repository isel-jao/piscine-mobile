import { NavigationContainer } from "@react-navigation/native";
import { ImageBackground, useWindowDimensions, View } from "react-native";
import { colors } from "./utils/constants";
import { createStackNavigator } from "@react-navigation/stack";
import { Tabs } from "./components/tabs";
import { Header } from "./components/header";
import { useGlobalStore } from "./utils/store";
import { SearchList } from "./components/search-list";

const Stack = createStackNavigator();

export default function App() {
  const { height } = useWindowDimensions();
  const { isSearching } = useGlobalStore();
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          background: "transparent",
          border: "transparent",
          card: "transparent",
          primary: colors.primary,
          text: "white",
          notification: "white",
        },
      }}
    >
      <ImageBackground
        source={require("./assets/bg-01.webp")}
        style={{
          flex: 1,
          width: "100%",
          minHeight: height,
        }}
        resizeMethod="scale"
      >
        <View
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          }}
        >
          <Stack.Navigator
            screenOptions={{
              header: Header,
            }}
          >
            <Stack.Screen name="Home" component={Tabs} />
          </Stack.Navigator>
          {isSearching && <SearchList />}
        </View>
      </ImageBackground>
    </NavigationContainer>
  );
}
