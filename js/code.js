let productosTienda = [{
        id: 1,
        nombre: "chocorramo",
        categoria: "ponque",
        precio: 1000,
        proveedor: "Ramo",
        imagen: "https://www.larebajavirtual.com/images/productos/sii/F/300x300/chocoramo-26375-1563547527.png"
    },
    {
        id: 2,
        nombre: "coca cola",
        categoria: "gaseosa",
        precio: 4500,
        proveedor: "Cocacola company",
        imagen: "https://s1.eestatic.com/2017/06/28/cocinillas/cocinillas_227241432_116356253_1706x960.jpg"
    },
    {
        id: 3,
        nombre: "gelatina",
        categoria: "postre",
        precio: 700,
        proveedor: "pepito gelatina",
        imagen: "https://saborgourmet.com//wp-content/uploads/como-hacer-gelatina.jpg"
    },
    {
        id: 4,
        nombre: "perro caliente",
        categoria: "comida rapida",
        precio: 5000,
        proveedor: "perritos luna",
        imagen: "https://cnnespanol.cnn.com/wp-content/uploads/2021/08/CNN-hotdog.jpeg?quality=100&strip=info"
    },
    {
        id: 5,
        nombre: "colombiana",
        categoria: "gaseosa",
        precio: 3200,
        proveedor: "Postobon",
        imagen: "https://mercaldas.vteximg.com.br/arquivos/ids/184332-1300-1300/Gaseosa-POSTOBON-Colombiana-Botella-X15Lts.jpg?v=637012447025500000"
    },
    {
        id: 6,
        nombre: "Trident",
        categoria: "Confiteria",
        precio: 100,
        proveedor: "colombina",
        imagen: "https://jumbocolombiafood.vteximg.com.br/arquivos/ids/3650357-750-750/7506105606077.jpg?v=637401998463170000"
    },
    {
        id: 7,
        nombre: "Club colombia",
        categoria: "Cerveza",
        precio: 3000,
        proveedor: "Bavaria",
        imagen: "https://jumbocolombiafood.vteximg.com.br/arquivos/ids/3721413-1000-1000/7702004003539.jpg?v=637578058575900000"
    }
]



function formato_decimal(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

let contenedor_productos = document.getElementById("mis_productos")


for (const iteracion of productosTienda) {
    contenedor_productos.innerHTML += `
    <div class="col">
        <div class="card">
            <img src="${iteracion.imagen}" class="card-img-top w-100 img-producto" alt="...">
                <div class="card-body d-flex justify-content-center align-items-center flex-column">
                    <h5 class="card-title">${iteracion.nombre}</h5>
                    <h6 class="fw-bold">$${formato_decimal(iteracion.precio)}</h6>
                    <p class="fw-bold card-text">${iteracion.proveedor}</p>
                    <button type="button" class="btn btn-dark" onclick="agregar_producto_carrito( '${iteracion.nombre}', ${iteracion.precio})">Agregar al carrito</button>
                </div>
        </div>
    </div>
    `
}

class CarritoCompras {
    constructor() {
        this.productos = []
    }

    nuevo_producto(producto_nuevo) {
        if (this.productos[0] == undefined) {
            this.productos.push(producto_nuevo)
        } else {
        for (let i = 0; i < this.productos.length; i++ ) {
            if (this.productos[i].nombre == producto_nuevo.nombre) {
                this.productos[i].cantidad ++
                break
            } else if (i+1 == this.productos.length) {
                this.productos.push(producto_nuevo)
                break
            }
    }
}
        localStorage.setItem('productostotales', JSON.stringify(this.productos))
        return this.productos
    }

    precio_total() {
        let total_cuenta = 0
        let listaCarrito = []
        this.productos.forEach(function(data_producto) {
            total_cuenta = parseInt(total_cuenta) + parseInt(data_producto.precio * data_producto.cantidad)
            listaCarrito.push(data_producto.nombre)
        });
        return total_cuenta  
    }

}
let compras = new CarritoCompras()

function agregar_producto_carrito(nombre_producto, precio_producto) {
    let productoAgregado = { nombre: nombre_producto, precio: precio_producto, cantidad: 1 }
    compras.nuevo_producto(productoAgregado)
    let listado_agregados = localStorage.getItem('productostotales')
    listado_agregados = JSON.parse(listado_agregados)
    console.log(listado_agregados)
    console.log(listado_agregados.length)
    document.getElementById("total_cuenta_user").innerHTML = formato_decimal(compras.precio_total())
    document.getElementById("listado_carrito").innerHTML =''
    for (const iterador of listado_agregados) {
    document.getElementById("listado_carrito").innerHTML += `
    <tr>
        <th scope="row"><i class="fas fa-trash mx-2" onclick="borrar_elemento()"></i></th>
        <td class='text-center'>${iterador.nombre}</td>
        <td class='text-center'>$${formato_decimal(iterador.precio)}</td>
        <td class='text-center'>${iterador.cantidad}</td>
        <td class='text-center'>
        $${formato_decimal(iterador.precio * iterador.cantidad)}
        </td>

    </tr>
    `
    }
}

