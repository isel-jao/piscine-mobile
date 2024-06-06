import { View, TextInput, Touchable, TouchableOpacity } from "react-native";
import { useStore } from "../../app/store";
import { useState } from "react";
import { SendIcon } from "lucide-react-native";
import { styles } from "@/app/style";

export const TopBar = () => {
  const { search, setSearch } = useStore();
  const [value, setValue] = useState("" as string);
  return (
    <View
      style={{
        backgroundColor: "#27272a",
        paddingTop: 44,
        paddingHorizontal: 24,
        paddingBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TextInput
        value={value}
        onChange={(e) => setValue(e.nativeEvent.text)}
        placeholder="Search location..."
        placeholderTextColor={"#999"}
        style={[styles.darkModeText]}
      />
      <TouchableOpacity
        onPress={() => {
          setSearch(value);
          setValue("");
        }}
        style={[
          {
            padding: 8,
            borderRadius: 8,
          },
        ]}
      >
        <SendIcon width={16} strokeWidth={2.5} height={16} stroke={"white"} />
      </TouchableOpacity>
    </View>
  );
};
