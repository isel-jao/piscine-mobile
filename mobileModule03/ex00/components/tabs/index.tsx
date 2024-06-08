import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "../../constants";
import { CurrentlyScreen } from "../screens/currently";
import { TodayScreen } from "../screens/today";
import { WeeklyScreen } from "../screens/weekly";
import { useOrientation } from "../../hooks/use-orientation";

const Tab = createMaterialTopTabNavigator();

export function Tabs() {
  const orientation = useOrientation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarIndicatorStyle: { display: "none" },
        tabBarInactiveTintColor: "gray",
        tabBarItemStyle: {
          flexDirection: orientation === "landscape" ? "row" : "column",
        },
        tabBarContentContainerStyle: {
          backgroundColor: "black",
        },
      }}
      tabBarPosition="bottom"
    >
      <Tab.Screen
        name="Currently"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={24} color={color} />
          ),
        }}
        component={CurrentlyScreen}
      />
      <Tab.Screen
        name="Today"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-day" size={24} color={color} />
          ),
        }}
        component={TodayScreen}
      />
      <Tab.Screen
        name="Weekly"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-week" size={24} color={color} />
          ),
        }}
        component={WeeklyScreen}
      />
    </Tab.Navigator>
  );
}
