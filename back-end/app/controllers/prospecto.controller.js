const db = require("../models");
const Prospecto = db.prospectos;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo Prospecto
exports.create = (req, res) => {
  // Validando la peticion
  if (!req.body) {
    res.status(400).send({
      message: "El contenido de los datos del prospecto no puede estar vació!"
    });
    return;
  }

  // Creando el objeto prospecto para el guardado en la BD
  const prospecto = {
    nombre: req.body.nombre,  
    primer_apellido: req.body.primer_apellido,
    segundo_apellido: req.body.segundo_apellido ? req.body.segundo_apellido : '' ,
    calle: req.body.calle,
    numero: req.body.numero,
    colonia: req.body.colonia,
    codigo_postal: req.body.codigo_postal,
    telefono: req.body.telefono,
    rfc: req.body.rfc,
    status_prospecto: 'Enviado',
    observaciones: ''
  };

  // Guardando el objeto prospecto en la BD
  Prospecto.create(prospecto)
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

// Obtener todos los prospectos de la BD.
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
          err.message || "Ocurrió un error al obtener los Prospectos."
      });
    });
};

// Buscar un prospecto con base a su ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Prospecto.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error en la busqueda de prospecto con ID=" + id
      });
    });
};

// Actualiza un prospecto tomando su ID de la petición
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
          message: `No se puede actualizar el prospecto con id=${id}. Tal vez el prospecto no se encuentra registrado o la petición esta vaciá!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando el prospecto con id=" + id
      });
    });
};

// Eliminando un prospecto con ID especificado en la petición
exports.delete = (req, res) => {
  const id = req.params.id;

  Prospecto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El prospecto fue eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el prospecto con id=${id}. Tal vez el prospecto no se encontró!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrio un error al eliminar el prospecto con id=" + id
      });
    });
};

// Elimina todos los prospectos de la BD.
exports.deleteAll = (req, res) => {
  Prospecto.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Los prospectos fueron eliminados satisfactoriamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrio un error mientras se eliminaban los prospectos."
      });
    });
};

// find all published Prospecto
/* exports.findAllPublished = (req, res) => {
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
}; */
