import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const OrderCard = ({ order, onPress }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing': return colors.warning;
      case 'ready': return colors.secondary;
      case 'delivered': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'preparing': return 'Preparando';
      case 'ready': return 'Pronto';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return 'Pendente';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'preparing': return 'restaurant-outline';
      case 'ready': return 'checkmark-circle-outline';
      case 'delivered': return 'checkmark-done-circle';
      case 'cancelled': return 'close-circle-outline';
      default: return 'time-outline';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getItemsText = () => {
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    return `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>#{order.orderNumber}</Text>
          <Text style={styles.date}>{formatDate(order.date)}</Text>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Ionicons 
            name={getStatusIcon(order.status)} 
            size={14} 
            color={colors.background} 
          />
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.itemsText}>{getItemsText()}</Text>
        <Text style={styles.address} numberOfLines={1}>
          {order.address.street}, {order.address.neighborhood}
        </Text>
        
        {order.estimatedDelivery && order.status === 'preparing' && (
          <View style={styles.deliveryInfo}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.deliveryTime}>{order.estimatedDelivery}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.paymentInfo}>
          <Ionicons name="card-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.paymentMethod}>{order.paymentMethod}</Text>
        </View>
        
        <Text style={styles.total}>R$ {order.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    marginBottom: 12,
  },
  itemsText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  deliveryTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethod: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default OrderCard;
