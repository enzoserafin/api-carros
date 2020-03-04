let AWS = require('aws-sdk');
let accessKey = 'AKIARIACSLN2XIVU7KX7';
let secretKey = '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';
let bucket = 'livro-node';

class S3Helper { // Classe utilitária para enviar arquivos para o S3
    /**
    * Faz upload
    *
    * @param buffer - buffer binário do arquivo
    * @param path - caminho no qual o arquivo será salvo no S3
    */
    static upload(buffer, path) {
        AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey }); // Configura as chaves de acesso
            let s3 = new AWS.S3(); // Cria o objeto do S3
            s3.putObject({ // Adiciona o arquivo no bucket livro-aws
                Bucket: bucket,
                Key: path,
                Body: buffer,
                ACL: 'public-read',
                ContentType: 'image/jpeg'
            },function (resp) {
                console.log('Arquivo enviado com sucesso.');
            });
        }
}

module.exports = S3Helper;