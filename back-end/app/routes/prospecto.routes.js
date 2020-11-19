module.exports = app => {
  const prospecto = require("../controllers/prospecto.controller.js");

  var router = require("express").Router();

  // Create a new Prospecto
  router.post("/", prospecto.create);

  // Retrieve all prospecto
  router.get("/", prospecto.findAll);

  // Retrieve all published prospecto
  router.get("/published", prospecto.findAllPublished);

  // Retrieve a single Prospecto with id
  router.get("/:id", prospecto.findOne);

  // Update a Prospecto with id
  router.put("/:id", prospecto.update);

  // Delete a Prospecto with id
  router.delete("/:id", prospecto.delete);

  // Delete all prospecto
  router.delete("/", prospecto.deleteAll);

  app.use('/api/prospecto', router);
};
