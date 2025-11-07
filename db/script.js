// script.js
import { db } from './firebase.js'; 
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Función que configura cada foro automáticamente
function initCommentSystem(formElement) {
  const collectionName = formElement.dataset.collection;
  const commentsRef = collection(db, collectionName);
  const q = query(commentsRef, orderBy("timestamp", "desc"));

  const nameInput = formElement.querySelector(".userName");
  const commentInput = formElement.querySelector(".userComment");
  const commentContainer = formElement
    .closest(".forum-content")
    .querySelector(".commentContainer");

  // Enviar comentario
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name && comment) {
      await addDoc(commentsRef, {
        name,
        comment,
        timestamp: Date.now()
      });
      nameInput.value = "";
      commentInput.value = "";
    }
  });

  // Mostrar comentarios en tiempo real
  onSnapshot(q, (snapshot) => {
    commentContainer.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const div = document.createElement("div");
      div.classList.add("comment-card"); // Estilo para tarjetas

      div.innerHTML = `
        <button class="delete-btn" data-id="${docSnap.id}">
          <i class="fas fa-times"></i> <!-- ícono de la "X" -->
        </button>
        <strong>${data.name}</strong><br/>
        <span>${data.comment}</span>
      `;
      commentContainer.appendChild(div);
    });
  });

  // Borrar comentarios
  const section = commentContainer.closest(".forum-content");
  section.addEventListener("click", async (e) => {
    // Asegurarse de que el evento esté escuchando sobre el botón de borrar
    if (e.target.classList.contains("delete-btn") || e.target.closest(".delete-btn")) {
      const deleteButton = e.target.closest(".delete-btn");
      const id = deleteButton.getAttribute("data-id");
      await deleteDoc(doc(db, collectionName, id));
    }
  });
}

// Iniciar todos los formularios dinámicamente
document.querySelectorAll("form[data-collection]").forEach(initCommentSystem);
