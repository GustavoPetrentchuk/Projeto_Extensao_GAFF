const express = require("express");
const router = express.Router();
const familiaController = require('../controllers/familiaController');

const verificaSessao = require("../helpers/sessao").verificaSessao;

router.get("/familias", verificaSessao, familiaController.familiaBusca);
router.post("/familiasPost", verificaSessao, familiaController.criarFamilia);
router.get("/familiaInfo/:id", verificaSessao, familiaController.familiaInfo);
router.post("/pessoaCriar", verificaSessao, familiaController.pessoaCriar);
router.get('/familiaEditar/:id', verificaSessao, familiaController.familiaEditar, familiaController.pessoaBusca);
router.post('/familiaEditarPost', verificaSessao, familiaController.familiaEditarPost);
router.post('/familiaExcluir', verificaSessao, familiaController.familiaExcluir);

module.exports = router;