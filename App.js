import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Gyroscope } from "expo-sensors";
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
  const [instrucao, definirInstrucao] = useState(null);
  const [telaInicial, definirTelaInicial] = useState(true);
  const [permiteSensor, definirPermiteSensor] = useState(false);
  const [inscricao, definirInscricao] = useState(null);

  // Variável para controlar o tempo mínimo entre trocas
  let ultimaTroca = Date.now();

  useEffect(() => {
    if (permiteSensor) {
      sortearPalavra(); // Sorteia uma palavra automaticamente
      iniciarSensor(); // Inicia o sensor
      return () => pararSensor(); // Limpa o sensor ao desmontar o componente
    }
  }, [permiteSensor]);

  const iniciarSensor = () => {
    Gyroscope.setUpdateInterval(500); // Define o intervalo de atualização do sensor

    definirInscricao(
      Gyroscope.addListener(({ x, y, z }) => {
        const agora = Date.now();

        // Exibe os valores do giroscópio no console
        console.log(
          `x: ${x.toFixed(2)}, y: ${y.toFixed(2)}, z: ${z.toFixed(2)}`
        );

        // Detecta inclinação para frente (abaixar a tela)
        if (z < -2 && agora - ultimaTroca > 1000) {
          ultimaTroca = agora;

          // Sorteia uma nova palavra e muda as cores
          const novaPalavra =
            palavras[Math.floor(Math.random() * palavras.length)];
          const novaCorTexto =
            corTexto === "#000000" ? "#FFFFFF" : "#000000";
          const novaCorFundo = obterCorAleatoria(corFundo);

          // Atualiza os estados
          definirPalavra(novaPalavra);
          definirCorTexto(novaCorTexto);
          definirCorFundo(novaCorFundo);
        }
      })
    );
  };

  const pararSensor = () => {
    // Remove o listener do giroscópio
    inscricao && inscricao.remove();
    definirInstrucao(null);
  };

  const sortearPalavra = () => {
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    const novaCorTexto = corTexto === "#000000" ? "#FFFFFF" : "#000000";
    const novaCorFundo = obterCorAleatoria(corFundo);

    definirPalavra(novaPalavra);
    definirCorTexto(novaCorTexto);
    definirCorFundo(novaCorFundo);
  };

  const renderTelaInicial = () => (
    <View style={[styles.tela, { backgroundColor: "#FFFFFF" }]}>
      <Text style={styles.titulo}>Adivinha quem eu sou?</Text>
      <Text style={styles.instrucao}>
        Instruções: incline o celular para frente para trocar a palavra
      </Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => definirTelaInicial(false)}
      >
        <Text style={styles.textoBotao}>Começar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPermissao = () => (
    <View style={[styles.tela, { backgroundColor: "#FFFFFF" }]}>
      <Text style={styles.titulo}>Permitir uso do sensor?</Text>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => definirPermiteSensor(true)}
      >
        <Text style={styles.textoBotao}>Permitir</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPalavra = () => (
    <View style={[styles.tela, { backgroundColor: corFundo }]}>
      <Text style={[styles.palavra, { color: corTexto }]}>{palavra}</Text>
    </View>
  );

  if (telaInicial) return renderTelaInicial();
  if (!permiteSensor) return renderPermissao();
  return renderPalavra();
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  palavra: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },

  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  instrucao: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },

  botao: {
    backgroundColor: "#CF3A69",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
