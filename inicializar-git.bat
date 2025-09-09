@echo off
echo 🍔 Configurando Repositorio Git - McDonald's Demo App
echo.

REM Verificar se Git esta instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git nao encontrado!
    echo.
    echo 📥 Instale o Git primeiro:
    echo    https://git-scm.com/downloads
    echo.
    echo 🐙 Ou use GitHub Desktop:
    echo    https://desktop.github.com/
    echo.
    pause
    exit /b 1
)

echo ✅ Git encontrado!
echo.

REM Inicializar repositorio se nao existe
if not exist .git (
    echo 🚀 Inicializando repositorio Git...
    git init
    echo.
)

REM Configurar usuario se necessario
git config --global user.name >nul 2>&1
if errorlevel 1 (
    echo 👤 Configure seu nome:
    set /p username="Digite seu nome: "
    git config --global user.name "%username%"
)

git config --global user.email >nul 2>&1  
if errorlevel 1 (
    echo 📧 Configure seu email:
    set /p email="Digite seu email: "
    git config --global user.email "%email%"
)

echo.
echo 📦 Adicionando arquivos ao Git...
git add .

echo.
echo 💾 Fazendo commit inicial...
git commit -m "🎉 feat: initial commit - McDonald's Demo App completo

✨ Funcionalidades implementadas:
- Tela home com promoções  
- Cardápio com busca e filtros
- Carrinho funcional
- Checkout completo
- Histórico de pedidos
- Perfil de usuário
- Sistema de favoritos
- Context API + AsyncStorage
- Design system McDonald's
- 14+ produtos mockados
- Navegação completa
- Componentes reutilizáveis

📱 Tecnologias:
- React Native 0.72.6
- Expo 49.0.15
- React Navigation 6
- React Native Paper 5
- Ionicons

🚀 Para executar: npm install && npm start"

echo.
echo ✅ Repositorio Git configurado com sucesso!
echo.
echo 📁 Proximos passos:
echo    1. Crie um repositorio no GitHub
echo    2. Execute: git remote add origin https://github.com/SEU-USUARIO/REPO.git  
echo    3. Execute: git branch -M main
echo    4. Execute: git push -u origin main
echo.
echo 🎉 Pronto! Seu codigo estara no GitHub!
echo.
pause
