'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    
        return queryInterface.bulkInsert('usuarios', [{
            rol_id: 1,
            nombre: 'Ildemaro',
            apellido: 'Primera',
            username: 'admin',
            password: 'admin',
            email: 'ildeprimera@gmail.com',
            createdAt: 'now()'
        },{
            rol_id: 2,
            nombre: 'Antony',
            apellido: 'Carrizo',
            username: 'coordinador',
            password: 'coordinador',
            email: 'antony@gmail.com',
            createdAt: 'now()'
        },{
            rol_id: 3,
            nombre: 'Israel',
            apellido: 'Lugo',
            username: 'analista',
            password: 'analista',
            email: 'israel@gmail.com',
            createdAt: 'now()'
        },{
            rol_id: 4,
            nombre: 'Daniel',
            apellido: 'Bonalde',
            username: 'usuario',
            password: 'usuario',
            email: 'daniel@gmail.com',
            createdAt: 'now()'
        }], {});
    
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('usuarios', null, {});

    }
}
