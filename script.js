document.addEventListener("DOMContentLoaded", () => {
    const quadrados = document.querySelectorAll(".quadrado")
    const teclas = document.querySelectorAll(".tecla")
    const btnApagar = document.getElementById("btnApagar")
    const btnConfirmar = document.getElementById("btnConfirmar")

    let linhaAtual = 0
    let colunaAtual = 0


    //
    function adicionarLetra(letra) {
        if (colunaAtual < 5) {
            const index = linhaAtual * 5 + colunaAtual
            quadrados[index].textContent = letra
            colunaAtual++
        }
    }

    //
    function apagarLetra() {
        if (colunaAtual > 0) {
            colunaAtual--
            const index = linhaAtual * 5 + colunaAtual
            quadrados[index].textContent = ""
        }
    }

    //
    function confirmarPalavra() {
        if (colunaAtual === 5) {
        alert("Confirmado!!")
        linhaAtual++
        colunaAtual = 0
        }
        else {
            alert("Complete a palavra antes de confirmar!")
        }
        
    }
    
    //
    teclas.forEach(tecla => {
        tecla.addEventListener("click", () => {
            adicionarLetra(tecla.textContent)
        })
    })

    //
    btnApagar.addEventListener("click", apagarLetra)

    //
    btnConfirmar.addEventListener("click", confirmarPalavra)

    // input do teclado físico
    document.addEventListener("keydown", (event) => {
        const key = event.key.toUpperCase()

        if (/^[A-Z]$/.test(key)) {
            adicionarLetra(key)
        } else if (key === 'BACKSPACE') {
            apagarLetra()
        } else if (key === 'ENTER') {
            confirmarPalavra()
        }
    })
})