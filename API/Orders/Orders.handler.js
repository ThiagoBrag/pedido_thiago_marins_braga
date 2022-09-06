const crud = require("../../CRUD/index");
const { procurarUsers } = require("../Users/Users.handler");
const tabela = "Orders"

async function procurarOrders() {
    return await crud.buscar(tabela);
}

async function procurarOrder(id) {
    return await crud.buscarPorId(tabela, id);
}

async function criarOrder(dados) {
    let numero = 0
    if (dados.userId) {
        if ((await procurarUsers()).filter((Users) => Users.id == dados.userId) != "") {
                if ((await procurarOrders()).filter((Orders) => Orders.userId == dados.userId && Orders.status == "Aberto" || Orders.userId == dados.userId && Orders.status == "aberto") == "") {
                    for(Order of await procurarOrders()) {
                        if(Order.userId == dados.userId) {
                            numero++
                        }
                    }
                    dados = {
                        number: numero+1,
                        userId: dados.userId,
                        status:"Aberto"
                    }
                    return await crud.salvar(tabela, false, dados);
                } else {
                    return "Erro! Este usuário já tem um pedido com status 'Aberto'";
                }
            } else {
                return "Erro! Usuário inserido inexistente!";
            }
    } else {
        return "Erro! Falta inserir o user ID!"
    }
}

async function editarOrder(dados, id) {
    return await crud.salvar(tabela, id, dados);
}

async function deletarOrder(id) {
    return await crud.remover(tabela, id);
}


module.exports = {
    procurarOrders, procurarOrder, criarOrder, editarOrder, deletarOrder
};