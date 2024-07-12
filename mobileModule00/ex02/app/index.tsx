import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TItem = {
  label: string;
  type: "number" | "operator" | "clear" | "clear-all" | "point" | "equal";
};

const items: TItem[] = [
  {
    label: "7",
    type: "number",
  },
  {
    label: "8",
    type: "number",
  },
  {
    label: "9",
    type: "number",
  },
  {
    label: "C",
    type: "clear",
  },
  {
    label: "AC",
    type: "clear-all",
  },
  {
    label: "4",
    type: "number",
  },
  {
    label: "5",
    type: "number",
  },
  {
    label: "6",
    type: "number",
  },
  {
    label: "+",
    type: "operator",
  },
  {
    label: "-",
    type: "operator",
  },
  {
    label: "1",
    type: "number",
  },
  {
    label: "2",
    type: "number",
  },
  {
    label: "3",
    type: "number",
  },
  {
    label: "*",
    type: "operator",
  },
  {
    label: "/",
    type: "operator",
  },
  {
    label: "0",
    type: "number",
  },
  {
    label: ".",
    type: "point",
  },
  {
    label: "00",
    type: "number",
  },
  {
    label: "=",
    type: "equal",
  },
];

const gap = 5;
export default function Index() {
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    Dimensions.get("window").width > Dimensions.get("window").height
      ? "landscape"
      : "portrait"
  );
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window }) => {
      setWidth(window.width);
      setOrientation(window.width > window.height ? "landscape" : "portrait");
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#020617",
      }}
    >
      <View
        style={{
          padding: orientation === "landscape" ? 10 : 20,
          backgroundColor: "#0f172a",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "semibold",
            color: "#e2e8f0",
          }}
        >
          Calculator {orientation}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#0000000f",
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap,
          padding: gap * 2,
          backgroundColor: "#0000001f",
        }}
      >
        {items.map((item) => {
          return (
            <TouchableOpacity
              style={{
                paddingVertical: orientation === "landscape" ? gap : 18,
                width: width / 5 - gap * 1.6,
                flexGrow: item.label === "=" ? 1 : undefined,
                backgroundColor: "#0f172a",
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={item.label}
              onPress={() => {
                console.log(`button pressed: ${item.label}`);
              }}
            >
              <Text
                style={{
                  fontWeight: "semibold",
                  fontSize: 20,
                  color: "#f1f5f9",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
