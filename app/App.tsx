import {FC} from 'react';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Root from 'navigation';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from 'store';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Spinner from 'components/Spinner';

const persistor = persistStore(store);
enableScreens();
const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Root />
            <Spinner />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
