const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHome);
router.get('/servicos', homeController.getService);
router.get('/contactos', homeController.getContacto);
router.get('/projetos', homeController.getProjeto);
router.get('/sobre-nos', homeController.getSobre);
router.get('/conversa', homeController.getConversa);




module.exports = router;
