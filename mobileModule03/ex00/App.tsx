import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
  View,
  useWindowDimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchList } from "./components/search-list";
import { Header } from "./components/header";
import { Tabs } from "./components/tabs";
import { useStore } from "./utils/store";
import { colors } from "./constants";

const Stack = createStackNavigator();

export default function App() {
  const { height } = useWindowDimensions();
  const { isSearching } = useStore();
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
        source={require("./assets/bg.webp")}
        style={{
          flex: 1,
          width: "100%",
          // height:
          minHeight: height,
        }}
        resizeMethod="scale"
      >
        <View
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "rgba(0, 0, 0, 0.925)",
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{
                header: Header,
              }}
              component={Tabs}
            />
          </Stack.Navigator>
          {isSearching && <SearchList />}
        </View>
      </ImageBackground>
    </NavigationContainer>
  );
}
