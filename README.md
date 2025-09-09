# 🍔 McDonald's Demo App - React Native

[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-49.0.15-black.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Um aplicativo completo de restaurante inspirado no McDonald's, construído com React Native e Expo. **100% funcional sem backend** - perfeito para demonstrações e aprendizado!

## 📱 **Demo Rápido**

https://github.com/user/mcdonalds-demo-app/assets/demo.gif

> **🚀 Teste agora:** Clone o repo, execute `npm install && npm start`, escaneie o QR code!

## 📱 Funcionalidades

### ✅ Implementadas
- **🏠 Tela Inicial** - Promoções, ações rápidas e produtos em destaque
- **🍔 Cardápio** - Lista de produtos com filtros por categoria e busca
- **🛒 Carrinho** - Gerenciamento de itens, quantidades e cálculo de totais
- **📦 Pedidos** - Histórico de pedidos com diferentes status
- **👤 Perfil** - Informações do usuário, configurações e login/logout
- **🎯 Detalhes do Produto** - Informações completas, personalização e avaliações
- **💳 Checkout** - Finalização de pedido com endereço e pagamento

### 🎨 Design System
- Cores oficial do McDonald's (vermelho #E31837 e amarelo #FFD700)
- Componentes reutilizáveis e padronizados
- Interface moderna e intuitiva
- Ícones do Ionicons
- Navegação por tabs na parte inferior

### 📦 Estado Local
- Context API para gerenciamento global
- Persistência no AsyncStorage
- Carrinho, favoritos, usuário e endereços salvos
- Dados mockados para demonstração

## 📸 **Screenshots**

<p align="center">
  <img src="https://via.placeholder.com/200x400/E31837/FFFFFF?text=Home" alt="Home" width="200"/>
  <img src="https://via.placeholder.com/200x400/E31837/FFFFFF?text=Menu" alt="Menu" width="200"/>
  <img src="https://via.placeholder.com/200x400/E31837/FFFFFF?text=Cart" alt="Cart" width="200"/>
  <img src="https://via.placeholder.com/200x400/E31837/FFFFFF?text=Orders" alt="Orders" width="200"/>
</p>

## 🚀 **Instalação e Execução**

### **Pré-requisitos**
- Node.js 16+ (recomendado 18+)
- npm ou yarn
- Expo Go app no celular ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### **Clone e Execute**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mcdonalds-demo-app.git

# Entre na pasta
cd mcdonalds-demo-app

# Instale as dependências
npm install

# Inicie o servidor
npm start
```

### **Testando o App**
1. **📱 Mobile:** Escaneie o QR code com Expo Go
2. **💻 Web:** Pressione 'w' no terminal  
3. **🤖 Android:** Pressione 'a' (requer Android Studio)
4. **🍎 iOS:** Pressione 'i' (requer Xcode - apenas Mac)

## 📁 Estrutura do Projeto

```
RestauranteDemoApp/
├── App.js                 # Componente raiz
├── package.json           # Dependências
├── app.json              # Configuração Expo
├── src/
│   ├── components/       # Componentes reutilizáveis
│   │   ├── Button.js
│   │   ├── ProductCard.js
│   │   ├── CartItem.js
│   │   ├── CategoryFilter.js
│   │   ├── PromotionCard.js
│   │   └── OrderCard.js
│   ├── context/          # Context API
│   │   └── AppContext.js
│   ├── data/             # Dados mockados
│   │   └── mockData.js
│   ├── navigation/       # Navegação
│   │   └── AppNavigator.js
│   ├── screens/          # Telas do app
│   │   ├── HomeScreen.js
│   │   ├── MenuScreen.js
│   │   ├── CartScreen.js
│   │   ├── OrdersScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── ProductDetailScreen.js
│   │   └── CheckoutScreen.js
│   └── styles/           # Estilos globais
│       └── colors.js
```

## 🎯 Funcionalidades Demonstradas

### 1. **Fluxo de Compra Completo**
- Navegar pelo cardápio
- Adicionar produtos ao carrinho
- Ajustar quantidades
- Finalizar pedido
- Acompanhar status

### 2. **Gerenciamento de Estado**
- Carrinho persistente
- Favoritos salvos
- Histórico de pedidos
- Preferências do usuário

### 3. **Interface Rica**
- Filtros por categoria
- Busca de produtos
- Promoções em destaque
- Cards interativos

### 4. **Dados Mockados Realistas**
- 14+ produtos do McDonald's
- 3 promoções ativas
- Histórico de pedidos
- Endereços de exemplo

## 📱 Telas do App

### 🏠 Home
- Saudação personalizada
- Ações rápidas (Cardápio, Promoções, etc.)
- Carrossel de promoções
- Produtos mais pedidos
- Banner de download do app

### 🍔 Cardápio
- Barra de busca
- Filtros por categoria
- Grid de produtos com fotos
- Contador de resultados

### 🛒 Carrinho
- Lista de itens selecionados
- Controles de quantidade
- Cálculo de entrega
- Endereço selecionado
- Resumo financeiro

### 📦 Pedidos
- Filtros por status
- Cards com informações completas
- Status visual (preparando, entregue, etc.)
- Refresh para atualizar

### 👤 Perfil
- Login/logout demo
- Menu de configurações
- Informações da conta
- Links úteis

## 🎨 Customizações Disponíveis

### Cores
```javascript
// src/styles/colors.js
export const colors = {
  primary: '#E31837',    // Vermelho McDonald's
  secondary: '#FFD700',  // Amarelo McDonald's
  // ... outras cores
};
```

### Dados
```javascript
// src/data/mockData.js
- Produtos com imagens, preços e descrições
- Categorias com ícones
- Promoções com descontos
- Usuários e endereços demo
```

## 🔧 Scripts Disponíveis

```bash
# Iniciar desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no navegador
npm run web
```

## 🛠️ **Tecnologias Utilizadas**

| Tecnologia | Versão | Função |
|------------|--------|---------|
| **React Native** | 0.72.6 | Framework mobile |
| **Expo** | 49.0.15 | Plataforma de desenvolvimento |
| **React Navigation** | 6.x | Navegação entre telas |
| **React Native Paper** | 5.x | Componentes de UI |
| **Ionicons** | - | Biblioteca de ícones |
| **AsyncStorage** | - | Persistência local |
| **Context API** | - | Gerenciamento de estado |

## 🎯 Próximos Passos

Para transformar em app real, seria necessário:

1. **Backend** - API REST com Node.js/Python
2. **Banco de Dados** - PostgreSQL/MongoDB
3. **Autenticação** - JWT/OAuth
4. **Pagamentos** - Stripe/PayPal/PIX
5. **Notificações** - Firebase Cloud Messaging
6. **Mapas** - Google Maps para delivery
7. **Integrações** - DoorDash/UberEats APIs

## 🐛 Problemas Conhecidos

- Imagens são placeholders (URLs mockadas)
- Sem persistência real de dados
- Login é apenas demonstrativo
- Checkout não processa pagamento real

## 🤝 **Contribuindo**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🐛 **Problemas Conhecidos**

- [ ] Imagens são placeholders (URLs mockadas)
- [ ] Sem persistência real de dados (apenas AsyncStorage)
- [ ] Login é apenas demonstrativo
- [ ] Checkout não processa pagamento real
- [ ] Algumas dependências requerem Node 18+

## 🔧 **Solução de Problemas**

<details>
<summary>Erro de versão do Node</summary>

Se aparecer warnings sobre versão do Node, execute:
```bash
npm install --force
```
</details>

<details>
<summary>QR Code não funciona</summary>

- Certifique-se que celular e computador estão na mesma rede WiFi
- Reinicie o Metro bundler: pressione `r` no terminal
- Tente limpar cache: `expo start -c`
</details>

<details>
<summary>App não carrega</summary>

```bash
# Limpe dependências e reinstale
rm -rf node_modules
npm install
npm start
```
</details>

## 🎯 **Roadmap**

- [ ] Backend com Node.js/Express
- [ ] Banco de dados PostgreSQL
- [ ] Autenticação JWT real
- [ ] Gateway de pagamento (Stripe/PIX)
- [ ] Notificações push
- [ ] Integração com delivery (DoorDash/UberEats)
- [ ] Testes automatizados
- [ ] CI/CD pipeline

## 📄 **Licença**

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 **Autor**

**Desenvolvido com ❤️ e React Native**

- 📧 Email: [josuemariano132@gmail.com](josuemariano132@gmail.com)

## ⭐ **Curtiu o projeto?**

Se este projeto foi útil para você, considere dar uma ⭐ star no repositório!

**🚀 Teste agora:** `git clone` → `npm install` → `npm start` → Escaneie QR code!
