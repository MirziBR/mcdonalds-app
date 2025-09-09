import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';

const CheckoutScreen = ({ navigation }) => {
  const { 
    cart, 
    cartTotal, 
    deliveryFee, 
    finalTotal, 
    selectedAddress,
    addOrder,
    user,
  } = useApp();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      Alert.alert('Erro', 'Selecione um endereço de entrega');
      return;
    }

    setLoading(true);
    
    // Simular processamento do pedido
    setTimeout(() => {
      const newOrder = {
        id: Date.now(),
        orderNumber: `McD${String(Date.now()).slice(-6)}`,
        date: new Date().toISOString(),
        status: 'preparing',
        total: finalTotal,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        address: selectedAddress,
        deliveryFee,
        estimatedDelivery: '25-35 min',
        paymentMethod: getPaymentMethodText(paymentMethod),
      };

      addOrder(newOrder);
      setLoading(false);
      
      Alert.alert(
        'Pedido Realizado!',
        `Seu pedido #${newOrder.orderNumber} foi confirmado e está sendo preparado.`,
        [
          {
            text: 'Ver Pedidos',
            onPress: () => navigation.navigate('OrdersTab'),
          },
        ]
      );
    }, 2000);
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'card': return 'Cartão de Crédito';
      case 'pix': return 'PIX';
      case 'cash': return 'Dinheiro';
      default: return 'Cartão de Crédito';
    }
  };

  const PaymentOption = ({ method, title, icon, selected, onPress }) => (
    <TouchableOpacity 
      style={[styles.paymentOption, selected && styles.paymentOptionSelected]}
      onPress={() => onPress(method)}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={selected ? colors.primary : colors.textSecondary} 
      />
      <Text style={[
        styles.paymentOptionText, 
        selected && styles.paymentOptionTextSelected
      ]}>
        {title}
      </Text>
      <Ionicons 
        name={selected ? "radio-button-on" : "radio-button-off"} 
        size={20} 
        color={selected ? colors.primary : colors.textSecondary} 
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          <View style={styles.orderSummary}>
            {cart.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.orderItemName}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={styles.orderItemPrice}>
                  R$ {(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            
            <View style={styles.orderTotal}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>R$ {cartTotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Taxa de entrega</Text>
                <Text style={styles.totalValue}>
                  {deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2)}`}
                </Text>
              </View>
              <View style={[styles.totalRow, styles.finalTotalRow]}>
                <Text style={styles.finalTotalLabel}>Total</Text>
                <Text style={styles.finalTotalValue}>R$ {finalTotal.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
          <View style={styles.addressCard}>
            <Ionicons name="location" size={24} color={colors.primary} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>{selectedAddress?.name}</Text>
              <Text style={styles.addressText}>
                {selectedAddress?.street}
              </Text>
              <Text style={styles.addressText}>
                {selectedAddress?.neighborhood}, {selectedAddress?.city} - {selectedAddress?.state}
              </Text>
              <Text style={styles.addressText}>
                CEP: {selectedAddress?.zipCode}
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="pencil" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          
          <PaymentOption
            method="card"
            title="Cartão de Crédito"
            icon="card"
            selected={paymentMethod === 'card'}
            onPress={setPaymentMethod}
          />
          
          <PaymentOption
            method="pix"
            title="PIX"
            icon="qr-code"
            selected={paymentMethod === 'pix'}
            onPress={setPaymentMethod}
          />
          
          <PaymentOption
            method="cash"
            title="Dinheiro na Entrega"
            icon="cash"
            selected={paymentMethod === 'cash'}
            onPress={setPaymentMethod}
          />
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações de Entrega</Text>
          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryItem}>
              <Ionicons name="time" size={20} color={colors.textSecondary} />
              <Text style={styles.deliveryText}>Tempo estimado: 25-35 min</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Ionicons name="person" size={20} color={colors.textSecondary} />
              <Text style={styles.deliveryText}>Entrega para: {user?.name}</Text>
            </View>
            <View style={styles.deliveryItem}>
              <Ionicons name="call" size={20} color={colors.textSecondary} />
              <Text style={styles.deliveryText}>Contato: {user?.phone}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.finalTotal}>
          <Text style={styles.finalTotalText}>Total: R$ {finalTotal.toFixed(2)}</Text>
        </View>
        
        <Button
          title="Finalizar Pedido"
          onPress={handlePlaceOrder}
          loading={loading}
          size="large"
          style={styles.placeOrderButton}
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  orderSummary: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderItemName: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  orderItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  orderTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 16,
    paddingTop: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  totalValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  finalTotalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addressCard: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  paymentOption: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  paymentOptionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginLeft: 12,
  },
  paymentOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  deliveryInfo: {
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
  },
  footer: {
    backgroundColor: colors.background,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  finalTotal: {
    alignItems: 'center',
    marginBottom: 12,
  },
  finalTotalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  placeOrderButton: {
    marginBottom: 8,
  },
});

export default CheckoutScreen;
