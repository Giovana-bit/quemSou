# 📱 Adivinha Quem Eu Sou?

Um jogo interativo desenvolvido com **React Native** e **Expo**, onde o usuário precisa **inclinar o celular para frente** para sortear novas palavras.  
O fundo e a cor do texto mudam automaticamente, tornando a experiência mais divertida. O jogo também inclui um **timer** que mostra o tempo de cada rodada.

---

## 🚀 Tecnologias utilizadas
- [React Native](https://reactnative.dev/) — Criação do app mobile  
- [Expo](https://expo.dev/) — Ambiente de desenvolvimento  
- [expo-sensors](https://docs.expo.dev/versions/latest/sdk/sensors/) — Para capturar os dados do giroscópio  
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) — Ícones para categorias e botões  

---

## 🎮 Como funciona
1. Na tela inicial, o usuário clica em **Começar**.  
2. O app solicita **permissão para usar o sensor**.  
3. O usuário escolhe uma **categoria**: Jogos, Comidas, Objetos ou Profissão.  
4. Ao inclinar o celular para frente, uma **nova palavra é sorteada** com cores de fundo e texto diferentes.  
5. Um **timer** indica quanto tempo a palavra está sendo exibida.  

---

## 📝 Categorias e palavras

### Jogos
Minecraft, Fortnite, League of Legends, Among Us, Pokémon, Call of Duty, FIFA, Genshin Impact, The Sims, Roblox, Valorant, Apex Legends, Overwatch, Zelda, Super Mario  

### Comidas
Pizza, Hambúrguer, Sushi, Chocolate, Lasanha, Churrasco, Pão de Queijo, Macarrão, Sorvete, Brigadeiro, Feijoada, Panqueca, Coxinha, Bolo de Cenoura, Tacos  

### Objetos
Cadeira, Celular, Livro, Teclado, Mochila, Relógio, Caneta, Óculos, Carteira, Fone de Ouvido, Copo, Bola, Lâmpada, Câmera, Chave  

### Profissão
Médico, Professor, Engenheiro, Jogador, Designer, Advogado, Arquiteto, Policial, Dentista, Cozinheiro, Ator, Piloto, Enfermeiro, Jornalista, Bombeiro  

---

## 📂 Estrutura do projeto
- **App.js** → Código principal do jogo  
- **palavras.json** → Arquivo com a lista de palavras a serem sorteadas  
- **assets/** → Imagens de fundo e avatares  

Exemplo de `palavras.json`:
```json
{
  "Jogos": ["Minecraft","Fortnite","League of Legends","Among Us","Pokémon"],
  "Comidas": ["Pizza","Hambúrguer","Sushi","Chocolate","Lasanha"],
  "Objetos": ["Cadeira","Celular","Livro","Teclado","Mochila"],
  "Profissão": ["Médico","Professor","Engenheiro","Jogador","Designer"]
}
