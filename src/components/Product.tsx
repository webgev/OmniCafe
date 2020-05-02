import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {COLORS} from 'utils';
import {ProductProps} from 'utils/Data';

const NUM_COLUMNS = 3;

export const Product = ({
  item,
  active,
  onPress,
}: {
  item: ProductProps;
  active: boolean;
  onPress: Function;
}) => (
  <TouchableOpacity
    style={styles.productContent}
    activeOpacity={0.9}
    onPress={() => {
      onPress(item);
    }}>
    {active && (
      <Svg
        width={15}
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        style={styles.indicator}>
        <Path
          d="M5 7.09L6.944 9 10 6M10.212 1.59a6.5 6.5 0 103.08 2.955"
          stroke={COLORS.PRIMARY}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </Svg>
    )}
    <Image source={item.photo} style={styles.productImage} />
    <View style={styles.overlay} />
    <Text style={styles.productName}>{item.name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  productContent: {
    flex: 1,
    marginBottom: 8,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  overlay: {
    backgroundColor: 'black',
    opacity: 0.3,
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  indicator: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 13,
    height: 13,
    zIndex: 1,
  },
  productImage: {
    height: Dimensions.get('window').width / NUM_COLUMNS - 22,
    width: '100%',
  },
  productName: {
    color: 'white',
    bottom: 9,
    left: 14,
    fontWeight: 'bold',
    position: 'absolute',
  },
});
