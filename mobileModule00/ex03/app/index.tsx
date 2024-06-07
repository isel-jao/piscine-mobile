import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { evaluate } from "mathjs";

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

  useEffect(() => {
    try {
      const newExpression = expression.replace(/[-+*\/.]$/g, "");
      if (newExpression.length === 0) {
        setResult("");
        return;
      }
      const result = evaluate(newExpression);
      if (result === Infinity || result === -Infinity) {
        setResult("Error");
      } else {
        setResult(result + "");
      }
    } catch (error) {
      setResult("Error");
    }
  }, [expression]);

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
      >
        <Text
          style={{
            fontSize: 32,
            textAlign: "right",
            padding: 8,
            color: "#e2e8f0",
          }}
        >
          {expression}
        </Text>
        <Text
          style={{
            fontSize: 32,
            textAlign: "right",
            color: "#e5e7eb",
            opacity: 0.5,
          }}
        >
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
                paddingVertical: orientation === "landscape" ? gap : 18,
                width: width / 5 - gap * 1.6,
                backgroundColor: "#0f172a",
                borderRadius: 999,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={item.label}
              onPress={() => {
                if (expression.length > 25) return;
                if (item.type === "number") {
                  setExpression((prev) => prev + item.label);
                } else if (item.type === "operator") {
                  const lastChar = expression.slice(-1);
                  if ("+-*/.".includes(lastChar)) {
                    setExpression((prev) => prev.slice(0, -1) + item.label);
                  } else {
                    setExpression((prev) => prev + item.label);
                  }
                } else if (item.type === "clear") {
                  setExpression((prev) => prev.slice(0, -1));
                } else if (item.type === "clear-all") {
                  setExpression("");
                  setResult("");
                } else if (item.type === "equal" && result !== "Error") {
                  setExpression(result);
                } else if (item.type === "point") {
                  if (
                    expression.length === 0 ||
                    "+-*/".includes(expression.slice(-1))
                  ) {
                    setExpression((prev) => prev + "0" + item.label);
                  } else if (new RegExp(/^.*[-+/*]\d+$/g).test(expression)) {
                    setExpression((prev) => prev + item.label);
                  }
                }
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
