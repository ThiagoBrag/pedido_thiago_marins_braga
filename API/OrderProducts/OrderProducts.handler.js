const crud = require("../../CRUD/index");
const { procurarOrders } = require("../Orders/Orders.handler");
const { procurarProducts } = require("../Products/Products.handler");
const tabela = "OrderProducts";

async function procurarOrderProducts() {
    return await crud.buscar(tabela);
}

async function procurarOrderProduct(id) {
    return await crud.buscarPorId(tabela, id);
}

async function criarOrderProduct(dados) {
    if (dados.productId && dados.quantity && dados.orderId) {
        if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId) != "") {
            if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId && Orders.status == "Aberto" || Orders.status == "aberto") != "") {
                if ((await procurarProducts()).filter((Products) => Products.id == dados.productId) != "") {
                    if ((await procurarOrderProducts()).filter((OrderProducts) => OrderProducts.orderId == dados.orderId && OrderProducts.productId == dados.productId) == "") {
                        return await crud.salvar(tabela, false, dados);
                    } else {
                        const listaOrderProduct = await (await procurarOrderProducts()).filter((OrderProducts) => OrderProducts.productId == dados.productId && OrderProducts.orderId == dados.orderId);
                        let idOrderProduct = null;
                        let quantidadeAntiga = null;
                        for (const OrderProduct of listaOrderProduct) {
                            idOrderProduct = OrderProduct.id;
                            quantidadeAntiga = OrderProduct.quantity
                        }
                        dados = {
                            id: idOrderProduct,
                            productId: dados.productId,
                            quantity: (quantidadeAntiga+dados.quantity),
                            orderId: dados.orderId
                        }
                        return await editarOrderProduct(dados, idOrderProduct);
                    }
                } else {
                    return "Erro! Produto inexistente!";
                }
            } else {
                return "Erro! Status do pedido não está 'Aberto'!";
            }
        } else {
            return "Erro! Order inexistente!";
        }
    } else {
        return "Erro! Falta algum dado!"
    }
}

async function editarOrderProduct(dados, id) {
    if (dados.productId && dados.quantity && dados.orderId) {
        if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId) != "") {
            if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId && Orders.status == "Aberto" || Orders.status == "aberto") != "") {
                if ((await procurarProducts()).filter((Products) => Products.id == dados.productId) != "") {
                        return await crud.salvar(tabela, id, dados);
                } else {
                    return "Erro! Produto inexistente!";
                }
            } else {
                return "Erro! Status do pedido não está 'Aberto'!";
            }
        } else {
            return "Erro! Order inexistente!";
        }
    } else {
        return "Erro! Falta algum dado!"
    }
}

async function deletarOrderProduct(id) {
    return await crud.remover(tabela, id);
}


module.exports = {
    procurarOrderProducts, procurarOrderProduct, criarOrderProduct, editarOrderProduct, deletarOrderProduct
};