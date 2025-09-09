import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useApp } from '../context/AppContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

const CartScreen = ({ navigation }) => {
  const { 
    cart, 
    cartTotal, 
    deliveryFee, 
    finalTotal, 
    clearCart,
    selectedAddress 
  } = useApp();

  const handleClearCart = () => {
    Alert.alert(
      'Limpar Carrinho',
      'Tem certeza que deseja remover todos os itens do carrinho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      Alert.alert(
        'Endereço Necessário',
        'Por favor, selecione um endereço de entrega para continuar.',
        [{ text: 'OK' }]
      );
      return;
    }
    navigation.navigate('Checkout');
  };

  const navigateToMenu = () => {
    navigation.navigate('MenuTab');
  };

  const renderCartItem = ({ item }) => (
    <CartItem item={item} />
  );

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={80} color={colors.textLight} />
          <Text style={styles.emptyStateTitle}>Seu carrinho está vazio</Text>
          <Text style={styles.emptyStateText}>
            Adicione alguns itens deliciosos do nosso cardápio!
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
      
      {/* Header with Clear Button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearButton}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Address Selection */}
      <View style={styles.addressSection}>
        <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
        <TouchableOpacity style={styles.addressButton}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text style={styles.addressText} numberOfLines={2}>
            {selectedAddress?.street 
              ? `${selectedAddress.street}, ${selectedAddress.neighborhood}`
              : 'Selecione um endereço'
            }
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Order Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>R$ {cartTotal.toFixed(2)}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Taxa de entrega</Text>
          <Text style={styles.summaryValue}>
            {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2)}`}
          </Text>
        </View>
        
        {deliveryFee === 0 && (
          <View style={styles.freeDeliveryNotice}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.freeDeliveryText}>Entrega grátis em pedidos acima de R$ 30!</Text>
          </View>
        )}
        
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {finalTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <View style={styles.footer}>
        <Button
          title={`Finalizar Pedido - R$ ${finalTotal.toFixed(2)}`}
          onPress={handleCheckout}
          size="large"
          style={styles.checkoutButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  clearButton: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
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
  cartList: {
    padding: 16,
    paddingBottom: 0,
  },
  addressSection: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginHorizontal: 12,
  },
  summary: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  freeDeliveryNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '10',
    padding: 8,
    borderRadius: 6,
    marginVertical: 8,
  },
  freeDeliveryText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
    marginLeft: 6,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  footer: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  checkoutButton: {
    marginBottom: 8,
  },
});

export default CartScreen;
