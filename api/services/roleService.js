const database = require('../models');
const uuid = require('uuid');

class RoleService {
  async cadastrar(dto) {
    const role = await database.roles.findOne({
      where: {
        nome: dto.nome
      }
    });
    if (role) {
      throw new Error('Role já cadastrada');
    }

    try {
      const newRole = await database.roles.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao
      });
      return newRole;
    } catch (error) {
      throw new Error('Erro ao cadastrar role');
    }
  }

  async buscarTodosOsRegistros(where = {}) {
    const roles = await database.roles
      .findAll({ where: { ...where } });
    return roles;
  }

  async buscarRegistroPorId(id) {
    const role = await database.roles.findOne({ where: { id: id } });
    if (!role) {
      throw new Error('Role informada não cadastrada!')
    }
    return role;
  }

  async deletarRegistroPorId(id) {
    return database.roles.destroy({ where: { id: id } });
  }

  async editarRegistro(dadosAtualizados, id) {
    return database.roles.update(dadosAtualizados, { where: { id: id } });
  }
}

module.exports = RoleService;