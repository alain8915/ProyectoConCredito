const db = require("../models");
const Prospecto = db.prospectos;
const Op = db.Sequelize.Op;

// Create and Save a new Prospecto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "El contenido de los datos del Prospecto no puede estar vació!"
    });
    return;
  }

  // Create a Prospecto
  const Prospecto = {
    nombre: req.body.nombre,  
    primer_apellido: req.body.primer_apellido,
    segundo_apellido: req.body.segundo_apellido ? req.body.segundo_apellido : '' ,
    calle: req.body.calle,
    numero: req.body,numero,
    colonia: req.body.colonia,
    codigo_postal: req.body.codigo_postal,
    telefono: req.body.telefono,
    rfc: req.body.rfc
  };

  // Save Prospecto in the database
  Prospecto.create(Prospecto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error en el guardado de un nuevo prospecto."
      });
    });
};

// Retrieve all Prospectos from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Prospecto.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error al obtener los Prospectos."
      });
    });
};

// Find a single Prospecto with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Prospecto.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Prospecto with id=" + id
      });
    });
};

// Update a Prospecto by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Prospecto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El prospecto fue actualizado correctamente."
        });
      } else {
        res.send({
          message: `Cannot update Prospecto with id=${id}. Maybe Prospecto was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Prospecto with id=" + id
      });
    });
};

// Delete a Prospecto with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Prospecto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Prospecto was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Prospecto with id=${id}. Maybe Prospecto was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Prospecto with id=" + id
      });
    });
};

// Delete all Prospectos from the database.
exports.deleteAll = (req, res) => {
  Prospecto.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Prospectos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Prospectos."
      });
    });
};

// find all published Prospecto
exports.findAllPublished = (req, res) => {
  Prospecto.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Prospectos."
      });
    });
};
