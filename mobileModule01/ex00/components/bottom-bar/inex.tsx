import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/app/style";
import { useStore } from "@/app/store";
import { links } from "@/app/links";

export default function BottomBar() {
  const { time, setTime } = useStore();
  return (
    <View
      style={{
        backgroundColor: "#18181b",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {links.map((link) => (
        <TouchableOpacity
          style={[
            styles.footerItem,
            {
              opacity: time === link.title ? 1 : 0.5,
            },
          ]}
          onPress={() => setTime(link.title)}
          key={link.path}
        >
          <link.icon style={[styles.icon]} />
          <Text style={[styles.darkModeText, styles.capitalize]}>
            {link.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
