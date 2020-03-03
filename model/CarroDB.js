let mysql = require('mysql');

class CarroDB { // Classe CarroDB
    static connect() { // Função para conectar no banco de dados
        let connection = mysql.createConnection({ // Cria a conexão com MySQL
            host : 'localhost',
            user : 'livro',
            password : 'livro123',
            database : 'livro'
        });
        connection.connect(); // Conecta no banco de dados
        return connection;
    }
        
    static getCarros() { // Retorna a lista de carros
        return new Promise(function (resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "select * from carro"; // Cria uma consulta
            connection.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error); // Erro
                } else {
                    resolve(results); // Sucesso
                }
            });        
        connection.end(); // Fecha a conexão.
        });
    }
    
    static getCarrosByTipo(tipo) { // Retorna a lista de carros por tipo do banco de dados
        return new Promise(function (resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "select id,nome,tipo from carro where tipo = '" + tipo + "'"; // Cria uma consulta
            connection.query(sql, function (error, results, fields) {
                if (error) {       
                  reject(error);  // Erro
                } else {        
                   resolve(results); // Sucesso
                }
            });        
        connection.end(); // Fecha a conexão.
        });
    }
    
    static getCarroById(id) { // Retorna a lista de carros
        return new Promise(function (resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "select * from carro where id=?"; // Cria uma consulta
            connection.query(sql, id, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                if(results.length == 0) {
                        reject(Error("Nenhum carro encontrado."));
                        return
                    }
                    let carro = results[0]; // Encontrou o carro
                    resolve(carro); // Retorna o carro pela função de callback
                }
            });
        connection.end(); // Fecha a conexão.
        });
    }
     
    static save(carro) { // Salva um carro no banco de dados. Recebe o JSON com dados do carro como parâmetro.
        return new Promise(function (resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "insert into carro set ? "; // Insere o carro
            connection.query(sql, carro, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    carro.id = results.insertId; // Atualiza o objeto carro do parâmetro com o "id" inserido
                    resolve(carro); // Retorna o carro pela função de callback
                }
            });        
        connection.end(); // Fecha a conexão
        });
    }
        
    static update(carro) { // Atualiza um carro no banco de dados
        return new Promise(function (resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "update carro set ? where id = ?"; // SQL para atualizar o carro
            let id = carro.id; // Id do carro para atualizar
            connection.query(sql, [carro, id], function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(carro);
                }
            });
        connection.end(); // Fecha a conexão.
        });
    }
        
    static delete(carro) { // Deleta um carro no banco de dados
        return new Promise(function (resolve, reject) {
            let connection = CarroDB.connect();        
            let sql = "delete from carro where id = ?"; // SQL para deletar o carro       
            let id = carro.id; // Id do carro para deletar
            connection.query(sql, id, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(carro);
                }
            });        
        connection.end(); // Fecha a conexão.
        });
    }
        
    static deleteById(id) { // Deleta um carro pelo id
        return new Promise(function (resolve, reject) {
            let connection = CarroDB.connect();
            let sql = "delete from carro where id = ?"; // SQL para deletar o carro
            connection.query(sql, id, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows) // Retorna a quantidade de registros deletados
                }
            });        
        connection.end(); // Fecha a conexão
        });
    }
}

module.exports = CarroDB;