module.exports = (sequelize, Sequelize) => {
    const Prospectos = sequelize.define("prospectos", {
        nombre: {
            type: Sequelize.STRING
        },
        primer_apellido: {
            type: Sequelize.STRING
        },
        segundo_apellido: {
            type: Sequelize.STRING
        },
        calle: {
            type: Sequelize.STRING
        },
        numero: {
            type: Sequelize.INTEGER
        },
        colonia: {
            type: Sequelize.STRING
        },
        codigo_postal: {
            type: Sequelize.INTEGER
        },
        telefono: {
            type: Sequelize.STRING
        },
        rfc: {
            type: Sequelize.STRING
        },
        nombreDocumento: {
            type: Sequelize.STRING
        },
        dataDocumento: {
            type: Sequelize.BLOB
        },
        status_prospecto: {
            type: Sequelize.STRING
        },
        observaciones: {
            type: Sequelize.STRING
        }
    });

    return Prospectos
};