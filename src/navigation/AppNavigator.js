import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../styles/colors';

// Screens
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator para telas com navegação
const HomeStack = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ title: 'McDonald\'s' }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={{ title: 'Detalhes do Produto' }}
    />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Menu" 
      component={MenuScreen}
      options={{ title: 'Cardápio' }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={{ title: 'Detalhes do Produto' }}
    />
  </Stack.Navigator>
);

const CartStack = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Cart" 
      component={CartScreen}
      options={{ title: 'Carrinho' }}
    />
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen}
      options={{ title: 'Finalizar Pedido' }}
    />
  </Stack.Navigator>
);

const OrdersStack = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Orders" 
      component={OrdersScreen}
      options={{ title: 'Pedidos' }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator 
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ title: 'Perfil' }}
    />
  </Stack.Navigator>
);

// Tab Navigator principal
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'HomeTab') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'MenuTab') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'CartTab') {
          iconName = focused ? 'bag' : 'bag-outline';
        } else if (route.name === 'OrdersTab') {
          iconName = focused ? 'receipt' : 'receipt-outline';
        } else if (route.name === 'ProfileTab') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textSecondary,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopColor: colors.border,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeStack}
      options={{ tabBarLabel: 'Início' }}
    />
    <Tab.Screen 
      name="MenuTab" 
      component={MenuStack}
      options={{ tabBarLabel: 'Cardápio' }}
    />
    <Tab.Screen 
      name="CartTab" 
      component={CartStack}
      options={{ 
        tabBarLabel: 'Carrinho',
        tabBarBadge: '2', // Este será dinâmico baseado no contexto
      }}
    />
    <Tab.Screen 
      name="OrdersTab" 
      component={OrdersStack}
      options={{ tabBarLabel: 'Pedidos' }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileStack}
      options={{ tabBarLabel: 'Perfil' }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
