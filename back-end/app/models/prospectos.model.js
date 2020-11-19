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
        id_documento: {
            type: Sequelize.INTEGER
        },
        status_prospecto: {
            type: Sequelize.STRING
        }
    });

    return Prospectos
};