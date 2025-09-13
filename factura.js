// Suponiendo que tienes una variable ventaActual ya con los datos de la venta
const URL_APPSCRIPT_FACTURA = "https://script.google.com/macros/s/AKfycbyg1xFqs3sfeNIewBOCpoin20Bjoe19w9jqvByZ7ew7CqdILEYV2PDY50Of1GBniOLN/exec";

function mostrarBotonFacturar(venta) {
  const btnFacturar = document.getElementById('btn-facturar');
  if (venta.Factura) {
    btnFacturar.style.display = 'none';
  } else {
    btnFacturar.style.display = 'block';
    btnFacturar.onclick = async function() {
      btnFacturar.disabled = true;
      const payload = {
        TipoRegistro: 'FacturarVenta',
        NoVenta: venta["No Venta"],
        Caja: venta.Caja
      };
      const resp = await fetch(URL_APPSCRIPT_FACTURA, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (data.ok) {
        btnFacturar.style.display = 'none';
        // Recarga los datos de la venta para mostrar la factura
        location.reload(); // O vuelve a consultar ventas y actualiza la impresión
      } else {
        alert(data.message);
        btnFacturar.disabled = false;
      }
    };
  }
}
