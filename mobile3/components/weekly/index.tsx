import { Dimensions, FlatList, View } from "react-native";
import { useOrientation } from "../hooks/use-orientation";
import ThemedText from "../themed-text";
import useSWR from "swr";
import { useGlobalStore } from "../../utils/store";
import { getLocations, getWeeklyWeather } from "../../utils/api";
import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import { useMemo } from "react";
import { colors } from "../../utils/constants";
import Color from "color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getWitherIconName } from "../../utils/functions";
import { LocationData } from "../location-data";
import Loading from "../loading";

export function WeeklyScreen() {
  const orientation = useOrientation();
  const { coordinates, globalError } = useGlobalStore();

  const key = `weekly/${JSON.stringify({ coordinates, globalError })}`;

  const { data, isLoading, error } = useSWR(key, async () => {
    if (!coordinates || globalError) return null;
    const weeklyData = await getWeeklyWeather(
      coordinates?.latitude,
      coordinates?.longitude
    );
    const locationData = await getLocations(
      coordinates.latitude,
      coordinates.longitude
    );

    return { weeklyData, locationData };
  });

  const weeklyData = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      return {
        time: data?.weeklyData?.daily.time[index],
        maxTemperature: data?.weeklyData?.daily.temperature_2m_max[index],
        minTemperature: data?.weeklyData?.daily.temperature_2m_min[index],
        weather: data?.weeklyData?.daily.weathercode[index],
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
          min: data?.weeklyData?.daily.temperature_2m_min[index] || 0,
          max: data?.weeklyData?.daily.temperature_2m_max[index] || 0,
        };
      }),
    };
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
          Failed to fetch Weekly Weather data
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
        <ThemedText style={{}}>
          Search for a location to get the weather data
        </ThemedText>
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
              labels: weeklyData.map((item) =>
                format(new Date(item.time), "d/M ")
              ),
              datasets: [
                {
                  data: temperatureData.data.map((item) => item.min),
                  color: () => colors.info
                },
                {
                  data: temperatureData.data.map((item) => item.max),
                  color: () => colors.danger
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
                  <ThemedText color="info">
                    {item?.minTemperature}°C
                  </ThemedText>
                  <ThemedText color="danger">
                    {item?.maxTemperature}°C
                  </ThemedText>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}
