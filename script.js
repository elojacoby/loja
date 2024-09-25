let cartCount = 0;
// inicializa uma variável chamada cartCount e define seu valor inicial como 0. Essa variável armazenará o número atual de itens no carrinho de compras.

//let: let é usada para declarar uma variável dentro do escopo atual. Neste caso, cartCount é declarada como uma variável local dentro do script.
// Função para carregar a contagem do carrinho ao abrir a página


function loadCartCount() {
    //define uma função chamada loadCartCount(). Esta função é responsável por recuperar os dados do carrinho de compras do armazenamento local e atualizar a contagem do carrinho exibida na página.
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    //Objetivo: Esta linha recupera os itens do carrinho de compras do armazenamento local e os armazena em uma variável chamada cartItems.
//const: const declara uma variável que tem o objetivo de armazenar um valor constante. Isso significa que o valor de cartItems não pode ser alterado posteriormente.

//localStorage.getItem('cart'): Isso recupera o valor associado à chave "cart" do armazenamento local do navegador. Supõe-se que os dados do carrinho sejam armazenados no armazenamento local como uma string JSON.

//JSON.parse(...): Isso converte a string recuperada do armazenamento local de volta para um objeto JavaScript, usando a função JSON.parse().

//|| []: Este é um operador OR lógico. Ele verifica se o resultado de JSON.parse(localStorage.getItem('cart')) é um valor verdadeiro (não nulo ou indefinido). Se não for verdadeiro, ele atribui um array vazio ([]) a cartItems. Isso garante que cartItems sempre contenha um array JavaScript válido, mesmo que não haja dados do carrinho no armazenamento local.
    cartCount = cartItems.length;
    //Objetivo: Esta linha atualiza a variável cartCount para corresponder ao número de itens no array cartItems.
    //cartItems.length: Esta propriedade do array cartItems retorna o número de elementos (itens) presentes no array.


    document.getElementById('cart-count').innerText = cartCount;
    //Esta linha atualiza o conteúdo de texto de um elemento HTML com a cartCount atual.

//document.getElementById('cart-count'): Isso seleciona o elemento HTML com o id "cart-count".um elemento de espaço reservado onde vai exibir a contagem do carrinho.

//innerText = cartCount: define o conteúdo de texto do elemento HTML selecionado para o valor de cartCount.
}

// Função para adicionar ao carrinho
function addToCart(productName, price, imageSrc) {
    cartCount++;
    //Define o texto do elemento HTML com o ID cart-count para o valor atualizado de cartCount
    document.getElementById('cart-count').innerText = cartCount;

    // Obter o carrinho atual do localStorage
    //localStorage.getItem('cart') busca o valor associado à chave 'cart' no localStorage do navegador.
//JSON.parse(...) converte a string JSON recuperada do localStorage em um objeto JavaScript.
//|| [] garante que cart seja sempre um array, mesmo que não haja itens no localStorage (cria um array vazio).
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Adicionar o novo item ao carrinho
    // Cria um objeto com as informações do produto (name, price, image) e o adiciona ao array cart usando push().
    cart.push({ name: productName, price: price, image: imageSrc });

    // Salvar o carrinho atualizado no localStorage
    //JSON.stringify(cart) converte o array cart de volta para uma string JSON.
//localStorage.setItem('cart', ...) salva o array cart como uma string JSON no localStorage com a chave 'cart'.

    localStorage.setItem('cart', JSON.stringify(cart));


//Mostra uma mensagem de alerta ao usuário informando que o produto foi adicionado ao carrinho.
    alert(`${productName} foi adicionado ao carrinho!`);
}

// Função para remover todos os itens do carrinho
function clearCart() {
    // Limpar o carrinho do localStorage
    //Essa linha remove a entrada associada à chave 'cart' do localStorage. Isso efetivamente apaga os dados do carrinho armazenados no navegador.
    localStorage.removeItem('cart');

    // Atualizar a contagem do carrinho para zero
    cartCount = 0;

    //Define o texto do elemento HTML com ID cart-count para 0, refletindo na página o carrinho vazio.
    document.getElementById('cart-count').innerText = cartCount;

    // Recarregar o carrinho para refletir as mudanças
   // Chama a função loadCart(),para atualizar a exibição do carrinho na página. Isso garante que qualquer elemento HTML que exiba o conteúdo do carrinho seja atualizado para o estado vazio do carrinho.
    loadCart();
}

