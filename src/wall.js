//CRUD: Create Reade Update Delete
firebase.initializeApp({
  apiKey: "AIzaSyDBi3SO4pgUpX4urYoutax2V5NINLab8go",
  authDomain: "femme-18162.firebaseapp.com",
  projectId: "femme-18162"
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//Agregar documentos
function guardar() {

  if (nombre.value !== '') {
    let nombre = document.getElementById('nombre').value;

    db.collection("users").add({
      first: nombre,
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  } else {
    alert('Se olvido de escribir un Post')
  }

}

//Leer documentos
const tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
    tabla.innerHTML += `
      <div> 
        <textarea disabled>${doc.data().first}</textarea>
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        <i class="fas fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button class="dropdown-item btn-sm" type="button"  onclick="editar('${doc.id}','${doc.data().first}')"><i class="fas     fa-pen"></i>Editar</button>
          <button class="dropdown-item btn-sm" type="button" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i>Eliminar</button>
        </div>
        <button type="button"><i class="fas fa-heart"></i> Like</button>
      </div>
      `
  });
});

//Borrar documentos
function eliminar(id) {
  db.collection("users").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

//Editar documentos
function editar(id, nombre) {
  document.getElementById('nombre').value = nombre;

  const boton = document.getElementById('boton');
  boton.innerHTML = 'Guardar';
  boton.onclick = function () {
    const usersRef = db.collection("users").doc(id);
    // Set the "capital" field of the city 'DC'
    let nombre = document.getElementById('nombre').value;

    return usersRef.update({
      first: nombre,
    })
      .then(function () {
        console.log("Document successfully updated!");
        boton.innerHTML = 'Publicar';
        document.getElementById('nombre').value = '';

      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}
