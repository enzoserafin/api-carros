var express = require('express');
const router = express.Router();
const CarroDB = require('../model/CarroDB');
const exec = require('./utils');

router.get('/', exec(async (req, res, next) => { // GET em /
    let carros = await CarroDB.getCarros();
    res.json(carros);
}));

router.get('/:id(\\d+)', exec(async (req, res, next) => { // GET em /id
    let id = req.params.id;
    let carro = await CarroDB.getCarroById(id);
    res.json(carro)
}));

router.delete('/:id(\\d+)', exec(async (req, res, next) => { // DELETE em /id
    let id = req.params.id;
    let affectedRows = await CarroDB.deleteById(id);
    res.json({msg: affectedRows > 0 ? 'Carro deletado com sucesso.' : "Nenhum carro excluído."});
}));

router.get('/:tipo', exec(async (req, res, next) => { // GET em /(clássicos/esportivos/luxo)
    let tipo = req.params.tipo;
    let carros = await CarroDB.getCarrosByTipo(tipo);
    res.json(carros);
}));

router.post('/', exec(async (req, res, next) => {    // POST para salvar um carro    
    let carro = await CarroDB.save(req.body); // Carro enviado no formato JSON
    res.json(carro);
}));
    
router.put('/', exec(async (req, res, next) => { // PUT para atualizar um carro
    let carro = await CarroDB.update(req.body); // Carro enviado no formato JSON
    res.json({msg: 'Carro atualizado com sucesso.'});
}));

module.exports = router;