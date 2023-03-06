//Importacion
const { response, request } = require('express');

//Modelos
const Sucursal = require('../models/sucursal');


const getSucursales = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaSucursales = await Promise.all([
        Sucursal.countDocuments(query),
        Sucursal.find(query)
    ]);

    res.json({
        msg: 'GET API de Empresas',
        listaSucursales
    });

}

const postSucursales = async (req = request, res = response) => {

    const { nombre, municipio, direccion, telefono, empresa } = req.body;
    const sucursalDB = new Sucursal({ nombre, municipio, direccion, telefono, empresa });



    //Guardar en Base de datos
    await sucursalDB.save();

    res.status(201).json({
        msg: 'POST API de Empresa',
        sucursalDB
    });

}

const putSucursal = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, estado, ...resto } = req.body;


    //editar y guardar
    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        sucursalEditada
    });

}


const deleteSucursal = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de Empresa',
        sucursalEliminada
    });

}



module.exports = {
    getSucursales,
    postSucursales,
    putSucursal,
    deleteSucursal
}