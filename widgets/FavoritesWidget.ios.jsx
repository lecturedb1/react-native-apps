import { Text, VStack } from "@expo/ui/swift-ui";
import { containerBackground } from "@expo/ui/swift-ui/modifiers";
import { createWidget } from "expo-widgets";
import { PlatformColor } from "react-native";

const FavoritesWidget = (props) => {
  "widget";

  return (
    <VStack
      modifiers={[
        containerBackground(PlatformColor("systemBackground"), "widget"),
      ]}
    >
      <Text>즐겨찾기</Text>
      <Text>{props.count}개</Text>
    </VStack>
  );
};

export default createWidget("FavoritesWidget", FavoritesWidget, { count: 0 });
