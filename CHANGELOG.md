# Changelog

Todas as mudanças importantes neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/spec/v2.0.0.html).

## [1.0.0] - 2024-09-09

### ✨ Adicionado
- **Tela Home** completa com promoções e ações rápidas
- **Cardápio** com busca e filtros por categoria
- **Carrinho** funcional com controle de quantidades
- **Checkout** completo com endereço e pagamentos
- **Histórico de pedidos** com diferentes status
- **Perfil de usuário** com login/logout demo
- **Sistema de favoritos** persistente
- **Context API** para gerenciamento de estado global
- **AsyncStorage** para persistência local
- **Navegação** completa com tabs e stacks
- **Design system** com cores oficiais do McDonald's
- **Componentes reutilizáveis** (ProductCard, CartItem, etc.)
- **Dados mockados** realistas (14+ produtos)
- **Documentação** completa com README e guias

### 🛠️ Técnico
- **React Native 0.72.6** como framework base
- **Expo 49.0.15** para desenvolvimento
- **React Navigation 6** para navegação
- **React Native Paper 5** para componentes UI
- **Ionicons** para ícones consistentes
- **Suporte completo** para iOS, Android e Web

### 📱 Funcionalidades
- [x] Fluxo completo de compra
- [x] Persistência de carrinho
- [x] Sistema de avaliações
- [x] Cálculo automático de frete
- [x] Interface responsiva
- [x] Feedback visual em todas as ações

### 🎨 UI/UX
- [x] Design idêntico ao McDonald's oficial
- [x] Cores da marca (#E31837, #FFD700)
- [x] Animações e transições suaves
- [x] Estados de loading e erro
- [x] Feedback haptic (celular)

### 📦 Dependências Principais
- `react-native: 0.72.6`
- `expo: ~49.0.15`
- `@react-navigation/native: ^6.1.9`
- `@react-navigation/bottom-tabs: ^6.5.11`
- `react-native-paper: ^5.10.6`
- `@react-native-async-storage/async-storage: 1.18.2`

### 📚 Documentação
- README.md completo com instruções
- COMO-EXECUTAR.md com guia passo a passo
- CONTRIBUTING.md com diretrizes
- Comentários detalhados no código

### ⚡ Performance
- Renderização otimizada com FlatList
- Imagens carregadas sob demanda
- Estado local minimizado
- AsyncStorage para dados críticos

### 🧪 Testado Em
- ✅ Android (Expo Go)
- ✅ iOS (Expo Go) 
- ✅ Web Browser (Chrome, Firefox, Safari)
- ✅ Windows 10/11
- ✅ macOS
- ✅ Linux

---

## Como Contribuir para o Changelog

Quando adicionar uma nova funcionalidade ou correção:

1. **Adicione** uma entrada na seção "Unreleased"
2. **Use** as categorias: Added, Changed, Deprecated, Removed, Fixed, Security
3. **Descreva** a mudança de forma clara
4. **Referencie** issues/PRs quando relevante

### Exemplo:
```markdown
## [Unreleased]

### Added
- Nova tela de configurações (#123)

### Fixed  
- Correção no cálculo de frete (#124)
```
