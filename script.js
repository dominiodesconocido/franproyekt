document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    
    // Recopilar los valores del formulariO
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    var mensaje = document.getElementById("mensaje").value;



    // simulación del envío del correo electrónico)
    const datos = { nombre, apellido, email };
    console.log('Datos a enviar:', datos);

    //mensaje de confirmación con nombre y apellido
    alert("¡Datos enviados! Gracias por tu interés, nos estaremos contactando " + nombre + " " + apellido + ".");
        

    
});

    function invertirColores(img) {
        // Quita la clase "invertir" de todas las imágenes
        var imagenes = document.querySelectorAll('.slide img');
        imagenes.forEach(function (imagen) {
            imagen.classList.remove('invertir');
        });

        // Agrega la clase "invertir" a la imagen clickeada
        img.classList.toggle('invertir');
    }

// Cambiar el color al pasar el mouse
function cambiarColor(elemento) {
    elemento.style.backgroundColor = 'rgb(238, 76, 76)';
  }

  // Restaurar el color original al salir el mouse
  function restaurarColor(elemento) {
    elemento.style.backgroundColor = '';
  }  
  

