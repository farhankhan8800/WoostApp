import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppNav from './src/navigation/AppNav';
import { Provider } from 'react-redux';
import { store, persistedStore } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
        <AppNav />
        </PersistGate>
    </Provider>
    );
};
export default App;

