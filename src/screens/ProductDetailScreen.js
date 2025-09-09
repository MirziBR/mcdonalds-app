import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart, favorites, addToFavorites, removeFromFavorites } = useApp();
  const [quantity, setQuantity] = useState(1);
  
  const isFavorite = favorites.includes(product.id);
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    Alert.alert(
      'Adicionado ao Carrinho!',
      `${quantity} ${product.name} ${quantity > 1 ? 'foram adicionados' : 'foi adicionado'} ao seu carrinho.`,
      [
        { text: 'Continuar Comprando', style: 'cancel' },
        { 
          text: 'Ver Carrinho', 
          onPress: () => navigation.navigate('CartTab')
        },
      ]
    );
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          
          {/* Favorite Button */}
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? colors.error : colors.textLight} 
            />
          </TouchableOpacity>
          
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{product.name}</Text>
              {product.rating && (
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={colors.secondary} />
                  <Text style={styles.rating}>{product.rating}</Text>
                </View>
              )}
            </View>
            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Nutrition Info */}
          {product.calories && (
            <View style={styles.nutritionContainer}>
              <Text style={styles.nutritionTitle}>Informações Nutricionais</Text>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Calorias</Text>
                <Text style={styles.nutritionValue}>{product.calories} kcal</Text>
              </View>
            </View>
          )}

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantidade</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
                onPress={decreaseQuantity}
                disabled={quantity === 1}
              >
                <Ionicons 
                  name="remove" 
                  size={20} 
                  color={quantity === 1 ? colors.textLight : colors.primary} 
                />
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <Ionicons name="add" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Customization Options (Mock) */}
          <View style={styles.customizationContainer}>
            <Text style={styles.customizationTitle}>Personalizações</Text>
            
            <TouchableOpacity style={styles.customizationOption}>
              <View style={styles.customizationInfo}>
                <Text style={styles.customizationName}>Sem cebola</Text>
                <Text style={styles.customizationPrice}>Grátis</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.customizationOption}>
              <View style={styles.customizationInfo}>
                <Text style={styles.customizationName}>Molho extra</Text>
                <Text style={styles.customizationPrice}>+ R$ 2,00</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>R$ {totalPrice.toFixed(2)}</Text>
        </View>
        
        <Button
          title={`Adicionar ao Carrinho (${quantity})`}
          onPress={handleAddToCart}
          size="large"
          style={styles.addToCartButton}
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
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: colors.background,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
    marginLeft: 4,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  nutritionContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  nutritionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  quantityContainer: {
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 25,
    alignSelf: 'flex-start',
    padding: 4,
  },
  quantityButton: {
    backgroundColor: colors.background,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginHorizontal: 20,
  },
  customizationContainer: {
    marginBottom: 24,
  },
  customizationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  customizationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 8,
  },
  customizationInfo: {
    flex: 1,
  },
  customizationName: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  customizationPrice: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  footer: {
    backgroundColor: colors.background,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addToCartButton: {
    marginBottom: 8,
  },
});

export default ProductDetailScreen;
