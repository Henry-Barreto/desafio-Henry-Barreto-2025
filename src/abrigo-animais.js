class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    this.brinquedosValidos = new Set([
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE",
    ]);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const lista = [];
      const adotadosPessoa1 = [];
      const adotadosPessoa2 = [];

      // 🔹 Parse das entradas
      const brinquedos1 = brinquedosPessoa1
        ? brinquedosPessoa1.split(",").map((b) => b.trim())
        : [];
      const brinquedos2 = brinquedosPessoa2
        ? brinquedosPessoa2.split(",").map((b) => b.trim())
        : [];
      const animaisOrdem = ordemAnimais
        ? ordemAnimais.split(",").map((a) => a.trim())
        : [];

      // 🔹 Validação de duplicados
      if (new Set(animaisOrdem).size !== animaisOrdem.length) {
        return { erro: "Animal inválido" };
      }
      if (new Set(brinquedos1).size !== brinquedos1.length ||
          new Set(brinquedos2).size !== brinquedos2.length) {
        return { erro: "Brinquedo inválido" };
      }

      // 🔹 Validação de nomes
      for (const animal of animaisOrdem) {
        if (!this.animais[animal]) {
          return { erro: "Animal inválido" };
        }
      }
      for (const b of [...brinquedos1, ...brinquedos2]) {
        if (!this.brinquedosValidos.has(b)) {
          return { erro: "Brinquedo inválido" };
        }
      }

      // 🔹 Função auxiliar para verificar se brinquedos aparecem na ordem
      const contemSubsequencia = (lista, alvo) => {
        let i = 0;
        for (const item of lista) {
          if (item === alvo[i]) {
            i++;
            if (i === alvo.length) return true;
          }
        }
        return i === alvo.length;
      };

      // 🔹 Verificar cada animal
      for (const animalNome of animaisOrdem) {
        const { tipo, brinquedos } = this.animais[animalNome];

        let pode1 = false;
        let pode2 = false;

        if (animalNome === "Loco") {
          // Loco aceita qualquer ordem, só precisa companhia
          pode1 = brinquedos.every((b) => brinquedos1.includes(b));
          pode2 = brinquedos.every((b) => brinquedos2.includes(b));
          if (pode1 && adotadosPessoa1.length === 0) pode1 = false;
          if (pode2 && adotadosPessoa2.length === 0) pode2 = false;
        } else {
          pode1 = contemSubsequencia(brinquedos1, brinquedos);
          pode2 = contemSubsequencia(brinquedos2, brinquedos);
        }

        let destino = "abrigo";

        if (pode1 && !pode2 && adotadosPessoa1.length < 3) {
          destino = "pessoa 1";
          adotadosPessoa1.push(animalNome);
        } else if (pode2 && !pode1 && adotadosPessoa2.length < 3) {
          destino = "pessoa 2";
          adotadosPessoa2.push(animalNome);
        } else if (pode1 && pode2) {
          // ambos podem adotar => vai pro abrigo
          destino = "abrigo";
        }

        lista.push(`${animalNome} - ${destino}`);
      }

      // 🔹 Retorno ordenado alfabeticamente
      return { lista: lista.sort(), erro: null };
    } catch (e) {
      return { erro: "Erro inesperado" };
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
