import {Dimensions} from 'react-native';
import * as DATA from './Data';
const WIDTH = Dimensions.get('window').width;

export {COLORS} from './Colors';
export {DATA};
export function proportionalHeight(
  coeficent: number,
  widthContainer = WIDTH,
): number {
  return widthContainer / coeficent;
}
