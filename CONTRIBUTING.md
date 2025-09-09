# 🤝 Contribuindo para McDonald's Demo App

Obrigado por considerar contribuir para este projeto! Toda contribuição é bem-vinda.

## 🚀 Como Contribuir

### 1. Fork do Projeto
```bash
# Clique em "Fork" no GitHub ou execute:
gh repo fork seu-usuario/mcdonalds-demo-app
```

### 2. Clone seu Fork
```bash
git clone https://github.com/SEU-USUARIO/mcdonalds-demo-app.git
cd mcdonalds-demo-app
```

### 3. Crie uma Branch
```bash
git checkout -b feature/minha-nova-feature
# ou
git checkout -b fix/corrigir-bug
```

### 4. Desenvolva e Teste
```bash
# Instale dependências
npm install

# Execute o app
npm start

# Teste suas mudanças
```

### 5. Commit suas Mudanças
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
# ou
git commit -m "fix: corrige bug Y"
```

### 6. Push e Pull Request
```bash
git push origin feature/minha-nova-feature
```
Depois abra um Pull Request no GitHub.

## 📝 Padrões de Commit

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas de manutenção

## 🎯 Tipos de Contribuição

### 🐛 Reportar Bugs
- Use o template de issue
- Descreva os passos para reproduzir
- Inclua screenshots se relevante

### ✨ Sugerir Features
- Explique o caso de uso
- Descreva o comportamento esperado
- Considere alternativas

### 💻 Código
- Siga os padrões do projeto
- Adicione testes se aplicável
- Atualize documentação

### 📖 Documentação
- Corrija erros de digitação
- Melhore explicações
- Adicione exemplos

## 🛠️ Setup de Desenvolvimento

1. **Node.js 16+** instalado
2. **Expo CLI:** `npm install -g @expo/cli`
3. **Expo Go** no celular
4. **Git** configurado

## 🧪 Testando

```bash
# Execute o app
npm start

# Teste as funcionalidades:
# - Navegação entre telas
# - Adicionar/remover do carrinho
# - Finalizar pedido
# - Favoritar produtos
```

## 📱 Testando em Dispositivos

- **Android:** Expo Go app
- **iOS:** Expo Go app
- **Web:** `npm run web`

## 🎨 Padrões de Código

### JavaScript/React Native
- Use const/let ao invés de var
- Prefira arrow functions
- Use destructuring quando possível
- Siga o padrão do ESLint (se configurado)

### Componentes
```jsx
// ✅ Bom
const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{product.name}</Text>
    </TouchableOpacity>
  );
};

// ❌ Evitar
function ProductCard(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.product.name}</Text>
    </TouchableOpacity>
  );
}
```

### Estilos
```jsx
// ✅ Bom - StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

// ❌ Evitar - inline styles
<View style={{ flex: 1, backgroundColor: '#fff' }}>
```

## 🔍 Code Review

### O que verificamos:
- [ ] Funcionalidade funciona corretamente
- [ ] Código segue padrões do projeto
- [ ] Performance não foi degradada
- [ ] Documentação foi atualizada
- [ ] Não quebra funcionalidades existentes

## ⚡ Dicas Rápidas

1. **Sempre teste** antes de fazer PR
2. **Mantenha PRs pequenos** e focados
3. **Descreva claramente** o que foi feito
4. **Seja respeitoso** nos comentários
5. **Pergunte** se tiver dúvidas

## 🎉 Primeiras Contribuições

Se é sua primeira contribuição:
1. Procure issues marcadas com `good first issue`
2. Leia toda a documentação
3. Faça um fork pequeno primeiro
4. Não hesite em perguntar

## 📞 Precisa de Ajuda?

- 🐛 **Bugs:** Abra uma issue
- 💡 **Dúvidas:** Use Discussions
- 📧 **Contato:** [email]

---

**Obrigado por tornar este projeto melhor! 🙏**