function loadCart() {
    //localStorage.getItem('cart') busca a string JSON que representa o carrinho do localStorage.
//JSON.parse(...) converte a string JSON em um array JavaScript de objetos cartItems.
//|| [] garante que cartItems seja sempre um array, mesmo que não haja dados no localStorage.
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Essa linha seleciona o elemento HTML com o ID cart-items,  um elemento <div> onde o conteúdo do carrinho será exibido.
    const cartItemsContainer = document.getElementById('cart-items');

    // Essa linha seleciona o elemento HTML com o ID cart-total, um elemento <div> onde o valor total do carrinho será mostrado.
    const cartTotalContainer = document.getElementById('cart-total');
    let total = 0;

    //Se o carrinho está vazio
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.<br>Adicione algo!</p>";
        cartTotalContainer.innerHTML = "Total: R$ 0,00";
    } else {

        //Limpa o conteúdo atual do cartItemsContainer para evitar duplicação de itens.
        cartItemsContainer.innerHTML = '';

        //itera sobre cada item no array cartItems usando forEach(), obtendo o índice  de cada item
        cartItems.forEach((item, index) => {
            //Cria um novo elemento <div> para representar cada item do carrinho.
            const itemElement = document.createElement('div');

            //Adiciona uma classe CSS cart-item ao elemento para aplicar estilos específicos aos itens do carrinho.
            itemElement.classList.add('cart-item');

            // Adicionar a imagem, nome, preço e botão de remover
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotalContainer.innerHTML = `Total: R$ ${total.toFixed(2)}`;

    }

    //Define o conteúdo de cartTotalContainer para um elemento <h3> que exibe a frase "Total: R$ [valor total]", formatando o total com duas casas decimais.
}

function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];


    //splice(index, 1) remove um item do array cartItems a partir do índice especificado index. O segundo argumento 1 indica que apenas um item deve ser removido.
    cartItems.splice(index, 1);

    // Atualizar o localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Atualizar a contagem do carrinho
    cartCount = cartItems.length;

    //Define o texto do elemento HTML com ID cart-count para o valor cartCount, atualizando a contagem de itens no carrinho na página.
    document.getElementById('cart-count').innerText = cartCount;

    // Recarregar o carrinho
    loadCart();
}

document.getElementById('search').addEventListener('input', function() {
    let searchValue = this.value.toLowerCase(); // Pega o valor da pesquisa e converte para minúsculas
    let products = document.querySelectorAll('#products .product'); // Seleciona todos os produtos

    products.forEach(function(product) {
        let productName = product.getAttribute('data-name').toLowerCase(); // Pega o nome do produto e converte para minúsculas
        if (productName.includes(searchValue)) {
            product.style.display = 'block'; // Exibe o produto se corresponder à pesquisa
        } else {
            product.style.display = 'none'; // Esconde o produto se não corresponder
        }
    });
});
 

document.getElementById('search-btn').addEventListener('click', function() {
    let searchValue = document.getElementById('search').value.toLowerCase();
    let products = document.querySelectorAll('#products .product');
    let resultsList = document.getElementById('results-list');
    
    // Limpa os resultados anteriores
    resultsList.innerHTML = '';

    // Filtra os produtos e adiciona os correspondentes na nova tela
    products.forEach(function(product) {
        let productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchValue)) {
            let resultItem = document.createElement('div');
            resultItem.textContent = product.getAttribute('data-name');
            resultsList.appendChild(resultItem);
        }
    });

    // Se houver resultados, esconde as divs centro-pagina e informacoes
    if (resultsList.children.length > 0) {
        document.getElementById('centro-pagina').style.display = 'none'; // Esconde a div centro-pagina
        document.getElementById('informacoes').style.display = 'none'; // Esconde a section informacoes
        document.getElementById('search-results').style.display = 'block'; // Mostra a tela de resultados
    } else {
        alert('Nenhum produto encontrado');
    }
});

// Botão de voltar para exibir novamente a página original
document.getElementById('back-btn').addEventListener('click', function() {
    document.getElementById('centro-pagina').style.display = 'block'; // Mostra a div centro-pagina
    document.getElementById('informacoes').style.display = 'block'; // Mostra a section informacoes
    document.getElementById('search-results').style.display = 'none'; // Esconde a tela de resultados
});

function loadWishlist() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistTotalContainer = document.getElementById('wishlist-total');
    let total = 0;

    if (wishlistItems.length === 0) {
        wishlistItemsContainer.innerHTML = "<p>Sua lista de desejos está vazia.<br>Adicione algo!</p>";
        wishlistTotalContainer.innerHTML = "Total: R$ 0,00"; // Limpa o total quando não há itens
    } else {
        wishlistItemsContainer.innerHTML = ''; // Limpa os itens anteriores

        wishlistItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('wishlist-item');

            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="wishlist-item-img">
                <p>${item.name} - R$ ${item.price.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromWishlist(${index})">Remover</button>
            `;
            wishlistItemsContainer.appendChild(itemElement);

            total += item.price;
        });

        wishlistTotalContainer.innerHTML = `Total: R$ ${total.toFixed(2)}`;
    }
}

function removeFromWishlist(index) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    document.getElementById('wishlist-count').innerText = wishlistItems.length;
    loadWishlist();
}

function addToWishlist(name, price, image) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems.push({ name, price, image });
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    document.getElementById('wishlist-count').innerText = wishlistItems.length;
    loadWishlist();
}

window.onload = function() {
    loadWishlist();
};