import {StyleSheet} from 'react-native';

export const Color = {
  mainYellow: '#ff9800',
  textGray: '#8e8e8e',
  grayeee: '#eeeeee',
  grayFAFA: '#fafafa',
  grayD4D4: '#d4d4d4',
  gray7979: '#797979',
  grayCDCD: '#cdcdcd',
  grayAEAE: '#aeaeae',
  grayD9D9: '#d9d9d9',
  grayD8D8: '#d8d8d8',
  gray8282: '#828282',
  grayF8F8: '#f8f8f8',
  grayf2f2: '#f2f2f2',
  graybdbd: '#bdbdbd',
  grayf5f8fa: '#f5f8fa',
  graya6a6a6: '#a6a6a6',
  graya7171: '#717171',
  graye0e0: '#e0e0e0',
  grayeded: '#ededed',
  black333: '#333333',
  black4A4A: '#4a4a4a',
  errorColor: '#ff3131',
  changeColor: '#2f80ed',
  optionBlue: '#3db4da',
};

export const margin = (size: number, position: string) => {
  switch (position) {
    case 'all':
      return {
        margin: size,
      };
    case 'top':
      return {
        marginTop: size,
      };
    case 'bottom':
      return {
        marginBottom: size,
      };
    case 'left':
      return {
        marginLeft: size,
      };
    case 'right':
      return {
        marginRight: size,
      };
  }
};

export const padding = (size: number, position: string) => {
  switch (position) {
    case 'all':
      return {
        padding: size,
      };
    case 'top':
      return {
        paddingTop: size,
      };
    case 'bottom':
      return {
        paddingBottom: size,
      };
    case 'left':
      return {
        paddingLeft: size,
      };
    case 'right':
      return {
        marginRight: size,
      };
  }
};

export const commonStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingLeft: 25,
    paddingRight: 25,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
  },
  h4Big: {
    fontSize: 18,
    lineHeight: 24,
  },
  h4: {
    fontSize: 16,
    lineHeight: 20,
  },
  h5: {
    fontSize: 14,
    lineHeight: 20,
  },
  icon20: {
    width: 20,
    height: 20,
  },
  icon24: {
    width: 24,
    height: 24,
  },
  icon30: {
    width: 30,
    height: 30,
  },
  icon50: {
    width: 50,
    height: 50,
  },
  textCenter: {
    textAlign: 'center',
  },
  row: {flexDirection: 'row'},
});
