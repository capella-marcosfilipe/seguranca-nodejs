const UsuarioService = require('../services/usuarioService');

const usuarioService = new UsuarioService();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const usuario = await usuarioService.cadastrar({ nome, email, senha });
      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodosOsUsuarios(req, res) {
    try {
      const todosOsUsuarios = await usuarioService.buscarTodosOsRegistros();
      return res.status(200).json(todosOsUsuarios);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscarUsuarioPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.buscarRegistroPorId(id);
      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async editarUsuario(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await usuarioService.editarUsuario(novasInfos, id);
      return res.status(200).json({ message: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletarUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.deletarRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado`});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UsuarioController;