// TabItem.js
import React, { useEffect, useState } from "react";
import { Text, Pressable } from "@gluestack-ui/themed";
import {
  IconHome,
  IconHomeActive,
  IconProfile,
  IconProfileActive,
  IconAdd,
  IconAddActive,
  IconMyResep,
} from "../../../assets";

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(isFocused);
  }, [isFocused]);

  const Icon = () => {
    const icons = {
      Home: selected ? <IconHomeActive /> : <IconHome />,
      MyRecipes: selected ? <IconMyResep /> : <IconMyResep />,
      Profile: selected ? <IconProfileActive /> : <IconProfile />,
    };

    return icons[label] || <IconHome />;
  };

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      alignItems="center"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Icon />
      <Text
        color={selected ? "$black" : "#038861"}
        fontSize={"$md"}
        marginTop={"$0"}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default TabItem;
