import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useApp } from '../context/AppContext';
import { promotions, products } from '../data/mockData';
import PromotionCard from '../components/PromotionCard';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
  const { user, selectedAddress } = useApp();

  const featuredProducts = products.slice(0, 4);
  const activePromotions = promotions.filter(p => p.active);

  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const navigateToMenu = () => {
    navigation.navigate('MenuTab');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.greeting}>
            <Text style={styles.welcomeText}>Olá, {user?.name || 'Visitante'}!</Text>
            <Text style={styles.tagline}>O que você gostaria de pedir hoje?</Text>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={32} color={colors.background} />
          </TouchableOpacity>
        </View>
        
        {/* Address */}
        <TouchableOpacity style={styles.addressContainer}>
          <Ionicons name="location" size={16} color={colors.background} />
          <Text style={styles.addressText} numberOfLines={1}>
            {selectedAddress?.street || 'Selecione um endereço'}
          </Text>
          <Ionicons name="chevron-down" size={16} color={colors.background} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={navigateToMenu}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>🍔</Text>
              </View>
              <Text style={styles.quickActionText}>Cardápio</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>🎁</Text>
              </View>
              <Text style={styles.quickActionText}>Promoções</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>⭐</Text>
              </View>
              <Text style={styles.quickActionText}>Favoritos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>📦</Text>
              </View>
              <Text style={styles.quickActionText}>Pedidos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promotions */}
        {activePromotions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Promoções Especiais</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>Ver todas</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.horizontalList}>
                {activePromotions.map((promotion) => (
                  <View key={promotion.id} style={styles.promotionCard}>
                    <PromotionCard
                      promotion={promotion}
                      onPress={() => {}}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mais Pedidos</Text>
            <TouchableOpacity onPress={navigateToMenu}>
              <Text style={styles.sectionLink}>Ver cardápio</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <ProductCard
                  product={product}
                  onPress={() => navigateToProductDetail(product)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Download App Banner */}
        <View style={styles.section}>
          <View style={styles.appBanner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Baixe nosso app!</Text>
              <Text style={styles.bannerText}>
                Peça com mais facilidade e receba ofertas exclusivas
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Download</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: 'https://via.placeholder.com/100x100/E31837/FFFFFF?text=App' }}
              style={styles.bannerImage}
            />
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greeting: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
  },
  tagline: {
    fontSize: 14,
    color: colors.background,
    opacity: 0.9,
    marginTop: 2,
  },
  profileButton: {
    padding: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 14,
    color: colors.background,
    flex: 1,
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.surface,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    backgroundColor: colors.background,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  horizontalList: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  promotionCard: {
    width: 300,
    marginRight: 16,
  },
  productsGrid: {
    paddingHorizontal: 16,
  },
  productCard: {
    marginBottom: 16,
  },
  appBanner: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    margin: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 18,
  },
  bannerButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.background,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 16,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;
