const cheerio = require("cheerio");
const request = require("request");
const express = require("express");
const router = express.Router();
let contador = 0;

const url =
  "https://listado.mercadolibre.com.ar/hogar-muebles-jardin/iluminacion-hogar/lamparas-en-cordoba/lampara-madera_CostoEnvio_Gratis_NoIndex_True#applied_filter_id%3Dshipping_cost_highlighted_free%26applied_filter_name%3DCosto+de+env%C3%ADo%26applied_filter_order%3D3%26applied_value_id%3Dfree%26applied_value_name%3DGratis%26applied_value_order%3D1%26applied_value_results%3D271%26is_custom%3Dfalse";


let obtenerProductos = () => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        let $ = cheerio.load(body);
        let items = [];
        $(".ui-search-layout__item").each(function () {
          let titulo = $(this).find(".ui-search-item__title").text();
          let precio = $(this).find(".ui-search-price__part--medium").text();
          let imagen = $(this)
            .find(".ui-search-result__image img")
            .attr("data-src");
          contador++;

          // Crear un objeto para el elemento actual
          let item = {
            id: contador,
            titulo: titulo,
            precio: precio,
            imagen: imagen,
          };

          // Agregar el objeto al array 'items'
          items.push(item);
        });
        resolve(items);
        contador = 0;
      } else {
        reject(err);
      }
    });
  });
};



router.get("/", async (req, res) => {
  try {
    const respuestaProductos = await obtenerProductos();
    res.json(respuestaProductos);
    items = [];
  } catch (error) {
    res.status(500).json({ error: "Error no se recibio los datos de los productos" });
  }
});

module.exports = router;
