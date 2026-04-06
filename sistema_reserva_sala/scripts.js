let calendar;
let reservas = JSON.parse(localStorage.getItem("reservas_viollete")) || [];

function mostrarPagina(id) {
    document.querySelectorAll(".pagina").forEach(p => p.classList.remove("ativa"));
    document.getElementById(id).classList.add("ativa");
    
    if (id === 'calendario' && calendar) {
        calendar.render(); 
    }
    atualizarDashboard();
}

function atualizarDashboard() {
    document.getElementById("count-reservas").innerText = reservas.length;
}

document.addEventListener("DOMContentLoaded", function() {
    let calendarEl = document.getElementById("calendar");
    let filtroSala = document.getElementById("sala-filtro");

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "timeGridWeek",
        locale: "pt-br",
        slotMinTime: "07:00:00",
        slotMaxTime: "22:00:00",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        events: getEventosFiltrados(),
        dateClick: function(info) {
            let salaSelecionada = filtroSala.value;
            
            if(salaSelecionada === "Todas") {
                alert("Por favor, selecione uma sala específica no filtro antes de reservar.");
                return;
            }

            let inicio = prompt("Horário início (ex: 09:00)");
            let fim = prompt("Horário fim (ex: 11:00)");

            if(inicio && fim) {
                const novaReserva = {
                    id: Date.now(),
                    title: salaSelecionada,
                    start: info.dateStr + "T" + inicio + ":00",
                    end: info.dateStr + "T" + fim + ":00",
                    color: "#6b0370"
                };

                reservas.push(novaReserva);
                salvarDados();
                alert("✅ Reserva confirmada para " + salaSelecionada + "!");
                calendar.addEvent(novaReserva);
                atualizarTabela();
            }
        }
    });

    calendar.render();
    atualizarTabela();
    atualizarDashboard();

    // Filtro em tempo real
    filtroSala.addEventListener("change", function() {
        calendar.removeAllEvents();
        calendar.addEventSource(getEventosFiltrados());
    });
});

function getEventosFiltrados() {
    const filtro = document.getElementById("sala-filtro").value;
    if (filtro === "Todas") return reservas;
    return reservas.filter(res => res.title === filtro);
}

function salvarDados() {
    localStorage.setItem("reservas_viollete", JSON.stringify(reservas));
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaReservas");
    tabela.innerHTML = "";
    
    reservas.forEach(res => {
        let linha = `
            <tr>
                <td>${res.title}</td>
                <td>${res.start.split('T')[0]}</td>
                <td>${res.start.split('T')[1].substring(0,5)} - ${res.end.split('T')[1].substring(0,5)}</td>
                <td><button onclick="deletarReserva(${res.id})" style="background:#ff4d4d; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;">Cancelar</button></td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
}

window.deletarReserva = function(id) {
    if(confirm("Deseja cancelar esta reserva?")) {
        reservas = reservas.filter(res => res.id !== id);
        salvarDados();
        location.reload(); 
    }
}

mostrarPagina("dashboard");