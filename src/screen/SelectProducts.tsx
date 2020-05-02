import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {proportionalHeight, COLORS} from 'utils';
import {PRODUCTS} from 'utils/Data';
import {Product} from 'components';

interface Props {
  navigation: any;
  route: any;
}

const NUM_COLUMNS = 3;

export const SelectProducts = (props: Props) => {
  const [step, setStep] = React.useState(1); //состоянии шага
  const [loveProducts, setLoveProducts] = React.useState(Array); //массив любимых продуктов
  const [unloveProducts, setUnloveProducts] = React.useState(Array); //массив не любимых продуктов
  const flatEl = React.useRef(null); //FlatList

  // Обработчик кнопки Далее
  const onNext = React.useCallback(() => {
    if (step === 1) {
      props.navigation.setParams({headerTitle: 'Выберите не любимые продукты'});
      //@ts-ignore
      flatEl.current.scrollToOffset({animated: false, offset: 0});
    } else if (step === 2) {
      props.navigation.setParams({headerTitle: 'Сканируйте QR код'});
    } else {
      props.navigation.navigate('Home');
    }
    setStep(step + 1);
  }, [step, props.navigation]);

  // Обработчик выбора продукта
  const pressProduct = React.useCallback(
    (item) => {
      let list = [];
      let setList;
      // В зависимости от шага выбираем нужный массив
      if (step === 1) {
        list = loveProducts;
        setList = setLoveProducts;
      } else {
        list = unloveProducts;
        setList = setUnloveProducts;
      }
      // если id продукта есть в мессив, значит его нужно убрать
      if (list.indexOf(item.id) > -1) {
        setList(list.filter((val) => item.id !== val));
      } else {
        setList([...list, item.id]);
      }
    },
    [loveProducts, unloveProducts, step],
  );

  React.useEffect(() => {
    props.navigation.setParams({headerTitle: 'Выберите любимые продукты'});
  }, [props.navigation]);

  return (
    <View style={styles.container}>
      {step !== 3 ? (
        <FlatList
          data={PRODUCTS}
          renderItem={({item}) => (
            <Product
              item={item}
              onPress={pressProduct}
              active={
                (step === 1 ? loveProducts : unloveProducts).indexOf(item.id) >
                -1
              }
            />
          )}
          numColumns={NUM_COLUMNS}
          contentContainerStyle={styles.products}
          ref={flatEl}
        />
      ) : (
        <Image
          source={require('assets/iphone-qr.png')}
          style={styles.qrImage}
        />
      )}
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF8D', '#FFFFFF', '#ffffff']}
        style={styles.footer}>
        <>
          <TouchableOpacity
            style={styles.button}
            disabled={
              (step === 1 && loveProducts.length === 0) ||
              (step === 2 && unloveProducts.length === 0)
            }
            activeOpacity={0.8}
            onPress={onNext}>
            <Text
              style={[
                styles.buttonText,
                step === 3 ||
                (step === 1 && loveProducts.length) ||
                (step === 2 && unloveProducts.length)
                  ? styles.buttonTextActive
                  : null,
              ]}>
              Далее
            </Text>
          </TouchableOpacity>
          <View style={styles.paging}>
            <View style={[styles.page, styles.pageActive]} />
            <View style={[styles.page, step > 1 && styles.pageActive]} />
            <View style={[styles.page, step > 2 && styles.pageActive]} />
          </View>
        </>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  products: {
    marginHorizontal: 16,
    paddingTop: 23,
    paddingBottom: 210,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    height: 210,
    left: 0,
    right: 0,
    paddingTop: 70,
    alignItems: 'center',
  },

  button: {
    width: 214,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 40,
    height: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paging: {
    paddingTop: 30,
    flexDirection: 'row',
  },
  page: {
    height: 12,
    width: 12,
    backgroundColor: '#B4B4B4',
    marginHorizontal: 8,
    borderRadius: 12,
  },
  pageActive: {
    backgroundColor: '#B2DE2D',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.DISABLE_BUTTON_TEXT,
  },
  buttonTextActive: {
    color: COLORS.BUTTON_TEXT,
  },

  qrImage: {
    position: 'absolute',
    height: proportionalHeight(0.8),
    resizeMode: 'contain',
    bottom: 110,
    width: '100%',
  },
});
