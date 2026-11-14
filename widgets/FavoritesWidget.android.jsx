import { Column, Text } from "@expo/ui/jetpack-compose";
import { createWidget } from "expo-widgets";

const FavoritesWidget = (props) => {
  "widget";

  return (
    <Column>
      <Text>즐겨찾기</Text>
      <Text>{props.count}개</Text>
    </Column>
  );
};

export default createWidget("FavoritesWidget", FavoritesWidget, { count: 0 });
