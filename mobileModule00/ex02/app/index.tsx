import { useState } from "react";
import { Button, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const items = [
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
    type: "number",
  },
  {
    label: "=",
    type: "equal",
  },
];

export default function Index() {
  const width = Dimensions.get("window").width;
  const gap = 5;
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#0000000f",
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: "#0000001f",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "semibold",
          }}
        >
          Calculator
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#0000000f",
        }}
      >
        <Text style={{ fontSize: 30, textAlign: "right", padding: 20 }}>
          {expression}
        </Text>
        <Text style={{ fontSize: 40, textAlign: "right", padding: 20 }}>
          {result}
        </Text>
      </View>
      <View
        style={{
          // flex: 1,
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
                padding: 20,
                width: width / 5 - gap * 2,
                backgroundColor: "#0000001f",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={item.label}
              onPress={() => {
                if (item.type === "number") {
                  setExpression((prev) => prev + item.label);
                }
              }}
            >
              <Text
                style={{
                  fontWeight: "semibold",
                  fontSize: 20,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
