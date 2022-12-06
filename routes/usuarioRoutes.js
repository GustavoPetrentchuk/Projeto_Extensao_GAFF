const express = require("express");
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

const verificaSessao = require("../helpers/sessao").verificaSessao;

router.get("/login", usuarioController.login);
router.post("/loginPost", usuarioController.loginPost);
router.get("/cadastro", verificaSessao, usuarioController.usuarioBusca);
router.post('/cadastro', verificaSessao, usuarioController.cadastroUsuarioPost);
router.post('/delete', verificaSessao, usuarioController.usuarioDelete);
router.get('/editar/:id', verificaSessao, usuarioController.usuarioEditar);
router.post('/editarPost', verificaSessao, usuarioController.usuarioEditarPost);


module.exports = router;