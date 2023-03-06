const { Router } = require('express');
const { check } = require('express-validator');
const { getSucursales, postSucursales, putSucursal, deleteSucursal } = require('../controllers/sucursales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getSucursales);

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    validarCampos
] , postSucursales);


router.put('/editar/:id',[
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    
    validarCampos
], putSucursal);


router.delete('/eliminar/:id', [
    validarJWT,
  
    check('id', 'No es un ID valido').isMongoId(),
    
    validarCampos
] ,deleteSucursal);


module.exports = router;
