import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { useApp } from '../context/AppContext';
import { userAddresses, user } from '../data/mockData';

const ProfileScreen = ({ navigation }) => {
  const { setUser, clearCart, setSelectedAddress } = useApp();

  const handleLogin = () => {
    // Para demo, vamos "logar" com dados mockados
    setUser(user);
    setSelectedAddress(userAddresses[0]);
    Alert.alert('Login realizado!', 'Bem-vindo ao McDonald\'s!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => {
            setUser(null);
            clearCart();
            Alert.alert('Logout realizado!', 'Até logo!');
          }
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color={colors.primary} />
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          {user ? (
            <View style={styles.profileInfo}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.memberSince}>
                  Membro desde {new Date(user.memberSince).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.loginPrompt}>
              <Ionicons name="person-circle" size={80} color={colors.background} />
              <Text style={styles.loginTitle}>Faça seu login</Text>
              <Text style={styles.loginSubtitle}>
                Entre ou cadastre-se para uma experiência personalizada
              </Text>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar / Cadastrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {/* Account Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Conta</Text>
            
            <MenuItem
              icon="person-outline"
              title="Dados Pessoais"
              subtitle="Altere suas informações"
              onPress={() => console.log('Dados pessoais')}
            />
            
            <MenuItem
              icon="location-outline"
              title="Endereços"
              subtitle={`${userAddresses.length} endereços salvos`}
              onPress={() => console.log('Endereços')}
            />
            
            <MenuItem
              icon="card-outline"
              title="Formas de Pagamento"
              subtitle="Cartões e métodos salvos"
              onPress={() => console.log('Pagamentos')}
            />
          </View>

          {/* Orders Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Pedidos</Text>
            
            <MenuItem
              icon="receipt-outline"
              title="Histórico de Pedidos"
              subtitle="Veja seus pedidos anteriores"
              onPress={() => navigation.navigate('OrdersTab')}
            />
            
            <MenuItem
              icon="heart-outline"
              title="Favoritos"
              subtitle="Seus produtos favoritos"
              onPress={() => console.log('Favoritos')}
            />
          </View>

          {/* App Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Aplicativo</Text>
            
            <MenuItem
              icon="notifications-outline"
              title="Notificações"
              subtitle="Gerencie suas notificações"
              onPress={() => console.log('Notificações')}
            />
            
            <MenuItem
              icon="help-circle-outline"
              title="Ajuda e Suporte"
              subtitle="Central de ajuda"
              onPress={() => console.log('Ajuda')}
            />
            
            <MenuItem
              icon="star-outline"
              title="Avaliar App"
              subtitle="Deixe sua avaliação"
              onPress={() => console.log('Avaliar')}
            />
          </View>

          {/* Legal Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Legal</Text>
            
            <MenuItem
              icon="document-text-outline"
              title="Termos de Uso"
              onPress={() => console.log('Termos')}
            />
            
            <MenuItem
              icon="shield-outline"
              title="Política de Privacidade"
              onPress={() => console.log('Privacidade')}
            />
          </View>

          {/* Logout */}
          {user && (
            <View style={styles.menuSection}>
              <MenuItem
                icon="log-out-outline"
                title="Sair"
                onPress={handleLogout}
                showArrow={false}
              />
            </View>
          )}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Versão 1.0.0</Text>
          <Text style={styles.appName}>McDonald's Demo App</Text>
        </View>
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
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: colors.background,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.background,
    opacity: 0.9,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: colors.background,
    opacity: 0.8,
  },
  loginPrompt: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginTop: 16,
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.background,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  menuContainer: {
    paddingTop: 20,
  },
  menuSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  menuItem: {
    backgroundColor: colors.cardBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  appVersion: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});

export default ProfileScreen;
