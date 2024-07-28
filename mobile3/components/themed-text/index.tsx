import React from "react";
import { Text, TextProps } from "react-native";
import { colors } from "../../utils/constants";

interface ThemedTextProps extends TextProps {
  color?: "text" | "primary" | "danger" | "info";
  center?: boolean;
  fontSize?: number;
}

export default function ThemedText({
  style,
  center,
  fontSize,
  color = "text",
  ...props
}: ThemedTextProps) {
  return (
    <Text
      style={[
        {
          color: colors[color],
          textAlign: center ? "center" : undefined,
          fontSize,
        },
        style,
      ]}
      {...props}
    />
  );
}
