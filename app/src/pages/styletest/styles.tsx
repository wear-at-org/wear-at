import {StyleSheet, Dimensions} from 'react-native';
import {Color} from 'utils/commonStyle';

const {width} = Dimensions.get('window');
export default function style() {
  return StyleSheet.create({
    colorBlack: {
      color: 'black',
    },
    colorWhite: {
      color: 'white',
    },
    colorMainYellow: {
      color: Color.mainYellow,
    },
    styleHeader: {
      height: 54,
      backgroundColor: 'white',
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    xbtnContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      height: 48,
      width: 48,
      alignItems: 'center',
    },
    inner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerIcon: {
      width: 18,
      height: 18,
    },
    hederTitle: {
      color: 'black',
      fontSize: 18,
      lineHeight: 24,
    },
    itemTitle: {
      fontSize: 16,
      lineHeight: 24,
    },
    progressContainer: {
      position: 'absolute',
      height: 2,
      backgroundColor: Color.grayeded,
      width,
      bottom: 0,
    },
    stepContainer: {
      paddingTop: 30,
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 50,
      marginBottom: 30,
    },
    styleTitle: {
      fontSize: 18,
      lineHeight: 24,
      textAlign: 'center',
    },
    circle: {
      width: width / 2 - 40,
      height: width / 2 - 40,
      borderRadius: 100,
      borderColor: Color.graye0e0,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      backgroundColor: 'white',
    },
    circleTwoRow: {
      width: width / 2 - 40,
      height: width / 2 - 40,
      borderRadius: 100,
      borderColor: Color.graye0e0,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: 'white',
    },
    circleTwoRowActive: {
      borderColor: Color.mainYellow,
    },
    stepIcon: {
      width: 43,
      height: 43,
    },
    circleActive: {
      backgroundColor: Color.mainYellow,
      borderColor: 'white',
    },
    circeWrap: {
      paddingRight: 10,
      paddingLeft: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    imgStepWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    imgStepImg: {
      width: (width - 80) / 3,
      height: (width - 80) / 3,
      marginRight: 5,
      marginLeft: 5,
      marginBottom: 10,
    },
    imgStepActive: {
      width: (width - 80) / 3,
      height: (width - 80) / 3,
      position: 'absolute',
      top: 0,
      left: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkIcon: {
      width: 48,
      height: 48,
    },
    stepItemBtn: {
      height: 48,
      borderRadius: 5,
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderWidth: 1,
      marginBottom: 10,
    },
    twowRowBtn: {
      width: (width - 60) / 2,
      opacity: 1,
    },
    stepItemBtnActive: {
      backgroundColor: Color.black333,
    },
    bodyItemContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    stepItemBtnFont: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'center',
      color: Color.black333,
    },
    stepItemBtnFontActive: {
      color: 'white',
    },
    btnDisabled: {
      opacity: 0.3,
    },
    circleCheckContainer: {
      position: 'absolute',
      top: 0,
      right: -10,
    },
    styleSubTitle: {
      fontSize: 12,
      lineHeight: 18,
      color: Color.gray8282,
      textAlign: 'center',
    },
  });
}
