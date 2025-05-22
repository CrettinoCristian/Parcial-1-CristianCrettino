const formulario = document.getElementById('formularioBusqueda');
const campoPais = document.getElementById('entradaPais');
const listaResultados = document.getElementById('listaResultados');
const mensajeEstado = document.getElementById('mensajeEstado');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const pais = campoPais.value.trim();

  if (!pais) return;

  listaResultados.innerHTML = '';
  mensajeEstado.textContent = 'Buscando universidades...';

  try {
    const respuesta = await fetch(`http://universities.hipolabs.com/search?country=${encodeURIComponent(pais)}`, {
      method: 'GET'
    });
    const datos = await respuesta.json();

    if (datos.length === 0) {
      mensajeEstado.textContent = 'No se encontraron universidades.';
      return;
    }

    datos.sort((a, b) => a.name.localeCompare(b.name));
    mensajeEstado.textContent = `Universidades encontradas: ${datos.length}`;

    datos.forEach(universidad => {
      const elementoLista = document.createElement('li');
      elementoLista.innerHTML = `
        <strong>${universidad.name}</strong><br>
        <a href="${universidad.web_pages[0]}" target="_blank">${universidad.web_pages[0]}</a><br>
        ${universidad["state-province"] ? `<small>Provincia/Estado: ${universidad["state-province"]}</small>` : ""}
      `;
      listaResultados.appendChild(elementoLista);
    });

  } catch (error) {
    mensajeEstado.textContent = 'Error al obtener los datos. Verifica tu conexion o que hayas escrito el pais correctamente.';
    console.error(error);
  }
});
