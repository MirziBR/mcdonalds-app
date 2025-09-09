# 🐙 Como Criar Repositório no GitHub

## 🚀 Guia Rápido - 3 Passos

### **1️⃣ Instalar Git (se ainda não tiver)**

**Windows:**
- Baixe: https://git-scm.com/downloads
- Instale com configurações padrão
- **Ou use GitHub Desktop:** https://desktop.github.com/

**Verificar se funcionou:**
```bash
git --version
```

### **2️⃣ Criar Repositório no GitHub**

1. **Acesse:** https://github.com
2. **Clique:** "New repository" (botão verde)
3. **Preencha:**
   - **Repository name:** `mcdonalds-demo-app`
   - **Description:** `App completo de restaurante React Native inspirado no McDonald's`
   - **Visibilidade:** Public ✅ (para mostrar no portfólio)
   - **NÃO marque** "Add a README" (já temos um)
4. **Clique:** "Create repository"

### **3️⃣ Conectar e Enviar Código**

**Opção A - Linha de Comando (Recomendado):**

1. **Execute o script pronto:**
```bash
# No PowerShell, na pasta do projeto:
.\inicializar-git.bat
```

2. **Adicione seu repositório remoto:**
```bash
git remote add origin https://github.com/SEU-USUARIO/mcdonalds-demo-app.git
git branch -M main
git push -u origin main
```

**Opção B - GitHub Desktop (Mais Fácil):**

1. Abra GitHub Desktop
2. Clique "Add an Existing Repository from your Hard Drive"
3. Selecione a pasta do projeto
4. Clique "Publish repository"

## 🎯 Resultado Esperado

Após o push, seu repositório terá:

```
mcdonalds-demo-app/
├── 📱 Código fonte completo
├── 📝 README.md profissional  
├── 📄 LICENSE (MIT)
├── 🤝 CONTRIBUTING.md
├── 📋 CHANGELOG.md
├── 🐛 Issue templates
├── 📦 package.json
└── 🚀 App funcionando!
```

## ✨ Para Impressionar no Portfólio

### **Adicione Tags/Releases:**
```bash
git tag -a v1.0.0 -m "🎉 Lançamento inicial - App McDonald's completo"
git push origin v1.0.0
```

### **Configure GitHub Pages (opcional):**
1. Vá em Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: main, folder: /docs (se tiver)

### **Adicione Badges no README:**
O README já tem badges prontos! Só substitua pelos seus dados:
- `[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)]`
- `[![Expo](https://img.shields.io/badge/Expo-49.0.15-black.svg)]`

### **Screenshots/GIFs:**
1. Grave um GIF do app funcionando
2. Faça screenshots das telas principais
3. Adicione no README na seção "Screenshots"

## 🚨 Problemas Comuns

### **Git não encontrado:**
```bash
# Erro: 'git' is not recognized
# Solução: Instale Git e reinicie PowerShell
```

### **Push rejeitado:**
```bash
# Se der erro de push:
git pull origin main --rebase
git push origin main
```

### **Autenticação:**
- Use **Personal Access Token** (não senha)
- Vá em GitHub → Settings → Developer settings → Personal access tokens

## 🏆 Checklist Final

- [ ] ✅ Repositório criado no GitHub
- [ ] ✅ Código enviado (git push)
- [ ] ✅ README.md aparecendo bonito
- [ ] ✅ Licença MIT ativa
- [ ] ✅ Issues templates funcionando
- [ ] ✅ Tags/releases criadas
- [ ] ✅ Link funcionando para testar o app

## 🎉 Pronto!

Seu repositório estará **pronto para:**

- 📋 **Portfólio** profissional
- 👥 **Colaboração** com outros devs  
- 🏢 **Mostrar para empresas**
- 📚 **Compartilhar** conhecimento
- ⭐ **Ganhar stars** no GitHub!

---

**URL do seu repo:** `https://github.com/SEU-USUARIO/mcdonalds-demo-app`

**Clone para outros:** `git clone https://github.com/SEU-USUARIO/mcdonalds-demo-app.git`
