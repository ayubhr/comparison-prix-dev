module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", products.create);

  // how many products
  router.get("/count", products.count);
  // Retrieve all published Tutorials
  router.get("/published", products.findAllPublished);
  // find by brand
  router.get("/:brand", products.findByBrand);
  // search by name
  router.get("/search", products.search);

  // Retrieve a single Tutorial with id
  router.get("/:id", products.findOne);

  // Update a Tutorial with id
  router.put("/:id", products.update);

  // Delete a Tutorial with id
  router.delete("/:id", products.delete);

  // Create a new Tutorial
  router.delete("/", products.deleteAll);

  router.get("/productdetail", products.productsDetail);

  // Retrieve all Tutorials
  router.get("/", products.getAll);

  app.use("/api/products", router);
};
