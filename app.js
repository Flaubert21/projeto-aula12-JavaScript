 let catalogo = [
    { titulo: "Dom Casmurro", autor: "Machado de Assis", genero: "Romance", ano: 1899, avaliacoes: [5, 4] },
    { titulo: "1984", autor: "George Orwell", genero: "Ficção", ano: 1949, avaliacoes: [5, 5, 4] }
  ];

  function exibirLivros(livros = catalogo) {
    const lista = document.getElementById("listaLivros");
    lista.innerHTML = "";

    livros.forEach((livro, index) => {
      const media = calcularMedia(livro.avaliacoes);
      lista.innerHTML += `
        <div class="livro">
          <strong>${livro.titulo}</strong> (${livro.ano})<br>
          Autor: ${livro.autor} <br>
          Gênero: ${livro.genero} <br>
          Avaliação média: ${media ? media.toFixed(1) : "Sem avaliação"}<br>
          <input type="number" min="1" max="5" placeholder="Avalie de 1 a 5" id="nota-${index}">
          <button onclick="avaliarLivro(${index})">Avaliar</button>
        </div>
      `;
    });
  }

  function adicionarLivro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const ano = parseInt(document.getElementById("ano").value);

    if (!titulo || !autor || !genero || !ano) {
      alert("Preencha todos os campos!");
      return;
    }

    catalogo.push({ titulo, autor, genero, ano, avaliacoes: [] });
    exibirLivros();
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ano").value = "";
  }

  function buscarLivro() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const resultado = catalogo.filter(livro =>
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo) ||
      livro.genero.toLowerCase().includes(termo)
    );
    exibirLivros(resultado);
  }

  function avaliarLivro(index) {
    const nota = parseInt(document.getElementById(`nota-${index}`).value);
    if (nota >= 1 && nota <= 5) {
      catalogo[index].avaliacoes.push(nota);
      exibirLivros();
    } else {
      alert("Insira uma nota entre 1 e 5.");
    }
  }

  function calcularMedia(avaliacoes) {
    if (avaliacoes.length === 0) return null;
    const soma = avaliacoes.reduce((acc, val) => acc + val, 0);
    return soma / avaliacoes.length;
  }

  exibirLivros();