///////////////////////////////////////////////////////////////////////////* *////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery img");
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeButton = document.querySelector(".close");

  // Variables para el zoom y el arrastre
  let zoomed = false;
  let zoomFactor = 2; // Valor predeterminado para pantallas grandes
  let offsetX = 0, offsetY = 0;
  let startX, startY;
  let dragging = false;

  galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
          modal.style.display = "flex";
          modalImage.src = this.src;
          zoomed = false;
          offsetX = 0;
          offsetY = 0;
          modalImage.classList.remove("zoomed");
          modalImage.style.transform = "";

          // Actualizar el zoom según el tamaño de la pantalla
          if (window.innerWidth < 768) {
              zoomFactor = 3; // Mayor zoom para dispositivos responsivos
          } else {
              zoomFactor = 2; // Zoom predeterminado para pantallas grandes
          }
      });
  });

  closeButton.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.classList.remove("no-scroll");
  });

  modal.addEventListener("click", function (e) {
      if (e.target === modal) {
          modal.style.display = "none";
          document.body.classList.remove("no-scroll");
      }
  });

  // Alternar zoom al hacer clic en la imagen
  modalImage.addEventListener("click", function (e) {
      // Evitar que el clic se propague y cierre el modal
      e.stopPropagation();
      zoomed = !zoomed;
      if (zoomed) {
          modalImage.classList.add("zoomed");
          modalImage.style.transform = `scale(${zoomFactor}) translate(${offsetX}px, ${offsetY}px)`;
          modalImage.style.cursor = "grab";
      } else {
          modalImage.classList.remove("zoomed");
          modalImage.style.transform = "";
          modalImage.style.cursor = "default";
          offsetX = 0;
          offsetY = 0;
      }
  });

  // Arrastre para mover la imagen en zoom
  modalImage.addEventListener("mousedown", function (e) {
      if (!zoomed) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      modalImage.style.cursor = "grabbing";
      e.preventDefault();
  });

  document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      startX = e.clientX;
      startY = e.clientY;
      offsetX += dx;
      offsetY += dy;
      modalImage.style.transform = `scale(${zoomFactor}) translate(${offsetX}px, ${offsetY}px)`;
  });

  document.addEventListener("mouseup", function () {
      if (!dragging) return;
      dragging = false;
      if (zoomed) {
          modalImage.style.cursor = "grab";
      }
  });


  // document.querySelectorAll(".comment-form").forEach(form => {
  //     form.addEventListener("submit", function(e) {
  //       e.preventDefault();
    
  //       const userName = form.querySelector(".user-name").value;
  //       const userComment = form.querySelector(".user-comment").value;
  //       const container = form.nextElementSibling; // Asume que el contenedor está justo después del form
    
  //       const commentCard = document.createElement("div");
  //       commentCard.classList.add("comment-card");
  //       commentCard.innerHTML = `
  //         <div class="user-name">${userName}</div>
  //         <div class="comment-text">${userComment}</div>
  //       `;
    
  //       container.appendChild(commentCard);
    
  //       // Limpiar campos
  //       form.querySelector(".user-name").value = "";
  //       form.querySelector(".user-comment").value = "";
  //     });
  //   });
    
  // // Función para manejar el envío del formulario
  // document.getElementById("commentForm").addEventListener("submit", function(e) {
  //     e.preventDefault(); // Prevenir el comportamiento por defecto (recargar la página)

  //     // Obtener el nombre y comentario del usuario
  //     const userName = document.getElementById("userName").value;
  //     const userComment = document.getElementById("userComment").value;

  //     // Crear un nuevo comentario
  //     const commentCard = document.createElement("div");
  //     commentCard.classList.add("comment-card");

  //     // Agregar el nombre y el comentario al nuevo comentario
  //     commentCard.innerHTML = `
  //         <div class="user-name">${userName}</div>
  //         <div class="comment-text">${userComment}</div>
  //     `;

  //     // Añadir el nuevo comentario al contenedor de comentarios
  //     document.getElementById("commentContainer").appendChild(commentCard);

  //     // Limpiar los campos del formulario después de publicar el comentario
  //     document.getElementById("userName").value = "";
  //     document.getElementById("userComment").value = "";
  // });


  document.addEventListener("DOMContentLoaded", function() {
      const logoLink = document.getElementById("logoLink");
  
      // Detectar si estamos en la página principal (por URL o algún otro criterio)
      const isHomePage = window.location.pathname.includes("index.html") || window.location.pathname === "/";
  
      if (isHomePage) {
          // Si estamos en la página principal, hacer que el enlace solo haga scroll arriba
          logoLink.setAttribute("href", "#top");
      } else {
          // Si estamos en otra página, hacer que el enlace redirija a la página principal
          logoLink.setAttribute("href", "index.html");
      }
  });
  
  function playAudio() {
      var audio = document.getElementById('audio');
      audio.play();
  }
       

  
});
