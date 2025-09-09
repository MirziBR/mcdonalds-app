import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/styles/colors';

// Import dos dados mockados para inicializar o contexto
import { user, userAddresses } from './src/data/mockData';

export default function App() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={colors.primary} />
        <AppContent />
      </View>
    </AppProvider>
  );
}

// Componente separado para ter acesso ao contexto
const AppContent = () => {
  return <AppNavigator />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
