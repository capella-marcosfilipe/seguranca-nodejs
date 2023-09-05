const PermissaoService = require('../services/permissaoService');

const permissaoService = new PermissaoService();

class PermissaoController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;
    try {
      const permissao = await permissaoService.cadastrar({ nome, descricao });
      res.status(201).send(permissao);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodasPermissoes(req, res) {
    try {
      const todasAsPermissoes = await permissaoService.buscarTodosOsRegistros();
      return res.status(200).json(todasAsPermissoes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscarPermissaoPorId(req, res) {
    const { id } = req.params;
    try {
      const permissao = await permissaoService.buscarRegistroPorId(id);
      return res.status(200).json(permissao);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async editarPermissao(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await permissaoService.editarRegistro(novasInfos, id);
      return res.status(200).json({ message: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletarPermissaoPorId(req, res) {
    const { id } = req.params;
    try {
      const permissao = await permissaoService.deletarRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PermissaoController;