'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('heredades', [{
            codigo: 'H1',
            nombre: 'Adonai',
            createdAt: 'now()'
        },{
            codigo: 'H2',
            nombre: 'Rafa',
            createdAt: 'now()'
        },{
            codigo: 'H3',
            nombre: 'Sama',
            createdAt: 'now()'
        },{
            codigo: 'H4',
            nombre: 'Shalom',
            createdAt: 'now()'
        },{
            codigo: 'H5',
            nombre: 'Sabaot',
            createdAt: 'now()'
        },{
            codigo: 'H6',
            nombre: 'Tsidkenu',
            createdAt: 'now()'
        },{
            codigo: 'H7',
            nombre: 'Elohim',
            createdAt: 'now()'
        },{
            codigo: 'H8',
            nombre: 'Elyon',
            createdAt: 'now()'
        },{
            codigo: 'H9',
            nombre: 'Shaddai',
            createdAt: 'now()'
        },{
            codigo: 'H10',
            nombre: 'Jireh',
            createdAt: 'now()'
        },{
            codigo: 'H11',
            nombre: 'Raah',
            createdAt: 'now()'
        },{
            codigo: 'H12',
            nombre: 'Nissi',
            createdAt: 'now()'
        }], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('heredades', null, {});

    }
}
