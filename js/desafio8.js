/* Array de base de datos de productos */

juice
fresh
coffee
wines
oils

let baseDeDatos = [
    {
        id: 10000,
        category: "moist",
        subcategory: "oils",
        brand: "Terra Sana",
        name: "Aceite de Oliva Extra Virgen",
        price: 200,
        image: '../images/index/terrasana/aceiteolivaterrasana.JPG',
    },
    {
        id: 10001,
        category: "moist",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Aceitunas",
        price: 200,
        image: '../images/index/terrasana/aceitunasterrasana.JPG',
    },
    {
        id: 10002,
        category: "moist",
        subcategory: "oils",
        brand: "Terra Sana",
        name: "Aceto Terra Sana",
        price: 200,
        image: '../images/index/terrasana/acetoterrasana.JPG',
    },
    {
        id: 10003,
        category: "dry",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Arroz",
        price: 200,
        image: '../images/index/terrasana/arrozterrasana.JPG',
    },
    {
        id: 10004,
        category: "dry",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Frutos Secos",
        price: 200,
        image: '../images/index/terrasana/frutossecos2terrasana.JPG',
    },
    {
        id: 10005,
        category: "dry",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Frutos Secos - Nueces y Almendras",
        price: 200,
        image: '../images/index/terrasana/frutossecosterrasana.JPG',
    },
    {
        id: 10006,
        category: "dry",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Harina Integral",
        price: 200,
        image: '../images/index/terrasana/harinaintegralterrasana.JPG',
    },
    {
        id: 10007,
        category: "moist",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Miel",
        price: 200,
        image: '../images/index/terrasana/mielterrasana.JPG',
    },
    {
        id: 10008,
        category: "dry",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Pasas de Uva",
        price: 200,
        image: '../images/index/terrasana/pasasdeuvaterrasana.JPG',
    },
    {
        id: 10009,
        category: "dry",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Pasta de Aceitunas",
        price: 200,
        image: '../images/index/terrasana/pastaaceitunasterrasana.JPG',
    },
    {
        id: 10010,
        category: "dry",
        subcategory: "fresh",
        brand: "Terra Sana",
        name: "Quinoa",
        price: 200,
        image: '../images/index/terrasana/quinoaterrasana.JPG',
    },
    {
        id: 10011,
        category: "moist",
        subcategory: "oils",
        brand: "Terra Sana",
        name: "Salsa Picante",
        price: 200,
        image: '../images/index/terrasana/salsapicanteterrasana.JPG',
    },
    {
        id: 10012,
        category: "moist",
        subcategory: "oils",
        brand: "Terra Sana",
        name: "Tomate Orgánico Triturado",
        price: 200,
        image: '../images/index/terrasana/tomateterrasana.JPG',
    },
    {
        id: 10013,
        category: "moist",
        subcategory: "oils",
        brand: "Terra Sana",
        name: "Vinagre",
        price: 200,
        image: '../images/index/terrasana/vinagreterrasana.JPG',
    },
        ];

/* Defino array y variables */
let cart = [];
let total = 0;
let $cardGallery = document.querySelector('#gallery');



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


