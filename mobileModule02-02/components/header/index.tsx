import { BlurView } from "expo-blur";
import { colors, headerHeight } from "../../utils/constants";
import { StatusBar } from "expo-status-bar";
import { Keyboard, TextInput, TouchableOpacity, View } from "react-native";
import { useGlobalStore } from "../../utils/store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Location from "expo-location";

export function Header() {
  const {
    search,
    setSearch,
    setIsSearching,
    setLocation,
    setCoordinates,
    setError,
  } = useGlobalStore();
  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      tint="dark"
      intensity={25}
      style={{
        height: headerHeight,
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          padding: 12,
        }}
      >
        <TextInput
          value={search}
          onChangeText={setSearch}
          onFocus={() => setIsSearching(true)}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: "#ffffff07",
            borderRadius: 9999,
            color: "white",
            flex: 1,
          }}
          placeholder="Search for location..."
          placeholderTextColor={"#7f7f7f"}
        />
        <TouchableOpacity
          style={{
            width: 40,
            aspectRatio: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.5}
          onPress={async () => {
            try {
              let { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status !== "granted") {
                setLocation(null);
                setCoordinates(null);
                setError("Permission to access location was denied");
                return;
              }
              const { coords } = await Location.getCurrentPositionAsync({});
              setCoordinates(coords);
              setLocation(null);
              setSearch("");
              setError("");
              setIsSearching(false);
              Keyboard.dismiss();
            } catch (error) {
              setLocation(null);
              setCoordinates(null);
              setError("An error occurred while accessing location");
            }
          }}
        >
          <FontAwesome5
            name="search-location"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}
