import { Dimensions, FlatList, View } from "react-native";
import { useOrientation } from "../hooks/use-orientation";
import ThemedText from "../themed-text";
import useSWR from "swr";
import { useGlobalStore } from "../../utils/store";
import { getLocations, getTodayWeather } from "../../utils/api";
import { useMemo } from "react";
import { colors } from "../../utils/constants";
import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import Color from "color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getWitherIconName } from "../../utils/functions";
import { LocationData } from "../location-data";
import Loading from "../loading";

export function TodayScreen() {
  const orientation = useOrientation();
  const { coordinates, globalError } = useGlobalStore();

  const key = `today/${JSON.stringify({ coordinates, globalError })}`;
  const { data, isLoading, error } = useSWR(
    key,
    async () => {
      if (!coordinates || globalError) return null;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await getTodayWeather(
        coordinates?.latitude,
        coordinates?.longitude
      );
      const locationData = await getLocations(
        coordinates.latitude,
        coordinates.longitude
      );

      const todayData = result as {
        hourly: {
          time: string[];
          temperature_2m: number[];
          weathercode: number[];
          windspeed_10m: number[];
        };
      };
      return { todayData, locationData };
    },

  );

  const temperatureData = useMemo<{
    data: {
      x: Date;
      y: number;
    }[];
  }>(() => {
    return {
      data: Array.from({ length: 24 }, (_, index) => {
        return {
          x: new Date(data?.todayData?.hourly.time[index] || new Date()),
          y: data?.todayData?.hourly.temperature_2m[index] || 0,
        };
      }),
    };
  }, [data]);

  const todayData = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => {
      return {
        time: data?.todayData?.hourly.time[index],
        temperature: data?.todayData?.hourly.temperature_2m[index],
        weather: data?.todayData?.hourly.weathercode[index],
        windspeed: data?.todayData?.hourly.windspeed_10m[index],
      };
    });
  }, [data]);

  if (globalError)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{
            color: colors.danger,
          }}
        >
          {globalError}
        </ThemedText>
      </View>
    );
  if (error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText
          style={{
            color: colors.danger,
          }}
        >
          Failed to fetch Today Weather data
        </ThemedText>
      </View>
    );
  if (isLoading) return <Loading />;
  if (!data)
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
        <ThemedText>Search for a location to get the weather data</ThemedText>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        gap: 16,
        flexDirection: orientation === "landscape" ? "row" : "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <LocationData data={data.locationData} />
      <View
        style={{
          flex: 1,
          display: "flex",
          gap: 8,
          flexDirection: orientation === "landscape" ? "row" : "column",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <LineChart
            data={{
              labels: Array.from({ length: 6 }, (_, index) => {
                return format(
                  new Date(data.todayData?.hourly.time[index * 4]),
                  "HH:mm"
                );
              }),
              datasets: [
                {
                  data: temperatureData.data.map((item) => item.y),
                },
              ],
            }}
            width={
              orientation === "landscape"
                ? 280
                : Dimensions.get("window").width - 20
            }
            height={orientation === "landscape" ? 180 : 260}
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
        <View style={{ flex: 1 }}>
          <FlatList
            // style={{ height: "auto", flex: 1 }}
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
                    paddingHorizontal: orientation === "landscape" ? 8 : 16,
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
    </View>
  );
}
