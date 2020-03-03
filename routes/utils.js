
const exec = fn => // Função para auxiliar o uso de async/await
    (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .catch(function (error) {
            next(error);
        });
    };

module.exports = exec; // exporta a função