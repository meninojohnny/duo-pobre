import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzA2OSzzG_lss8cqqHILgZScZT_Zv8-UI",
    authDomain: "duopobre.firebaseapp.com",
    projectId: "duopobre",
    storageBucket: "duopobre.firebasestorage.app",
    messagingSenderId: "122473755268",
    appId: "1:122473755268:web:b04193b27f01def227c8d1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function finWord() {
    try {
        const q = query(collection(db, "word"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
            const palavras = [];
            querySnapshot.forEach((doc) => {
                palavras.push({ id: doc.id, ...doc.data() });
            });
            return palavras;
        } else {
            console.log("Nenhuma palavra encontrada");
            return [];
        }
    } catch (e) {
        console.error("Erro ao buscar palavra:", e);
    }
}

export async function findWordByCategory(categoryId) {
    try {
        const q = query(collection(db, "word"), where("category", "==", categoryId));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
            const palavras = [];
            querySnapshot.forEach((doc) => {
                palavras.push({ id: doc.id, ...doc.data() });
            });
            return palavras;
        } else {
            console.log("Nenhuma palavra encontrado com a categoria de id:", categoryId);
            return [];
        }
    } catch (e) {
        console.error("Erro ao buscar palavra pela categoria de id:", e);
    }
  }

export async function addWord(word) {
    try {
      const docRef = await addDoc(collection(db, "word"), word);
      console.log("Documento adicionado com ID:", docRef.id);
    } catch (e) {
      console.error("Erro ao adicionar documento:", e);
    }
}

export async function updateWord(id, dados) {
    try {
      const docRef = doc(db, "word", id);
  
      await updateDoc(docRef, dados);
  
      console.log("Palavra atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a palavra:", error);
    }
}

export async function removeWord(wordId) {
    try {
        const docRef = doc(db, "word", wordId);
        await deleteDoc(docRef);
        console.log(`Palavra com ID ${wordId} removido com sucesso!`);
    } catch (error) {
        console.error("Erro ao remover o documento:", error);
    }
}

export async function findCategory() {
    try {
        const q = query(collection(db, "category"));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
            const palavras = [];
            querySnapshot.forEach((doc) => {
                palavras.push({ id: doc.id, ...doc.data() });
            });
            return palavras;
        } else {
            console.log("Nenhuma categoria encontrada");
            return [];
        }
    } catch (e) {
        console.error("Erro ao buscar categoria:", e);
    }
}

export async function findCategoriaById(id) {
    try {
        const docRef = doc(db, "category", id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Nenhum documento encontrado com o ID fornecido.");
        }
    } catch (e) {
        console.error("Erro ao buscar o documento:", e);
    }
  }

export async function addCategory(category) {
    try {
      const docRef = await addDoc(collection(db, "category"), category);
      console.log("Documento adicionado com ID:", docRef.id);
    } catch (e) {
      console.error("Erro ao adicionar documento:", e);
    }
}

export async function updateCategory(id, dados) {
    try {
      const docRef = doc(db, "category", id);
  
      await updateDoc(docRef, dados);
  
      console.log("Categoria atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a categoria:", error);
    }
}

export async function removerCategory(categoryId) {
    try {
        const docRef = doc(db, "category", categoryId);
        await deleteDoc(docRef);
        console.log(`Categoria com ID ${categoryId} removido com sucesso!`);
    } catch (error) {
        console.error("Erro ao remover o documento:", error);
    }
}

export async function falarComGoogle(text) {
    const API_KEY = 'AIzaSyA5hxz93tzkpv7NOAEEDeFCGC3wPeSIguQ';

    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: { text: text },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Wavenet-D',
          ssmlGender: 'MALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.6
        }
      })
    });

    const data = await response.json();
    const audio = new Audio('data:audio/mp3;base64,' + data.audioContent);

    return audio;
}