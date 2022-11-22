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
    ${navigationTemplate}
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
const modificarProductoTemplate = 
`
    ${navigationTemplate}
    {{#each productos}}
        <button class="btn btn-outline-primary", style='display:block; margin-top:20px;' onclick='mostrarOcultar("div_{{this.id}}")'> Mostrar mas info de {{this.nombre}}</button>
        <div id="div_{{this.id}}" style='display:none'>
            <div style="background-color:gray; margin-top: 30px; padding:20px;">
                <img class="card-img-top" style="max-height:60px; max-width:60px;" src={{this.foto}} alt="Card image cap">
                <div class="card" style="width: 48rem;">
                    <div class="card-body">
                        
                        <form id="form_{{this.id}}" onsubmit="return modificar(this)" class="">

                            <div class="mb-3">
                                <label for="id" class="form-label">Id</label>
                                <input type="text" id="id" class="form-control" name="id" value="{{this.id}}" /><br>
                            </div>

                            <div class="mb-3">
                                <label for="codigo" class="form-label">Código</label>
                                <input type="text" id="codigo" class="form-control" name="codigo" value="{{this.codigo}}" /><br>
                            </div>
                        
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" id="nombre" class="form-control" name="nombre" value="{{this.nombre}}" /><br>
                            </div>

                            <div class="mb-3">
                                <label for="descripcion" class="form-label">descripcion</label>
                                <input type="text" id="descripcion" class="form-control" name="descripcion" value="{{this.descripcion}}" /><br>
                            </div>
                            
                            <div class="mb-3">
                                <label for="precio" class="form-label">Precio</label>
                                <input type="text" id="precio" class="form-control" name="precio" value="{{this.precio}}" /><br>
                            </div>

                            <div class="mb-3">
                                <label for="stock" class="form-label">Stock</label>
                                <input type="text" id="stock" class="form-control" name="stock" value="{{this.stock}}" /><br>
                            </div>

                            <div class="mb-3">
                                <label for="foto" class="form-label">Foto Url</label>
                                <input type="text" id="foto" class="form-control" name="foto" value="{{this.foto}}" /><br>
                            </div>
                    
                            <input type="submit" class="btn btn-primary" value="Confirmar modificación" />
                    
                        </form>

                    </div>
                    <button type='button' onclick='eliminar("form_{{this.id}}")' class='btn btn-danger'>Eliminar</button>
                </div>
            </div>
        </div>
    {{/each}}
`

fetch('http://localhost:8080/api/productos')
.then(result =>  result.json())
.then(fetchData => {
    Handlebars.registerPartial('navigation', '{{nav}}');
    const template = Handlebars.compile(modificarProductoTemplate)
    const html = template({productos: fetchData})
    document.getElementsByTagName('span')[0].innerHTML = html
})

const eliminar = (e) => {
    
    const form = document.getElementById(e)
    const id = form.elements['id'].value
    fetch(`http://localhost:8080/api/productos/${id}`, {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    .then(result =>  result.json())
    .then(fetchData => {console.log(fetchData)})
}

const modificar = (e) => {

    const elements = e.elements

    const producto = {
        id: elements['id'].value,
        nombre: elements['nombre'].value,
        timestamp: Date.now(),
        descripcion: elements['descripcion'].value,
        codigo: elements['codigo'].value,
        foto: elements['foto'].value,
        precio: elements['precio'].value,
        stock: elements['stock'].value
    }

    fetch(`http://localhost:8080/api/productos/${producto.id}`, 
    {
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT', body: JSON.stringify(producto)
    })
    .then(result =>  result.json())
    .then(fetchData => {
        console.log(fetchData)
    })
    return false
}