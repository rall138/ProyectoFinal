
const navigationTemplate = `

    <ul class="nav justify-content-end">
        <li class="nav-item">
            <a class="nav-link active" onclick="">Productos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" onclick="">Carrito de compras</a>
        </li>
    </ul>

`

const productosTemplate = 
`
    {{#each productos}}
        <img class="card-img-top" style="max-height:60px; max-width:60px;" src={{this.foto}} alt="Card image cap">
        <div class="card" style="width: 18rem; margin: 10px;">
            <div class="card-body">
                <h5 class="card-title">{{this.codigo}}</h5>
                <p class="card-text">{{this.nombre}}</p>
                <a href="#" class="card-link">Modificar</a>
                <a href="#" class="card-link">Eliminar</a>
            </div>
        </div>
    {{/each}}
`

/*
    "id": 1,
    "nombre": "Queso",
    "timestamp": "",
    "descripcion": "Queso de cuartirolo",
    "codigo": "FF001",
    "foto": "https://cdn1.iconfinder.com/data/icons/vegan-flat/340/vegetarian_vegan_cheese_food_meal_snack_no-64.png",
    "precio": "$ 250",
    "stock": "12 kgs"

*/



/* ========================================== CARRITO ========================================== */