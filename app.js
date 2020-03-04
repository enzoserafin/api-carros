let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); // Configura para ler dados do POST por form-urlencoded e application/json

app.use(bodyParser.urlencoded({limit: '10mb', extended: false }))
app.use(bodyParser.json());

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.use(express.static(__dirname + '/view')); // Permite utilizar arquivos estáticos na pasta view

app.use('/api/carros', require('./routes/carros')); // Rotas
app.use('/api/upload', require('./routes/upload'))

app.get('/teste_erro', function (req, res) { // Teste de Erro
    throw Error('Erro Ninja');
});

app.use(function(req, res, next) { // Rota para não encontrado '404'
    let err = new Error('Não encontrado');    
    err.status = 404;
    next(err);
});

app.use(function logErrors(err, req, res, next) { // Rota para não encontrado '404'
    console.error(err.stack);
    next(err);
  });

app.use(function(err, req, res, next) { // Rota genérica de erro '500'
    console.log(err)
    res.status(500);
    res.json({erro: "Erro na transação "});
});

let server = app.listen(3000, function () { // Inicia o servidor
    let host = server.address().address;
    let port = server.address().port;
console.log("Servidor iniciado em http://%s:%s", host, port)
});