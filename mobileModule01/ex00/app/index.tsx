import { Text, View } from "react-native";
import { useStore } from "./store";
import PagerView from "react-native-pager-view";
import { styles } from "./style";
import { links } from "./links";

export default function Index() {
  const { time, search, setTime } = useStore();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PagerView
        key={time}
        style={styles.container}
        initialPage={links.findIndex((link) => link.title === time) || 0}
        onPageSelected={(e) => {
          console.log(e.nativeEvent.position);
          setTime(links[e.nativeEvent.position].title);
        }}
      >
        {links.map((link, index) => (
          <View style={styles.container} key={`${index} + 1`}>
            <Text style={[styles.darkModeText, styles.capitalize]}>
              {link.title}
            </Text>
            <Text style={[styles.darkModeText, styles.capitalize]}>
              {search}
            </Text>
          </View>
        ))}
      </PagerView>
    </View>
  );
}
