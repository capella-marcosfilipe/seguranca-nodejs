const database = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid');

class UsuarioService {
  async cadastrar(dto) {
    const usuario = await database.usuarios.findOne({
      where: {
        email: dto.email,
      }
    });
    if (usuario) {
      throw new Error('Usuario já cadastrado');
    }

    try {
      const senhaHash = await hash(dto.senha, 8);
      const novoUsuario = await database.usuarios.create({
        id: uuid.v4(),
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
      });
      return novoUsuario;
    } catch (error) {
      throw new Error('Erro ao cadastrar o usuário');
    }

  }

  async buscarTodosOsRegistros(where = {}) {
    const usuarios = await database.usuarios
      .findAll({ where: { ...where } });
    return usuarios;
  }

  async buscarRegistroPorId(id) {
    const usuario = await database.usuarios.findOne({
      where: {
        id: id
      }
    });
    if (!usuario) {
      throw new Error('Usuario informado não cadastrado!')
    }

    return usuario;
  }

  async editarUsuario(dadosAtualizados, id) {
    return database.usuarios
      .update(dadosAtualizados, { where: { id: id } });
  }

  async deletarRegistro(id) {
    return database.usuarios
      .destroy({ where: { id: id } });
  }
}

module.exports = UsuarioService;