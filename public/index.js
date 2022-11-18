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
const modificarProductoTemplate = 
`
    {{#each productos}}
        <div style="background-color:gray; margin-top: 30px; padding:20px;">
            <img class="card-img-top" style="max-height:60px; max-width:60px;" src={{this.foto}} alt="Card image cap">
            <div class="card" style="width: 48rem;">
                <div class="card-body">
                    
                    <form onsubmit="return modificar(this)" class="">

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
                
                        <input type="submit" class="btn btn-primary" value="Confirmar" />
                
                    </form>

                </div>
            </div>
        </div>
    {{/each}}
`

fetch('http://localhost:8080/api/productos')
.then(result =>  result.json())
.then(fetchData => {
    const template = Handlebars.compile(modificarProductoTemplate)
    const html = template({productos: fetchData})
    document.getElementsByTagName('span')[0].innerHTML = html
})

const modificar = (e) => {

    const producto = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value,
        timestamp: Date.now(),
        descripcion: document.getElementById('descripcion').value,
        codigo: document.getElementById('codigo').value,
        foto: document.getElementById('foto').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value
    }

    console.log(JSON.stringify(producto))
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