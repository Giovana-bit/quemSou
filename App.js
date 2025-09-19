import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import { Gyroscope } from "expo-sensors";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import palavras from "./palavras.json";

// Função para obter uma cor aleatória diferente da atual
const obterCorAleatoria = (corAtual) => {
  const cores = [
    "#CF3A69",
    "#8F4254",
    "#7CAA96",
    "#B6C474",
    "#AAF2E4",
    "#FD65A0",
    "#2fb548",
    "#ff9a52",
  ];
  const outrasCores = cores.filter((cor) => cor !== corAtual);
  return outrasCores[Math.floor(Math.random() * outrasCores.length)];
};

export default function App() {
  const [palavra, definirPalavra] = useState("");
  const [corFundo, definirCorFundo] = useState("#FFFFFF");
  const [corTexto, definirCorTexto] = useState("#000000");
  const [telaInicial, definirTelaInicial] = useState(true);
  const [categoria, setCategoria] = useState(null);
  const [permiteSensor, definirPermiteSensor] = useState(false);
  const [inscricao, definirInscricao] = useState(null);
  const [tempo, setTempo] = useState(0);

  let ultimaTroca = Date.now();

  useEffect(() => {
    if (permiteSensor && categoria) {
      sortearPalavra();
      iniciarSensor();
      return () => pararSensor();
    }
  }, [permiteSensor, categoria]);

  useEffect(() => {
    let intervalo;
    if (!telaInicial && categoria && permiteSensor) {
      intervalo = setInterval(() => setTempo((t) => t + 1), 1000);
    } else {
      setTempo(0);
    }
    return () => clearInterval(intervalo);
  }, [telaInicial, categoria, permiteSensor]);

  const iniciarSensor = () => {
    Gyroscope.setUpdateInterval(200);

    definirInscricao(
      Gyroscope.addListener(({ y }) => {
        const agora = Date.now();
        if (y < -0.8 && agora - ultimaTroca > 400) {
          ultimaTroca = agora;
          sortearPalavra();
        }
      })
    );
  };

  const pararSensor = () => {
    inscricao && inscricao.remove();
    definirInscricao(null);
  };

  const sortearPalavra = () => {
    if (!categoria) return;
    const lista = palavras[categoria];
    const novaPalavra = lista[Math.floor(Math.random() * lista.length)];
    const novaCorTexto = corTexto === "#000000" ? "#FFFFFF" : "#000000";
    const novaCorFundo = obterCorAleatoria(corFundo);

    definirPalavra(novaPalavra);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
    setTempo(0);
  };

  // Tela inicial
  const renderTelaInicial = () => (
    <ImageBackground
      source={{
        uri: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/591d3c9d57542cc1f00e55b716fbb07d96763839-1920x1080.jpg?auto=format&fit=fill&q=80&w=1480",
      }}
      style={styles.fundo}
    >
      <View style={styles.overlayRow}>
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Emote_Voc%C3%AA_me_conquistou.png/revision/latest?cb=20220425191018&path-prefix=pt-br",
          }}
          style={styles.avatarEsquerda}
        />
        <View style={styles.centro}>
          <Text style={styles.titulo}>ADIVINHA QUEM SOU EU?</Text>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => definirTelaInicial(false)}
          >
            <Text style={styles.textoBotao}>Começar</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: "https://static.wikia.nocookie.net/leagueoflegends/images/e/e1/Emote_Uma_longa_estrada.png/revision/latest?cb=20220425010348&path-prefix=pt-br",
          }}
          style={styles.avatarDireita}
        />
      </View>
    </ImageBackground>
  );

  // Tela de categorias
  const renderCategorias = () => (
    <ImageBackground
      source={{
        uri: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/591d3c9d57542cc1f00e55b716fbb07d96763839-1920x1080.jpg?auto=format&fit=fill&q=80&w=1480",
      }}
      style={styles.fundo}
    >
      <View style={styles.overlayFundo} />
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => setCategoria("Jogos")}>
          <FontAwesome5 name="star" size={40} color="#FFF" />
          <Text style={styles.cardTexto}>Jogos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => setCategoria("Comidas")}>
          <FontAwesome5 name="pizza-slice" size={40} color="#FFF" />
          <Text style={styles.cardTexto}>Comidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => setCategoria("Objetos")}>
          <MaterialCommunityIcons name="cube-outline" size={40} color="#FFF" />
          <Text style={styles.cardTexto}>Objetos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => setCategoria("Profissão")}>
          <MaterialCommunityIcons name="account-hard-hat" size={40} color="#FFF" />
          <Text style={styles.cardTexto}>Profissão</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  // Tela de permissão do sensor
  const renderPermissao = () => (
    <ImageBackground
      source={{
        uri: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/591d3c9d57542cc1f00e55b716fbb07d96763839-1920x1080.jpg?auto=format&fit=fill&q=80&w=1480",
      }}
      style={styles.fundo}
    >
      <View style={styles.overlayFundo} />
      <View style={styles.tela}>
        <Text style={styles.titulo}>Permitir uso do sensor?</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => definirPermiteSensor(true)}
        >
          <Text style={styles.textoBotao}>Permitir</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  // Tela da palavra com timer
  const renderPalavra = () => (
    <View style={[styles.tela, { backgroundColor: corFundo }]}>
      <Text style={[styles.palavra, { color: corTexto }]}>{palavra}</Text>
      <Text style={styles.timer}>Tempo: {tempo}s</Text>
    </View>
  );

  // Fluxo de telas
  if (telaInicial) return renderTelaInicial();
  if (!categoria) return renderCategorias();
  if (!permiteSensor) return renderPermissao();
  return renderPalavra();
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  overlayFundo: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  centro: {
    flex: 1,
    alignItems: "center",
  },
  avatarEsquerda: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  avatarDireita: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#5A3FFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  palavra: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 20,
    textAlign: "center",
  },
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 100,
  },
  card: {
    width: "40%",
    height: 130,
    backgroundColor: "#4A2DB6",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    elevation: 6,
  },
  cardTexto: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
