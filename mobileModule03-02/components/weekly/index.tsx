import { Dimensions, FlatList, View } from "react-native";
import { useOrientation } from "../hooks/use-orientation";
import ThemedText from "../themed-text";
import useSWR from "swr";
import { useGlobalStore } from "../../utils/store";
import { getWeeklyWeather } from "../../utils/api";
import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import { colors } from "../../utils/constants";
import Color from "color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getWitherIconName } from "../../utils/functions";
import { LocationData } from "../location-data";

export function WeeklyScreen() {
  const orientation = useOrientation();
  const { coordinates } = useGlobalStore();

  const key = `weekly/${JSON.stringify({ coordinates })}`;

  const { data, isLoading, error } = useSWR(key, async () => {
    if (!coordinates) return null;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await getWeeklyWeather(
      coordinates?.latitude,
      coordinates?.longitude
    );

    return result;
  });

  const weeklyData = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      return {
        time: data?.daily.time[index],
        maxTemperature: data?.daily.temperature_2m_max[index],
        minTemperature: data?.daily.temperature_2m_min[index],
        weather: data?.daily.weathercode[index],
      };
    });
  }, [data]);

  const temperatureData = useMemo<{
    data: {
      min: number;
      max: number;
    }[];
  }>(() => {
    return {
      data: Array.from({ length: 7 }, (_, index) => {
        return {
          min: data?.daily.temperature_2m_min[index] || 0,
          max: data?.daily.temperature_2m_max[index] || 0,
        };
      }),
    };
  }, [data]);

  const Comp = useCallback(() => {
    if (!coordinates) return null;
    if (error)
      return (
        <ThemedText color="danger">
          Failed to load weather weekly data
        </ThemedText>
      );
    if (isLoading) return <ThemedText>Loading...</ThemedText>;
    if (!data)
      return (
        <ThemedText
          style={{
            color: colors.danger,
          }}
        >
          No data found
        </ThemedText>
      );

    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          flexDirection: orientation === "landscape" ? "row" : "column",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            height: "auto",
            display: orientation === "portrait" ? "flex" : "none",
          }}
        >
          <LineChart
            data={{
              labels: weeklyData.map((item) =>
                format(new Date(item.time), "d/M ")
              ),
              datasets: [
                {
                  data: temperatureData.data.map((item) => item.min),
                },
              ],
            }}
            width={Dimensions.get("window").width - 20}
            height={260}
            yAxisSuffix="C"
            yAxisInterval={4}
            chartConfig={{
              color: () => "white",
              backgroundGradientFrom: Color(colors.primary).darken(0.5).hex(),
              backgroundGradientTo: Color(colors.primary).darken(0.9).hex(),

              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 0,
              },
              propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: colors.primary,
              },
            }}
            bezier
            style={{
              borderRadius: 8,
              marginHorizontal: "auto",
              marginVertical: "auto",
            }}
          />
        </View>
        <View>
          <FlatList
            style={{ height: "auto", flex: 0 }}
            data={weeklyData}
            horizontal={true}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    gap: 4,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <ThemedText>
                    {item.time && format(new Date(item?.time), "EEE M/d")}
                  </ThemedText>
                  <MaterialCommunityIcons
                    name={getWitherIconName(item.weather)}
                    size={44}
                    color={colors.info}
                  />
                  <ThemedText color="primary">
                    {item?.minTemperature}°C
                  </ThemedText>
                  <ThemedText color="primary">
                    {item?.maxTemperature}°C
                  </ThemedText>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }, [data, isLoading, error, coordinates, orientation]);

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        gap: 10,
        flexDirection: orientation === "portrait" ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LocationData />
      <Comp />
    </View>
  );
}
