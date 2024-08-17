
export const setFlashMessage = ({message, type = 'success'}) => {
  const flashMessageElement = document.getElementById('flash-message');
  const flashMessageTextElement = document.getElementById('flash-message-text');

  if (flashMessageElement && flashMessageTextElement) {
    // Actualizar el contenido del mensaje
    flashMessageTextElement.textContent = message;

    // Aplicar la clase de fondo según el tipo
    flashMessageElement.className = `w-3/4 mx-auto text-xs md:text-sm p-2 md:p-4 
      text-center rounded shadow-md text-white 
      transition-all ease-in-out duration-500 z-10 
      ${type === 'error' ? 'bg-red-500/75' : 'bg-green-500/75'}
      opacity-100 translate-y-0`;

    // Mostrar el mensaje
    flashMessageElement.style.display = 'block';

    // Ocultar el mensaje después de la duración especificada
    setTimeout(() => {
      flashMessageElement.classList.remove('opacity-100', 'translate-y-0');
      flashMessageElement.classList.add('opacity-0', '-translate-y-full');      
    }, 5000);
    
  }
};
