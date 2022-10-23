import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

export default function CalenderCard({
  month,
  day,
  selected = false,
  setCardPosX,
  handlePress,
}) {
  const [pos, setPos] = useState(0);
  return (
    <View
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        setPos(layout.x);
        if (selected) setCardPosX(layout.x - 144);
      }}
    >
      <TouchableRipple
        onPress={() => {
          handlePress();
          setCardPosX(pos - 144);
        }}
        className="rounded-lg mx-1"
        rippleColor="rgba(0, 0, 0, 0.2)"
        borderless
      >
        <View
          className={`flex-1 items-center overflow-x-scroll px-2.5 py-1.5 rounded-lg ${
            !selected ? 'bg-slate-400' : 'bg-slate-600'
          }`}
        >
          <Text
            className={`text-lg -my-0.5 ${!selected ? '' : 'text-slate-100'}`}
          >
            {month}
          </Text>
          <Text
            className={`text-lg -my-0.5 ${!selected ? '' : 'text-slate-100'}`}
          >
            {day}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
}
