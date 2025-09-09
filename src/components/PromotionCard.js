import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const PromotionCard = ({ promotion, onPress }) => {
  const discountPercentage = promotion.discount;
  const savings = promotion.originalPrice - promotion.discountPrice;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: promotion.image }} style={styles.image} />
      
      <View style={styles.overlay}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{promotion.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {promotion.description}
        </Text>
        
        <View style={styles.priceContainer}>
          <View style={styles.prices}>
            <Text style={styles.originalPrice}>
              De R$ {promotion.originalPrice.toFixed(2)}
            </Text>
            <Text style={styles.discountPrice}>
              Por R$ {promotion.discountPrice.toFixed(2)}
            </Text>
          </View>
          
          <View style={styles.savingsContainer}>
            <Text style={styles.savings}>
              Economize R$ {savings.toFixed(2)}
            </Text>
          </View>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.validUntil}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.validUntilText}>
              Válido até {new Date(promotion.validUntil).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 12,
  },
  discountBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  discountText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  prices: {
    flex: 1,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  savingsContainer: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  savings: {
    fontSize: 12,
    color: colors.background,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  validUntil: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validUntilText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});

export default PromotionCard;
