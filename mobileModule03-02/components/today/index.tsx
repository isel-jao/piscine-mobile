import { Dimensions, FlatList, View } from "react-native";
import { useOrientation } from "../hooks/use-orientation";
import ThemedText from "../themed-text";
import useSWR from "swr";
import { useGlobalStore } from "../../utils/store";
import { getTodayWeather } from "../../utils/api";
import { useCallback, useMemo } from "react";
import { colors } from "../../utils/constants";
import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import Color from "color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getWitherIconName } from "../../utils/functions";
import { LocationData } from "../location-data";

export function TodayScreen() {
  const orientation = useOrientation();
  const { coordinates } = useGlobalStore();

  const key = `today/${JSON.stringify({ coordinates })}`;
  const { data, isLoading, error } = useSWR(key, async () => {
    if (!coordinates) return null;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await getTodayWeather(
      coordinates?.latitude,
      coordinates?.longitude
    );

    return result as {
      hourly: {
        time: string[];
        temperature_2m: number[];
        weathercode: number[];
        windspeed_10m: number[];
      };
    };
  });

  const temperatureData = useMemo<{
    data: {
      x: Date;
      y: number;
    }[];
  }>(() => {
    return {
      data: Array.from({ length: 24 }, (_, index) => {
        return {
          x: new Date(data?.hourly.time[index] || new Date()),
          y: data?.hourly.temperature_2m[index] || 0,
        };
      }),
    };
  }, [data]);

  const todayData = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => {
      return {
        time: data?.hourly.time[index],
        temperature: data?.hourly.temperature_2m[index],
        weather: data?.hourly.weathercode[index],
        windspeed: data?.hourly.windspeed_10m[index],
      };
    });
  }, [data]);

  const Comp = useCallback(() => {
    if (!coordinates) return null;
    if (error)
      return (
        <ThemedText color="danger">Failed to fetch Weather data</ThemedText>
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
              labels: Array.from({ length: 6 }, (_, index) => {
                return format(new Date(data?.hourly.time[index * 4]), "HH:mm");
              }),
              datasets: [
                {
                  data: temperatureData.data.map((item) => item.y),
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
            data={todayData}
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
                    {item.time && format(new Date(item?.time), "HH:mm")}
                  </ThemedText>
                  <MaterialCommunityIcons
                    name={getWitherIconName(item.weather)}
                    size={44}
                    color={colors.info}
                  />
                  <ThemedText color="primary">{item?.temperature}°C</ThemedText>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"weather-windy"}
                      size={16}
                      color={colors.text}
                    />
                    <ThemedText>{item.windspeed}km/h</ThemedText>
                  </View>
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
        height: "100%",
        width: "100%",
        flexDirection: orientation === "landscape" ? "row" : "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <LocationData />
      <Comp />
    </View>
  );
}
