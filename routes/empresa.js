const { Router } = require('express');
const { check } = require('express-validator');
const { postEmpresas, getEmpresas, putEmpresas, deleteEmpresa } = require('../controllers/empresa');
const { emailExiste, esTipoValido, existeUsuarioPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getEmpresas);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('tipo', 'El rol es obligatorio para el post').not().isEmpty(),
    // check('tipo').custom( esTipoValido ),
    validarCampos
] , postEmpresas);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    //check('tipo').custom( esTipoValido ),
    validarCampos
], putEmpresas);


router.delete('/eliminar/:id', [
    validarJWT,
  
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteEmpresa);


module.exports = router;
