/* Defino array cart y variable total (de la compra) */

let cart = [];
let total = 0;

/* Constructor Article */

function Article (_id, _category, _subcategory, _brand, _name, _price) {
    this.id = _id;
    this.category = _category;
    this.subcategory = _subcategory;
    this.brand = _brand;
    this.name = _name;
    this.price = _price;
}

/* Funcion ShoppingCart */

function ShoppingCart() {
    this.addArticle = function (articleToPush) {
        cart.push(articleToPush);
    }

    this.removeArticle = function (articleToRemove) {
        let index = cart.indexOf(articleToRemove);
        if (index > -1) {
            cart.splice(index, 1);
        }
    }

    this.cleanCart = function () {
        cart = [];
    }

    this.getArticlesNumber = function () {
        console.log(`Número de artículos: ${cart.length}`)
    }

    this.getProductNames = function () {
        cart.forEach(function(article) {
            console.log(`Marca: ${article.brand} Modelo: ${article.name}`)
        })
    }

    this.getTotal = function () {
        cart.forEach(function(article) {
            total = total + article.price
        })
        console.log(`$ ${total}`)
    }
}


/* Creo variable carrito y articulos */

let carrito = new ShoppingCart();

let bike1 = new Article(1,"Bikes", "MTB", "Scott", "Scale RC 900 WC", 1190430)
let bike2 = new Article(2,"Bikes", "MTB", "Scott", "Spark RC 900 Team AXS", 1109056)
let bike3 = new Article(3,"Bikes", "MTB", "Scott", "Scale RC 900 Team", 678198)

console.log(bike1);
console.log(bike2);
console.log(bike3);


/* Agrego 4 productos al carrito */

carrito.addArticle(bike1);
carrito.addArticle(bike1);
carrito.addArticle(bike2);
carrito.addArticle(bike3);
console.log(cart);

/* Remuevo un producto del carrito */
carrito.removeArticle(bike1);
console.log(cart);

/* Muestro nombre, número de artículos y precio total del carrito */
carrito.getProductNames();
carrito.getArticlesNumber();
carrito.getTotal();

/* Vacìo el carrito */
carrito.cleanCart()
console.log(cart);


