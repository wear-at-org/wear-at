import * as React from 'react';
import {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

interface proptypes {
  children: ReactNode;
  noScroll?: boolean;
  hasScrollEvent?: boolean;
}

const Layout: FC<proptypes> = (props) => {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
