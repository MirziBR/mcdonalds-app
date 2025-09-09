# Especificações Técnicas - App Restaurante

## 🏗️ Arquitetura do Sistema

### Diagrama de Alto Nível
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   iOS App   │    │ Android App │    │  Web Admin  │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
    ┌─────────────────────────────────────────────────┐
    │               API Gateway                        │
    └─────────────────────────────────────────────────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│Auth Service │    │Order Service│    │Menu Service │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
    ┌─────────────────────────────────────────────────┐
    │               PostgreSQL                         │
    └─────────────────────────────────────────────────┘
```

## 📱 Especificações Mobile

### React Native Setup
```json
{
  "name": "RestauranteApp",
  "version": "1.0.0",
  "dependencies": {
    "react-native": "0.72.6",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/stack": "^6.3.20",
    "@reduxjs/toolkit": "^1.9.7",
    "react-redux": "^8.1.3",
    "react-native-paper": "^5.10.6",
    "react-native-vector-icons": "^10.0.2",
    "react-native-fast-image": "^8.6.3",
    "react-native-async-storage": "^1.19.3",
    "@react-native-firebase/app": "^18.6.1",
    "@react-native-firebase/messaging": "^18.6.1",
    "react-hook-form": "^7.47.0",
    "axios": "^1.5.1"
  }
}
```

### Estrutura de Pastas
```
src/
├── components/
│   ├── common/
│   │   ├── Button.js
│   │   ├── Input.js
│   │   └── Loading.js
│   ├── menu/
│   │   ├── MenuCard.js
│   │   ├── MenuList.js
│   │   └── ProductDetail.js
│   └── cart/
│       ├── CartItem.js
│       └── CartSummary.js
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.js
│   │   └── RegisterScreen.js
│   ├── home/
│   │   └── HomeScreen.js
│   ├── menu/
│   │   ├── MenuScreen.js
│   │   └── ProductScreen.js
│   ├── cart/
│   │   └── CartScreen.js
│   └── profile/
│       └── ProfileScreen.js
├── navigation/
│   ├── AppNavigator.js
│   ├── AuthNavigator.js
│   └── TabNavigator.js
├── store/
│   ├── index.js
│   ├── authSlice.js
│   ├── menuSlice.js
│   └── cartSlice.js
├── services/
│   ├── api.js
│   ├── auth.js
│   └── notifications.js
└── utils/
    ├── constants.js
    └── helpers.js
```

## 🖥️ Especificações Backend

### API Endpoints

#### Autenticação
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

#### Usuários
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/addresses
POST   /api/users/addresses
PUT    /api/users/addresses/:id
DELETE /api/users/addresses/:id
```

#### Cardápio
```
GET    /api/menu/categories
GET    /api/menu/products
GET    /api/menu/products/:id
GET    /api/menu/products/category/:categoryId
GET    /api/menu/search?q=
```

#### Pedidos
```
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id/cancel
GET    /api/orders/:id/track
```

#### Promoções
```
GET    /api/promotions
POST   /api/promotions/validate-coupon
GET    /api/promotions/user-coupons
```

### Modelo de Dados

#### Usuário
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Produto
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    image_url VARCHAR(500),
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Pedido
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2),
    delivery_address TEXT,
    delivery_fee DECIMAL(10,2),
    estimated_delivery TIMESTAMP,
    external_order_id VARCHAR(255), -- Para DoorDash/UberEats
    platform VARCHAR(50), -- 'app', 'doordash', 'ubereats'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Item do Pedido
```sql
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2),
    customizations JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔌 Integrações Externas

### DoorDash API Integration
```javascript
// services/doordash.js
class DoorDashService {
  constructor() {
    this.baseURL = 'https://api.doordash.com/v1';
    this.apiKey = process.env.DOORDASH_API_KEY;
  }

  async syncMenu() {
    const menuData = await this.getLocalMenu();
    return await this.api.put('/menu', menuData);
  }

  async createOrder(orderData) {
    const doordashOrder = this.transformOrder(orderData);
    return await this.api.post('/orders', doordashOrder);
  }

  async updateOrderStatus(orderId, status) {
    return await this.api.patch(`/orders/${orderId}`, { status });
  }
}
```

### UberEats API Integration
```javascript
// services/ubereats.js
class UberEatsService {
  constructor() {
    this.baseURL = 'https://api.uber.com/v1/eats';
    this.apiKey = process.env.UBEREATS_API_KEY;
  }

  async syncMenu() {
    const menuData = await this.getLocalMenu();
    return await this.api.put('/menu', menuData);
  }

  async createOrder(orderData) {
    const uberOrder = this.transformOrder(orderData);
    return await this.api.post('/orders', uberOrder);
  }
}
```

### Stripe Payment Integration
```javascript
// services/payment.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  async createPaymentIntent(amount, currency = 'brl') {
    return await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  async confirmPayment(paymentIntentId) {
    return await stripe.paymentIntents.confirm(paymentIntentId);
  }
}
```

## 📱 Design System

### Cores
```javascript
export const colors = {
  primary: '#E31837',      // Vermelho principal
  secondary: '#FFD700',    // Amarelo McDonald's
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};
```

### Tipografia
```javascript
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 16,
  },
};
```

### Componentes Base
```javascript
// components/common/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Button = ({ title, onPress, variant = 'primary' }) => (
  <TouchableOpacity 
    style={[styles.button, styles[variant]]} 
    onPress={onPress}
  >
    <Text style={[styles.text, styles[`${variant}Text`]]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#E31837',
  },
  secondary: {
    backgroundColor: '#FFD700',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#333333',
  },
});
```

## 🔐 Segurança

### JWT Authentication
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

### Validação de Dados
```javascript
// validation/schemas.js
const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  phone: Joi.string().pattern(/^\d{10,11}$/).required(),
});

const orderSchema = Joi.object({
  items: Joi.array().items(Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
    customizations: Joi.object().optional(),
  })).min(1).required(),
  deliveryAddress: Joi.string().required(),
  paymentMethod: Joi.string().valid('card', 'pix', 'cash').required(),
});
```

## 🚀 Deploy e DevOps

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

### GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Deploy to production
        run: |
          # Deploy commands here
```

---

*Este documento será atualizado conforme o desenvolvimento progride.*
