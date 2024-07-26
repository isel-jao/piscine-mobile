import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { create } from "zustand";
import { useState } from "react";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const colors = {
  primary: "#4f46e5",
  background: "#f4f4f5",
};

type TState = {
  search: string;
};

type TActions = {
  setSearch: (search: string) => void;
};

export const useStore = create<TState & TActions>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            header: Header,
          }}
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Header() {
  const { search, setSearch } = useStore();

  return (
    <View
      style={{
        paddingTop: 50,
        padding: 12,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={{
          padding: 8,
          backgroundColor: colors.background,
          borderRadius: 8,

          flex: 1,
        }}
        placeholder="Search for location..."
      />
      <TouchableOpacity
        style={{
          borderWidth: 1,
          width: 40,
          aspectRatio: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          borderColor: colors.primary,
        }}
        activeOpacity={0.5}
        onPress={() => {
          setSearch("Geolocation");
        }}
      >
        <FontAwesome5 name="search-location" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarIndicatorStyle: { display: "none" },
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          shadowColor: "transparent",
          borderColor: "transparent",
        },
      }}
      style={{
        flexDirection: "column-reverse",
      }}
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

function CurrentlyScreen() {
  const { search } = useStore();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Currently</Text>
      <Text>{search}</Text>
    </SafeAreaView>
  );
}

function TodayScreen() {
  const { search } = useStore();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Todays</Text>
      <Text>{search}</Text>
    </View>
  );
}

function WeeklyScreen() {
  const { search } = useStore();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Weekly</Text>
      <Text>{search}</Text>
    </View>
  );
}
