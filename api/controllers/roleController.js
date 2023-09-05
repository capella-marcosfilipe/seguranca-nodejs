const RoleService = require('../services/roleService');

const roleService = new RoleService();

class RoleController {
  static async cadastrar(req, res) {
    const { nome, descricao } = req.body;
    try {
      const role = await roleService.cadastrar({ nome, descricao });
      res.status(201).send(role);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async buscarTodasRoles(req, res) {
    try {
      const todasAsRoles = await roleService.buscarTodosOsRegistros();
      return res.status(200).json(todasAsRoles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async buscarRolePorId(req, res) {
    const { id } = req.params;
    try {
      const role = await roleService.buscarRegistroPorId(id);
      return res.status(200).json(role);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async editarRole(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await roleService.editarRegistroPorId(novasInfos, id);
      return res.status(200).json({ message: `id ${id} atualizado` })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deletarRolePorId(req, res) {
    const { id } = req.params;
    try {
      const role = await roleService.deletarRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = RoleController;