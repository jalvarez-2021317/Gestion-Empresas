//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Empresa = require('../models/empresa');


const getEmpresas = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaEmpresas = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
    ]);

    res.json({
        msg: 'GET API de Empresas',
        listaEmpresas
    });

}

const postEmpresas = async (req = request, res = response) => {

    const { nombre, correo, password, tipo } = req.body;
    const empresaDB = new Empresa({ nombre, correo, password, tipo });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    empresaDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await empresaDB.save();

    res.status(201).json({
        msg: 'POST API de Empresa',
        empresaDB
    });

}

const putEmpresas = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, tipo, estado, ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const empresaEditada = await Empresa.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        empresaEditada
    });

}


const deleteEmpresa = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const empresaEliminada = await Empresa.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de Empresa',
        empresaEliminada
    });

}



module.exports = {
    getEmpresas,
    postEmpresas,
    putEmpresas,
    deleteEmpresa
}