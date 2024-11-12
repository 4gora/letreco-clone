import palavras from "./palavras.js";

document.addEventListener("DOMContentLoaded", () => {
  const quadrados = document.querySelectorAll(".quadrado");
  const teclas = document.querySelectorAll(".tecla");
  const btnApagar = document.getElementById("btnApagar");
  const btnConfirmar = document.getElementById("btnConfirmar");

  let linhaAtual = 0;
  let colunaAtual = 0;

  // style
  let amarelo = "rgb(255, 255, 0)";
  let cinza = "rgb(128, 128, 128)";
  let verde = "rgb(0, 128, 0)";
  let vermelho = "rgb(255, 0, 0)";

  const palavraSecreta =
    palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();

  function adicionarLetra(letra) {
    if (colunaAtual < 5) {
      const index = linhaAtual * 5 + colunaAtual;
      quadrados[index].textContent = letra;
      colunaAtual++;
    }
  }

  function apagarLetra() {
    if (colunaAtual > 0) {
      colunaAtual--;
      const index = linhaAtual * 5 + colunaAtual;
      quadrados[index].textContent = "";
    }
  }

  function confirmarPalavra() {
    if (colunaAtual === 5) {
      const palavraInserida = [];
      for (let i = 0; i < 5; i++) {
        const index = linhaAtual * 5 + i;
        palavraInserida.push(quadrados[index].textContent);
      }

      const letrasCorretas = Array(5).fill(false);
      const letrasUsadas = Array(5).fill(false);

      for (let i = 0; i < 5; i++) {
        const index = linhaAtual * 5 + i;
        if (palavraInserida[i] === palavraSecreta[i]) {
          quadrados[index].style.backgroundColor = verde;
          letrasCorretas[i] = true;
          letrasUsadas[i] = true;
          atualizarTeclado(palavraInserida[i], verde);
        }
      }

      for (let i = 0; i < 5; i++) {
        const index = linhaAtual * 5 + i;
        if (!letrasCorretas[i]) {
          for (let j = 0; j < 5; j++) {
            if (!letrasUsadas[j] && palavraInserida[i] === palavraSecreta[j]) {
              quadrados[index].style.backgroundColor = amarelo;
              letrasUsadas[j] = true;
              atualizarTeclado(palavraInserida[i], amarelo);
              break;
            }
          }
          if (quadrados[index].style.backgroundColor !== amarelo) {
            quadrados[index].style.backgroundColor = vermelho;
            atualizarTeclado(palavraInserida[i], cinza);
          }
        }
      }

      if (palavraInserida.join("") === palavraSecreta) {
        alert("Parabéns! Você acertou a palavra secreta!");
      } else {
        linhaAtual++;
        colunaAtual = 0;
      }
    } else {
      alert("Preencha a linha corretamente antes de confirmar!");
    }
  }

  function atualizarTeclado(letra, cor) {
    teclas.forEach((tecla) => {
      if (tecla.textContent === letra) {
        tecla.style.backgroundColor = cor;
      }
    });
  }

  teclas.forEach((tecla) => {
    tecla.addEventListener("click", () => {
      adicionarLetra(tecla.textContent);
    });
  });

  btnApagar.addEventListener("click", apagarLetra);

  btnConfirmar.addEventListener("click", confirmarPalavra);

  // input do teclado físico
  document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();

    if (/^[A-Z]$/.test(key)) {
      adicionarLetra(key);
    } else if (key === "BACKSPACE") {
      apagarLetra();
    } else if (key === "ENTER") {
      confirmarPalavra();
    }
  });
});
