const database = require('../models');
const uuid = require('uuid');

class PermissaoService {
  async cadastrar(dto) {
    const permissao = await database.permissoes.findOne({
      where: {
        nome: dto.nome
      }
    });
    if (permissao) {
      throw new Error('Permissao já cadastrada');
    }

    try {
      const newPermissao = await database.permissoes.create({
        id: uuid.v4(),
        nome: dto.nome,
        descricao: dto.descricao
      });
      return newPermissao;
    } catch (error) {
      throw new Error('Erro ao cadastrar permissao');
    }
  }

  async buscarTodosOsRegistros(where = {}) {
    const permissoes = await database.permissoes
      .findAll({ where: { ...where } });
    return permissoes;
  }

  async buscarRegistroPorId(id) {
    const permissao = await database.permissoes.findOne({ where: { id: id } });
    if (!permissao) {
      throw new Error('Permissao informada não cadastrada!')
    }
    return permissao;
  }

  async deletarRegistro(id) {
    return database.permissoes.destroy({ where: { id: id } });
  }

  async editarRegistro(dadosAtualizados, id) {
    return database.permissoes.update(dadosAtualizados, { where: { id: id } });
  }
}

module.exports = PermissaoService;