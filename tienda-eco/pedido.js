// pedido.js - Tienda de Productos Ecológicos 🌿

let dayjs = require("dayjs");

// VALORES FIJOS
const IVA = 0.21;
let porcentajeDescuento = 0.05;
let LIMITE_DESCUENTO = 100;
let DIAS_ENTREGA = 3;

// DATOS DEL PEDIDO
let nombreCliente = "ana garcía";
let productosLista = [
  { nombre: "Jabón natural",   precio: 8.50,  cantidad: 3, fragil: false },
  { nombre: "Vaso de cristal", precio: 12.00, cantidad: 2, fragil: true  },
  { nombre: "Aceite de oliva", precio: 6.75,  cantidad: 2, fragil: false },
];

// NORMALIZAR NOMBRE
let clienteNormalizado = nombreCliente.toUpperCase();

// COMPROBAR STOCK Y CALCULAR SUBTOTAL
let subtotal = 0;
let tieneFragil = false;
let productos = [];

for (let producto of productosLista) {
  if (producto.cantidad >= 1) {
    subtotal += producto.precio * producto.cantidad;
    if (producto.fragil) tieneFragil = true;
    productos.push(producto.nombre);
  }
}

// DESCUENTO
let subtotalConDescuento;

if (subtotal > LIMITE_DESCUENTO) {
  subtotalConDescuento = subtotal * (1 - porcentajeDescuento);
} else {
  subtotalConDescuento = subtotal;
  porcentajeDescuento = 0;
}

// TOTAL CON IVA
let total = subtotalConDescuento * (1 + IVA);

// FECHA DE ENTREGA
let fechaEntrega = dayjs().add(DIAS_ENTREGA, "day").format("DD/MM/YYYY");

// ==========================================
const resumenPedido = `
=========================================
🌱 TIENDA ECO - RESUMEN DEL PEDIDO 🌱
=========================================
👤 Cliente:          ${clienteNormalizado}
📦 Productos:        ${productos.join(", ")}
⚠️  ¿Contiene frágiles?: ${tieneFragil ? "Sí (Se requiere embalaje especial)" : "No"}

--- Desglose de Facturación ---
Subtotal inicial:         ${subtotal.toFixed(2)}€
Descuento aplicado:       ${porcentajeDescuento * 100}%
Subtotal tras descuento:  ${subtotalConDescuento.toFixed(2)}€
Impuestos (IVA 21%):      ${(subtotalConDescuento * IVA).toFixed(2)}€
-----------------------------------------
💶 TOTAL A PAGAR:         ${total.toFixed(2)}€
=========================================
🚚 Fecha estimada de entrega: ${fechaEntrega}
=========================================
`;

console.log(resumenPedido);