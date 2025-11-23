// --- storage.js ---
// Banco de dados com PREÇOS REAIS e LINKS DE CAPAS

const CHAVE_BANCO = 'livrosEcoLivros';

const dadosIniciais = [
    // === BIOGRAFIAS ===
    { 
        id: 1, titulo: "Steve Jobs", autor: "Walter Isaacson", 
        precoOriginal: 89.90, preco: 45.00, // Desconto de ~50%
        genero: "Biografia", estado: "Seminovo", 
        sinopse: "A biografia exclusiva do criador da Apple, baseada em mais de quarenta entrevistas.",
        imagem: "https://m.media-amazon.com/images/I/41yJ75gpV-L._SY445_SX342_.jpg" 
    },
    { 
        id: 2, titulo: "Frida: A biografia", autor: "Hayden Herrera", 
        precoOriginal: 94.90, preco: 35.00, 
        genero: "Biografia", estado: "Usado - Bom", 
        sinopse: "A história da pintora mexicana que se tornou um ícone mundial de arte e superação.",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKHUiAH_Fne4MmfBkTCWnn0BfK3yTDDoup8Q&s" 
    },
    { 
        id: 3, titulo: "Minha História", autor: "Michelle Obama", 
        precoOriginal: 79.90, preco: 55.00, 
        genero: "Biografia", estado: "Novo", 
        sinopse: "Um relato íntimo e inspirador da ex-primeira-dama dos Estados Unidos.",
        imagem: "https://i.ebayimg.com/images/g/iScAAOSwuWxkEaL8/s-l1600.webp" 
    },

    // === CLÁSSICOS E ROMANCES ===
    { 
        id: 4, titulo: "Dom Casmurro", autor: "Machado de Assis", 
        precoOriginal: 39.90, preco: 12.00, 
        genero: "Clássico", estado: "Usado - Aceitável", 
        sinopse: "A dúvida de Bentinho: Capitu traiu ou não traiu? Um clássico da literatura brasileira.",
        imagem: "https://m.media-amazon.com/images/I/41897yAI4LL._SY445_SX342_.jpg" 
    },
    { 
        id: 5, titulo: "A Hora da Estrela", autor: "Clarice Lispector", 
        precoOriginal: 44.90, preco: 22.00, 
        genero: "Clássico", estado: "Usado - Bom", 
        sinopse: "A história de Macabéa, uma nordestina ingênua que luta para sobreviver no Rio de Janeiro.",
        imagem:"https://images.tcdn.com.br/img/img_prod/980922/hora_da_estrela_a_96493_1_ac1499380ba6253537a9ba859b58e7db.jpg" 
    },
    { 
        id: 6, titulo: "Orgulho e Preconceito", autor: "Jane Austen", 
        precoOriginal: 59.90, preco: 38.00, 
        genero: "Romance", estado: "Seminovo", 
        sinopse: "Elizabeth Bennet enfrenta o orgulho e o preconceito da sociedade para encontrar o amor.",
        imagem: "https://m.media-amazon.com/images/I/719esIW3D7L.jpg" 
    },
    { 
        id: 7, titulo: "Senhora", autor: "José de Alencar", 
        precoOriginal: 35.00, preco: 10.00, 
        genero: "Romance", estado: "Usado - Antigo", 
        sinopse: "Aurélia Camargo usa sua riqueza para 'comprar' o marido que a desprezou quando pobre.",
        imagem: "https://m.media-amazon.com/images/I/711tJRe6LML._AC_UF1000,1000_QL80_.jpg" 
    },

    // === FICÇÃO ===
    { 
        id: 8, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", 
        precoOriginal: 69.90, preco: 45.00, 
        genero: "Ficção", estado: "Seminovo", 
        sinopse: "A Sociedade do Anel parte em uma jornada para destruir o Um Anel e derrotar Sauron.",
        imagem: "https://m.media-amazon.com/images/I/71ZLavBjpRL._SY425_.jpg" 
    },
    { 
        id: 9, titulo: "1984", autor: "George Orwell", 
        precoOriginal: 49.90, preco: 39.90, 
        genero: "Ficção", estado: "Novo", 
        sinopse: "Uma distopia assustadora sobre vigilância governamental e totalitarismo.",
        imagem: "https://m.media-amazon.com/images/I/91g5gcjTxsL._UF1000,1000_QL80_.jpg" 
    },
    { 
        id: 10, titulo: "Duna", autor: "Frank Herbert", 
        precoOriginal: 119.90, preco: 75.00, 
        genero: "Ficção", estado: "Seminovo", 
        sinopse: "A saga de Paul Atreides no planeta deserto de Arrakis.",
        imagem: "https://m.media-amazon.com/images/I/41MRn6hy8-L._SY445_SX342_.jpg" 
    },
    { 
        id: 11, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", 
        precoOriginal: 64.90, preco: 40.00, 
        genero: "Ficção", estado: "Usado - Capa Dura", 
        sinopse: "O início da jornada do bruxo mais famoso do mundo em Hogwarts.",
        imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_874295-MLU77447335561_072024-F.webp" 
    },
    { 
        id: 12, titulo: "It: A Coisa", autor: "Stephen King", 
        precoOriginal: 109.90, preco: 65.00, 
        genero: "Ficção", estado: "Seminovo", 
        sinopse: "O terror clássico sobre o palhaço Pennywise aterrorizando Derry.",
        imagem: "https://img.btimages.net/td2/A8624.jpg" 
    },

    // === TÉCNICOS E EDUCAÇÃO ===
    { 
        id: 13, titulo: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", 
        precoOriginal: 60.00, preco: 25.00, 
        genero: "Negócios", estado: "Usado - Grifado", 
        sinopse: "O que os ricos ensinam a seus filhos sobre dinheiro que os pobres não ensinam.",
        imagem: "https://cdn.kobo.com/book-images/5a191e3a-70b3-44dc-b951-799b473433f8/180/1000/False/pai-rico-pai-pobre-edicao-atualizada-25-anos.jpg" 
    },
    { 
        id: 14, titulo: "Clean Code", autor: "Robert C. Martin", 
        precoOriginal: 130.00, preco: 95.00, 
        genero: "Tecnologia", estado: "Novo", 
        sinopse: "Habilidades práticas do desenvolvimento ágil de software.",
        imagem: "https://m.media-amazon.com/images/I/71nj3JM-igL._SY522_.jpg" 
    },
    { 
        id: 15, titulo: "Sapiens", autor: "Yuval Noah Harari", 
        precoOriginal: 79.90, preco: 45.00, 
        genero: "História", estado: "Seminovo", 
        sinopse: "Uma breve história da humanidade, da idade da pedra ao século XXI.",
        imagem: "https://m.media-amazon.com/images/I/81BTkpMrLYL._SY522_.jpg" 
    },
    { 
        id: 16, titulo: "Entendendo Algoritmos", autor: "Aditya Bhargava", 
        precoOriginal: 85.00, preco: 60.00, 
        genero: "Tecnologia", estado: "Novo", 
        sinopse: "Um guia ilustrado para programadores e curiosos.",
        imagem: "https://m.media-amazon.com/images/I/71Vkg7GfPFL._SY522_.jpg" 
    },
    { 
        id: 17, titulo: "A Arte da Guerra", autor: "Sun Tzu", 
        precoOriginal: 25.00, preco: 10.00, 
        genero: "Negócios", estado: "Usado - Antigo", 
        sinopse: "Estratégias militares antigas aplicadas ao mundo dos negócios e da vida.",
        imagem: "https://m.media-amazon.com/images/I/71ukZsRFZuL._SY522_.jpg" 
    },
    { 
        id: 18, titulo: "JavaScript: O Guia Definitivo", autor: "David Flanagan", 
        precoOriginal: 220.00, preco: 140.00, 
        genero: "Tecnologia", estado: "Usado - Bom", 
        sinopse: "A referência completa para programadores web.",
        imagem: "https://m.media-amazon.com/images/I/41Mj94QmgtL._SY445_SX342_ControlCacheEqualizer_.jpg" 
    },

    // === OUTROS ===
    { 
        id: 19, titulo: "O Pequeno Príncipe", autor: "Saint-Exupéry", 
        precoOriginal: 29.90, preco: 15.00, 
        genero: "Infantil", estado: "Novo", 
        sinopse: "A clássica história sobre amor, amizade e a essência humana.",
        imagem: "https://m.media-amazon.com/images/I/41afCn3PQUL._SY445_SX342_.jpg" 
    },
    { 
        id: 20, titulo: "O Poder do Hábito", autor: "Charles Duhigg", 
        precoOriginal: 69.90, preco: 35.00, 
        genero: "Autoajuda", estado: "Usado - Bom", 
        sinopse: "Por que fazemos o que fazemos na vida e nos negócios.",
        imagem: "https://livrariascuritiba.vteximg.com.br/arquivos/ids/2021469-1000-1000/LV316499.jpg?v=638548554258800000" 
    }
];

const Storage = {
    lerLivros: function() {
        return dadosIniciais;
    },
    lerLivroPorId: function(id) {
        return dadosIniciais.find(livro => livro.id == id);
    }
};