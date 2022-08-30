const { initializeApp } = require('firebase/app');
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    getDoc,
    deleteDoc
} = require('firebase/firestore/lite');

const firebaseConfig = {
    apiKey: "AIzaSyBnNv-JEGrjCrI8X18h6Z4A_7C53fRqHDU",
    authDomain: "pedido-thiago-marins-braga.firebaseapp.com",
    projectId: "pedido-thiago-marins-braga",
    storageBucket: "pedido-thiago-marins-braga.appspot.com",
    messagingSenderId: "193973534897",
    appId: "1:193973534897:web:3acbe645c135f4977ca290",
    measurementId: "G-EJDB0E2GJZ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function salvar(nomeTabela, id, dado) {
    if (id) {
        const referencia = await setDoc(doc(db, nomeTabela, id), dado);
        const dadoSalvo = {
            ...dado,
            id: id
        }
        return dadoSalvo;
    } else {
        const referencia = await addDoc(collection(db, nomeTabela), dado);
        const dadoSalvo = {
            ...dado,
            id: referencia.id
        }
        return dadoSalvo;
    }
}

async function buscar(nomeTabela) {
    const tabelaReferencia = collection(db, nomeTabela);

    const q = query(tabelaReferencia);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const dado = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(dado);
    });
    return lista;
}

async function buscarPorId(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("ERRO!");
    }
}

async function remover(nomeTabela, id) {
    const dado = await deleteDoc(doc(db, nomeTabela, id));
    return {
        message: `${id} deletado!`
    }
}

module.exports = {
    salvar,
    buscar,
    buscarPorId,
    remover
}