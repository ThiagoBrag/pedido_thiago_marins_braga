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
    if (dados.number && dados.userId && dados.status) {
        if ((await procurarOrders()).filter((Orders) => Orders.number == dados.number && Orders.userId == dados.userId) == "") {
            if ((await procurarUsers()).filter((Users) => Users.id == dados.userId) != "") {
                if ((await procurarOrders()).filter((Orders) => Orders.userId == dados.userId && Orders.status == "Aberto" || Orders.status == "aberto") == "") {
                    return await crud.salvar(tabela, false, dados);
                } else {
                    return "Erro! Este usuário já tem um pedido com status 'Aberto'";
                }
            } else {
                return "Erro! Usuário inserido inexistente!";
            }
        } else {
            return "Erro! Este Order já existe!"
        }
    } else {
        return "Erro! Falta algum dado!"
    }
}

async function editarOrder(dados, id) {
    antigoOrder = crud.buscarPorId(id);
    if (dados.status) {
        if (antigoOrder.status == "Aberto" || antigoOrder.status == "aberto") {
            if (dados.status == "Fechado" || dados.status == "fechado") {

            } else {
                return "Erro! Os status precisa ser 'Fechado' se estiver 'Aberto'"
            }
        }
        return await crud.salvar(tabela, id, dados);
    } else {
        return "Erro! Precisa inserir o status!"
    }
}

async function deletarOrder(id) {
    return await crud.remover(tabela, id);
}


module.exports = {
    procurarOrders, procurarOrder, criarOrder, editarOrder, deletarOrder
};