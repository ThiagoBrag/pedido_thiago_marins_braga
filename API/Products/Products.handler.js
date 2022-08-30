const crud = require("../../CRUD/index");
const tabela = "Products"

async function procurarProducts() {
     return await crud.buscar(tabela);
}

async function procurarProduct(id) {
    return await crud.buscarPorId(tabela, id);
}

async function criarProduct(dados) {
    if (dados.name && dados.price) {
        if ((await procurarProducts()).filter((Products) => Products.name == dados.name) == "") {
            return await crud.salvar(tabela, false, dados);
        } else {
            return "Erro! Este nome de produto já existe!"
        }
    } else {
        return "Erro! Falta algum dado!"
    }
}

async function editarProduct(dados, id){
    if (dados.name && dados.price) {
        if ((await procurarProducts()).filter((Products) => Products.name == dados.name) == "") {
            return await crud.salvar(tabela, id, dados);
        } else {
            return "Erro! Este nome de produto já existe!"
        }
    } else {
        return "Erro! Falta algum dado!"
    }
}

async function deletarProduct(id){
    return await crud.remover(tabela, id);
}


module.exports = {
    procurarProducts, procurarProduct, criarProduct, editarProduct, deletarProduct
};