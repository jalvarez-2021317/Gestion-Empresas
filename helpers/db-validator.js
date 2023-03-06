const Empresa = require('../models/empresa');
const Municipio = require('../models/municipio');
const Tipo = require('../models/tipo');
const Sucursal = require('../models/sucursal');

//Validamos en contro de la db si ese correo ya existe
const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeUsuario = await Empresa.findOne( { correo } );
    if ( existeEmailDeUsuario) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const esTipoValido = async( tipo = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeRolDB = await Tipo.findOne( { tipo } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ tipo }, no existe en la DB `);
    }
}


const existeUsuarioPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfUser = await Empresa.findById( id );
    if ( !existIdOfUser ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

// const existeCategoriaPorId = async( id ) => {

//     //Verificar si existe el ID
//     const existIdOfCategory = await Municipio.findById( id );
//     if ( !existIdOfCategory ) {
//         throw new Error(`El id: ${id} no existe en la DB`);
//     }

// }


// const existeProductoPorId = async( id ) => {

//     //Verificar si existe el ID
//     const existIdOfProduct = await Producto.findById( id );
//     if ( !existIdOfProduct ) {
//         throw new Error(`El id: ${id} no existe en la DB`);
//     }

// }


module.exports = {
    emailExiste,
    esTipoValido,
    existeUsuarioPorId,
}