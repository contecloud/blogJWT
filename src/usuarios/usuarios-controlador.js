const Usuario = require('./usuarios-modelo');
const { InvalidArgumentError, InternalServerError } = require('../erros');
const jwt = require ('jsonwebtoken');

function criaTokenJWT(usuario) {
  const payload = {
    id: usuario.id
  };

  const token = jwt.sign(payload, 'unPQJpH46pmT/AFGqYHVlP1bk/AFz4jwSkwk+F7/Orrc2D23aYOhP0V3FDfRd5tN/SbCNnYPcUSuFE8ZGORyDDWSbLsFISq8lOU7bd6iyBT+xDO6PZM9QXYtpR7rUNBF3fBV9RRS9Sx+7SkWLhKtTRnkD8dKokYsLWzuXB/Zey4+ctGuKwbJL/0xt2UhLqhojSN1ZuulEyr7qypo8K6vMlch5bdvrMngVdwB7/pX9/R5MuLjKhuPtLayuRTpr5LRXkyRVuFvrKKwQIFeKun0aHVsMNhBvzBT31r+nLUFt/28Y2XApLe8Q54ppWoqX0Jg1WFTO/pQRR7wBRCtKPT4/w==');

  return token;
}

module.exports = {
  adiciona: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const usuario = new Usuario({
        nome,
        email
      });

      await usuario.adicionaSenha(senha);

      await usuario.adiciona();

      res.status(201).json();
    } catch (erro) {
      if (erro instanceof InvalidArgumentError) {
        res.status(422).json({ erro: erro.message });
      } else if (erro instanceof InternalServerError) {
        res.status(500).json({ erro: erro.message });
      } else {
        res.status(500).json({ erro: erro.message });
      }
    }
  },

  login: (req, res) => {
    const token = criaTokenJWT(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  }
};
