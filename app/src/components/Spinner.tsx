import React, {FC} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {spinnerName} from 'store';
import {RootState} from 'store';

const {width, height} = Dimensions.get('window');
const Spinner: FC = () => {
  const {count} = useSelector((state: RootState) => state[spinnerName]);
  if (count > 0) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#ff9800" />
      </View>
    );
  }
  return <></>;
};

export default Spinner;

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
