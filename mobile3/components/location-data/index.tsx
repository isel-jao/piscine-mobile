import { View } from "react-native";
import ThemedText from "../themed-text";
import { useOrientation } from "../hooks/use-orientation";

export function LocationData({
  data,
}: {
  data: {
    city: string;
    region: string;
    country: string;
  };
}) {
  const orientation = useOrientation();

  return (
    <View
      style={{
        alignItems: "center",
        gap: 4,
      }}
    >
      <ThemedText color="info" fontSize={20}>
        {data?.city}
      </ThemedText>
      <View
        style={{
          alignItems: "center",
          flexDirection: orientation === "portrait" ? "row" : "column",
          gap: 4,
        }}
      >
        <ThemedText fontSize={18}>{data?.region}</ThemedText>
        {orientation === "portrait" && <ThemedText fontSize={18}>,</ThemedText>}
        <ThemedText fontSize={18}>{data?.country}</ThemedText>
      </View>
    </View>
  );
}
