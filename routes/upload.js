let express = require('express');
const router = express.Router();
const exec = require('./utils');
let fs = require('fs');
const s3 = require('./s3'); // Importa a classe do S3

router.post('/', exec(async (req, res, next) => { // Post para fazer upload em um arquivo.
    let fileName = req.body.fileName; // Lê da request o nome do arquivo e o Base64
    let base64 = req.body.base64;
    let buf = Buffer.from(base64, 'base64'); // Converte o Base64 para um buffer binário

    fs.writeFile("./fotos/"+fileName, buf, "binary",function(err) { // Escreve o buffer no arquivo.
        if(err) {
            next(err);
            res.json({msg: 'Erro ao salvar o arquivo.'});
        } else {
            res.json({msg: 'Arquivo salvo com sucesso.'});
        }
    });
    // Faz upload no S3
    let path = "fotos/"+fileName;
    s3.upload(buf, path);
}));
module.exports = router;