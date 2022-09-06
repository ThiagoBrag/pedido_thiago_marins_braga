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
    let listaOrderProduct = await procurarOrderProduct()
    console.log("lista"+listaOrderProduct);
    if (dados.products && dados.orderId) {
        if (dados.products.quantity > 0) {
            if ((await procurarProducts()).filter((Products) => Products.id == dados.products.productId) != "") {
                if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId) != "") {
                    if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId && Orders.status == "Aberto" || Orders.id == dados.orderId && Orders.status == "aberto") != "") {
                        // if(listaOrderProduct == null) {

                        // }
                        // for(OrderProduct of await procurarOrderProduct()) {
                        //     if(OrderProduct.orderId == dados.orderId) {
                        //         for(ProdutoOrderProduct of OrderProduct.products) {
                        //             if (ProdutoOrderProduct.productId == dados.products.productId) {
                        //                 idOrderProduct = OrderProduct.id
                        //                 OrderProduct.products.remove({
                        //                     "productId": dados.products.productId,
                        //                     "quantity": ProdutoOrderProduct.quantity
                        //                 })
                        //                 OrderProduct.products.push({
                        //                     "productId": dados.products.productId,
                        //                     "quantity": ProdutoOrderProduct.quantity+dados.products.quantity
                        //                 });
                        //                 dados = {
                        //                     "products":OrderProduct.products,
                        //                     "orderId": dados.orderId
                        //                 }
                        //                 return await editarOrderProduct(dados, idOrderProduct);
                        //             } else {
                        //                 OrderProduct.products.push({
                        //                     "productId": dados.products.productId,
                        //                     "quantity": dados.products.quantity
                        //                 });
                        //                 dados = {
                        //                     "products":OrderProduct.products,
                        //                     "orderId": dados.orderId
                        //                 }
                        //                 return await editarOrderProduct(dados,idOrderProduct);
                        //             }
                        //         }
                        //     } else {
                        //         return await crud.salvar(tabela, false, dados);
                        //     }
                        // }
                    } else {
                        return "Erro! Status do pedido não está 'Aberto'!";
                    }
                } else {
                    return "Erro! Order inexistente!";
                }
            } else {
                return "Erro! Produto inexistente!";
            }
        } else {
            return "Erro! A quantidade precisa ser maior que 0!";
        }
    } else {
        return "Erro! Falta algum dado!"
    }

    // if (dados.productId && dados.quantity && dados.orderId) {
    //     if (dados.quantity > 0) {
    //         if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId) != "") {
    //             if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId && Orders.status == "Aberto" || Orders.id == dados.orderId && Orders.status == "aberto") != "") {
    //                 if ((await procurarProducts()).filter((Products) => Products.id == dados.productId) != "") {
    //                     if ((await procurarOrderProducts()).filter((OrderProducts) => OrderProducts.orderId == dados.orderId && OrderProducts.productId == dados.productId) == "") {
    //                         return await crud.salvar(tabela, false, dados);
    //                     } else {
    //                         const listaOrderProduct = await (await procurarOrderProducts()).filter((OrderProducts) => OrderProducts.productId == dados.productId && OrderProducts.orderId == dados.orderId);
    //                         let idOrderProduct = null;
    //                         let quantidadeAntiga = null;
    //                         for (const OrderProduct of listaOrderProduct) {
    //                             idOrderProduct = OrderProduct.id;
    //                             quantidadeAntiga = OrderProduct.quantity
    //                         }
    //                         dados = {
    //                             id: idOrderProduct,
    //                             productId: dados.productId,
    //                             quantity: (quantidadeAntiga+dados.quantity),
    //                             orderId: dados.orderId
    //                         }
    //                         return await editarOrderProduct(dados, idOrderProduct);
    //                     }
    //                 } else {
    //                     return "Erro! Produto inexistente!";
    //                 }
    //             } else {
    //                 return "Erro! Status do pedido não está 'Aberto'!";
    //             }
    //         } else {
    //             return "Erro! Order inexistente!";
    //         }
    //     } else {
    //         return "Erro! A quantidade precisa ser maior que 0!";
    //     }
    // } else {
    //     return "Erro! Falta algum dado!"
    // }
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

async function mudarStatusOrder(idOrder) {
    let status = "null"
    Order = await crud.buscarPorId("Orders", idOrder);
    OrderProducts = await procurarOrderProducts();
    if (Order.number) {
        if (Order.status == "Aberto" || Order.status == "aberto") {
            for (orderproduct of OrderProducts) {
                if (orderproduct.orderId == idOrder && orderproduct.quantity <= 0) {
                    return "Erro! Para deixar status 'Fechado' é necessário ter uma quantidade maior que 0"
                }
            }

            status = "Fechado"
        } else if (Order.status == "Fechado" || Order.status == "fechado") {
            status = "Aberto";
        }
        dadosNovo = {
            number: Order.number,
            userId: Order.userId,
            status: status
        }
        return await crud.salvar("Orders", idOrder, dadosNovo);
    } else {
        return "Erro! Id do Order inexistente!"
    }
}

async function deletarProduct(id, idProduct, dados) {
    if ((await procurarProducts()).filter((Products) => Products.id == idProduct) != "") {
        if (dados.quantity && dados.orderId) {
            if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId) != "") {
                if ((await procurarOrders()).filter((Orders) => Orders.id == dados.orderId && Orders.status == "Aberto" || Orders.status == "aberto") != "") {

                    const listaOrderProduct = await (await procurarOrderProducts()).filter((OrderProducts) => OrderProducts.productId == idProduct && OrderProducts.orderId == dados.orderId);
                    let idOrderProduct = null;
                    let quantidadeAntiga = null;
                    for (const OrderProduct of listaOrderProduct) {
                        idOrderProduct = OrderProduct.id;
                        quantidadeAntiga = OrderProduct.quantity
                    }
                    if (dados.quantity > quantidadeAntiga) {
                        return "Erro! Quantidade inserida é maior que a atual!"
                    } else {
                        dados = {
                            id: idOrderProduct,
                            productId: idProduct,
                            quantity: (quantidadeAntiga - dados.quantity),
                            orderId: dados.orderId
                        }
                        if (dados.quantity <= 0) {
                            // FAZER EXCLUSAO DO PRODUTO CASO CHEGUE A 0 A QUANTIDADE
                            return await crud.salvar(tabela, id, dados)
                        }
                        return await crud.salvar(tabela, id, dados);
                    }
                } else {
                    return "Erro! Status do pedido não está 'Aberto'!";
                }
            } else {
                return "Erro! Order inexistente!";
            }
        } else {
            return "Erro! Falta algum dado! (Verifique se tem quantidade e id do pedido)"
        }
    } else {
        return "Erro! Produto inexistente!";
    }

}

async function deletarOrderProduct(id) {
    return await crud.remover(tabela, id);
}


module.exports = {
    procurarOrderProducts, procurarOrderProduct, criarOrderProduct, editarOrderProduct, mudarStatusOrder, deletarProduct, deletarOrderProduct
};