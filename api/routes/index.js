const bodyParser = require('body-parser');
 
const produto = require('./produtoRoute');
const usuarios = require('./usuariosRoutes');
const auth = require('./authRoute');
const role = require('./role');
const permissao = require('./permissao');
const seguranca = require('./seguranca');

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    usuarios,
    produto,
    role,
    permissao,
    seguranca
  )
}
