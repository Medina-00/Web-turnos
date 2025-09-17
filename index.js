let calendar;
const calendarEl = document.getElementById('calendar');

function generarTurnos(fechaInicio, fechaFin) {
  const eventos = [];
  let fecha = new Date(fechaInicio);
  fecha.setDate(fecha.getDate() + 1);

  const fin = new Date(fechaFin);

  let estadoActual = 'Trabajo'; // Comienza trabajando
  let contador = 0; // Cuenta cuántos días lleva en el estado actual

  while (fecha <= fin) {
    eventos.push({
      title: estadoActual,
      start: new Date(fecha),
      allDay: true,
      color: estadoActual === 'Trabajo' ? '#ff4d4d' : '#1976d2'
    });

    contador++; // Avanza un día en el estado actual

    // Si ya pasaron 4 días, cambia de estado
    if (contador === 4) {
      estadoActual = estadoActual === 'Trabajo' ? 'Libre' : 'Trabajo';
      contador = 0; // Reinicia el contador
    }

    fecha.setDate(fecha.getDate() + 1); // Avanza al siguiente día
  }

  return eventos;
}

function actualizarCalendario() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    console.log("Fecha de inicio seleccionada:", fechaInicio);
    if (!fechaInicio) {
        alert("Por favor selecciona una fecha de inicio.");

        return;
    }
    calendarEl.style.display = 'block'; // Mostrar el calendario al actualizar
    if (calendar) {
        calendar.destroy();
    }

    
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        
        height: 'auto',
        eventDisplay: 'block',
        fixedWeekCount: false, // Solo muestra los días reales del mes (28-31)
        showNonCurrentDates: false, // Oculta días de otros meses
        events: function(info, successCallback) {
            const eventos = generarTurnos(fechaInicio, info.end);
            successCallback(eventos);
        }
    });
    calendar.render();
}