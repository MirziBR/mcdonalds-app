import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useApp } from '../context/AppContext';
import { mockOrders } from '../data/mockData';
import OrderCard from '../components/OrderCard';
import Button from '../components/Button';

const OrdersScreen = ({ navigation }) => {
  const { orders } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // all, preparing, delivered

  // Para demo, vamos usar os dados mockados
  const allOrders = orders.length > 0 ? orders : mockOrders;

  const filteredOrders = allOrders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'preparing') return order.status === 'preparing' || order.status === 'ready';
    if (filter === 'delivered') return order.status === 'delivered';
    return true;
  });

  const onRefresh = () => {
    setRefreshing(true);
    // Simular refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const navigateToMenu = () => {
    navigation.navigate('MenuTab');
  };

  const renderOrder = ({ item }) => (
    <OrderCard
      order={item}
      onPress={() => {
        // Aqui poderia navegar para detalhes do pedido
        console.log('Order pressed:', item.id);
      }}
    />
  );

  const FilterButton = ({ title, value, active }) => (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  if (allOrders.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={80} color={colors.textLight} />
          <Text style={styles.emptyStateTitle}>Nenhum pedido ainda</Text>
          <Text style={styles.emptyStateText}>
            Quando você fizer seu primeiro pedido, ele aparecerá aqui!
          </Text>
          <Button
            title="Ver Cardápio"
            onPress={navigateToMenu}
            style={styles.menuButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <FilterButton 
          title="Todos" 
          value="all" 
          active={filter === 'all'} 
        />
        <FilterButton 
          title="Em Preparo" 
          value="preparing" 
          active={filter === 'preparing'} 
        />
        <FilterButton 
          title="Entregues" 
          value="delivered" 
          active={filter === 'delivered'} 
        />
      </View>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search-outline" size={64} color={colors.textLight} />
          <Text style={styles.noResultsTitle}>Nenhum pedido encontrado</Text>
          <Text style={styles.noResultsText}>
            Não há pedidos para o filtro selecionado
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filteredOrders.length} {filteredOrders.length === 1 ? 'pedido' : 'pedidos'}
            </Text>
          </View>
          
          <FlatList
            data={filteredOrders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.ordersList}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
              />
            }
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.background,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  menuButton: {
    paddingHorizontal: 32,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  ordersList: {
    padding: 16,
    paddingBottom: 100, // Space for tab bar
  },
});

export default OrdersScreen;
