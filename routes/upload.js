let express = require('express');
const router = express.Router();
const exec = require('./utils');
let fs = require('fs');
// Post para fazer upload em um arquivo.
router.post('/upload', exec(async (req, res, next) => {
// Lê da request o nome do arquivo e o Base64
let fileName = req.body.fileName;
let Base64 = req.body.Base64;
// Converte o Base64 para um buffer binário
let buf = Buffer.from(Base64, 'Base64');
// Escreve o buffer no arquivo.
fs.writeFile("./fotos/"+fileName, buf, "binary",function(err) {
if(err) {
next(err);
res.json({msg: 'Erro ao salvar o arquivo.'});
} else {
    res.json({msg: 'Arquivo salvo com sucesso.'});
}
});
}));
module.exports = router;