const crud = require("../../CRUD/index");
const tabela = "Users"

async function procurarUsers() {
     return await crud.buscar(tabela);
}

async function procurarUser(id) {
    return await crud.buscarPorId(tabela, id);
}

async function criarUser(dados) {
    if (dados.cpf && dados.name && dados.surname) {
        if ((await procurarUsers()).filter((Users) => Users.cpf == dados.cpf) == "") {
            return await crud.salvar(tabela, false, dados);
        } else {
            return "Erro! Este CPF já existe!"
        }
    } else {
        return "Erro! Falta algum dado!"
    }
}

async function editarUser(dados, id){
    if (dados.cpf && dados.name && dados.surname) {
        if ((await procurarUsers()).filter((Users) => Users.cpf == dados.cpf) == "") {
            return await crud.salvar(tabela, id, dados);
        } else {
            return "Erro! Este CPF já existe!"
        }
    } else {
        return "Erro! Falta algum dado!"
    }
}

async function deletarUser(id){
    return await crud.remover(tabela, id);
}


module.exports = {
    procurarUsers, procurarUser, criarUser, editarUser, deletarUser
};