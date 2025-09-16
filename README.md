# 📱 Adivinha quem eu sou?

Um jogo interativo desenvolvido com **React Native** e **Expo**, onde o usuário precisa **inclinar o celular para frente** para sortear novas palavras.  
O fundo e a cor do texto mudam automaticamente, deixando a experiência mais divertida.  

---

## 🚀 Tecnologias utilizadas
- [React Native](https://reactnative.dev/) — Criação do app mobile  
- [Expo](https://expo.dev/) — Ambiente de desenvolvimento  
- [expo-sensors](https://docs.expo.dev/versions/latest/sdk/sensors/) — Para capturar os dados do giroscópio  

---

## 🎮 Como funciona
- Na tela inicial, o usuário clica em **Começar**.  
- O app pede **permissão para usar o sensor**.  
- Ao inclinar o celular para frente, uma **nova palavra é sorteada** junto com novas cores de fundo e texto.  

---

## 📂 Estrutura do projeto
- **App.js** → código principal do jogo  
- **palavras.json** → arquivo com a lista de palavras a serem sorteadas  

Exemplo de `palavras.json`:
```json
[
  "Gato",
  "Cachorro",
  "Carro",
  "Banana",
  "Professor"
]
