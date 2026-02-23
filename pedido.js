// pedido.js - Tienda de Productos Ecológicos 🌿

let dayjs = require("dayjs");

// VALORES FIJOS
const IVA = 0.21;
let DESCUENTO = 0.05;
let LIMITE_DESCUENTO = 100;
let DIAS_ENTREGA = 3;
let STOCK_MINIMO = 1;

// DATOS DEL PEDIDO
let nombreCliente = "ana garcía";
let productos = [
  { nombre: "Jabón natural",    precio: 8.50,  cantidad: 3, fragil: false },
  { nombre: "Vaso de cristal",  precio: 12.00, cantidad: 2, fragil: true  },
  { nombre: "Aceite de oliva",  precio: 6.75,  cantidad: 0, fragil: false },
];

// NORMALIZAR NOMBRE
let nombreNormalizado = nombreCliente.toUpperCase();

// COMPROBAR STOCK Y CALCULAR SUBTOTAL
console.log("\n====================================");
console.log("   🔍 COMPROBACIÓN DE STOCK");
console.log("====================================");

let subtotal = 0;
let hayFragiles = false;
let productosSinStock = [];

for (let producto of productos) {
  if (producto.cantidad >= STOCK_MINIMO) {
    let precioLinea = producto.precio * producto.cantidad;
    subtotal += precioLinea;
    if (producto.fragil) hayFragiles = true;
    console.log(`✅ ${producto.nombre} - ${producto.cantidad} ud x ${producto.precio.toFixed(2)}€ = ${precioLinea.toFixed(2)}€`);
  } else {
    productosSinStock.push(producto.nombre);
    console.log(`❌ ${producto.nombre} - SIN STOCK`);
  }
}

// DESCUENTO
let subtotalConDescuento;

if (subtotal > LIMITE_DESCUENTO) {
  subtotalConDescuento = subtotal * (1 - DESCUENTO);
  console.log(`\n💸 Descuento del 5% aplicado por superar ${LIMITE_DESCUENTO}€`);
} else {
  subtotalConDescuento = subtotal;
  console.log(`\nℹ️  Sin descuento (compra menor a ${LIMITE_DESCUENTO}€)`);
}

// TOTAL CON IVA
let totalFinal = subtotalConDescuento * (1 + IVA);

// FECHA DE ENTREGA
let fechaHoy = dayjs();
let fechaEntrega = fechaHoy.add(DIAS_ENTREGA, "day").format("DD/MM/YYYY");

// RESUMEN FINAL
console.log("\n====================================");
console.log("   🌿 RESUMEN DEL PEDIDO 🌿");
console.log("====================================");
console.log(`👤 Cliente:             ${nombreNormalizado}`);
console.log(`⚠️  Productos frágiles:  ${hayFragiles ? "SÍ - Embalaje especial" : "NO"}`);

if (productosSinStock.length > 0) {
  console.log(`🚫 Sin stock:           ${productosSinStock.join(", ")}`);
}

console.log("------------------------------------");
console.log(`💶 Subtotal:            ${subtotal.toFixed(2)} €`);
console.log(`💸 Subtotal c/dto:      ${subtotalConDescuento.toFixed(2)} €`);
console.log(`🧾 IVA (21%):           ${(totalFinal - subtotalConDescuento).toFixed(2)} €`);
console.log(`✅ TOTAL FINAL:         ${totalFinal.toFixed(2)} €`);
console.log("------------------------------------");
console.log(`📦 Fecha de entrega:    ${fechaEntrega}`);
console.log("====================================\n");