const tickets = [
  {id:"#4587", title:"Erro ao acessar o sistema", status:"Aberto", cls:"open", time:"Hoje, 09:15"},
  {id:"#4586", title:"Solicitação de acesso", status:"Em andamento", cls:"progressing", time:"Hoje, 08:40"},
  {id:"#4585", title:"Dúvida sobre relatório", status:"Em andamento", cls:"progressing", time:"Ontem, 17:32"},
  {id:"#4584", title:"Problema de impressão", status:"Resolvido", cls:"resolved", time:"Ontem, 15:10"}
];

const mainTicketList = document.querySelector(".ticket-list");
const externalTicketList = document.querySelector("#externalTickets");

tickets.forEach(ticket => {
  const main = document.createElement("div");
  main.className = "ticket-item";
  main.innerHTML = `<b>${ticket.id}</b><span>${ticket.title}</span><span class="ticket-status ${ticket.cls}">${ticket.status}</span>`;
  mainTicketList.appendChild(main);

  const external = document.createElement("div");
  external.className = "external-ticket";
  external.innerHTML = `<b>${ticket.id}</b><span>${ticket.title}</span><span class="ticket-status ${ticket.cls}">${ticket.status}</span><time>${ticket.time}</time>`;
  externalTicketList.appendChild(external);
});

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".screen-panel").forEach(panel => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#panel-${button.dataset.panel}`).classList.add("active");
  });
});

const toast = document.querySelector("#toast");
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll).scrollIntoView({behavior:"smooth"});
  });
});

document.querySelectorAll(".video-tile").forEach(tile => {
  tile.addEventListener("click", () => showToast(`Abrindo treinamento: ${tile.dataset.title}`));
});

document.querySelectorAll(".link-btn").forEach(button => {
  button.addEventListener("click", () => showToast("Área completa disponível na versão integrada."));
});

const quickAnswers = {
  "Como abrir um chamado?":"Acesse Chamados no menu lateral e clique em “Abrir chamado”. Informe categoria, prioridade e descrição.",
  "Quais treinamentos estão pendentes?":"Você possui 4 trilhas ativas. Comunicação Assertiva está com 30% e Onboarding com 50%.",
  "Mostre os indicadores do dashboard.":"Atualmente são 342 chamados, 96% de resolução, SLA de 98% e satisfação média de 4,8/5."
};

const chatWindow = document.querySelector("#chatWindow");
function addAssistantMessage(text){
  const div = document.createElement("div");
  div.className = "message assistant";
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.querySelectorAll(".quick-question").forEach(button => {
  button.addEventListener("click", () => addAssistantMessage(quickAnswers[button.textContent.trim()]));
});

document.querySelector("#chatForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.querySelector("#chatInput");
  const value = input.value.trim();
  if(!value) return;
  const user = document.createElement("div");
  user.className = "message";
  user.style.cssText = "align-self:flex-end;background:#d89b35;color:#07111c";
  user.textContent = value;
  chatWindow.appendChild(user);
  input.value = "";
  setTimeout(() => addAssistantMessage("Entendi. Na versão conectada, a IA consulta sua base de processos, chamados, treinamentos e indicadores para responder com contexto."), 500);
});

const modal = document.querySelector("#videoModal");
document.querySelector("#openVideo").addEventListener("click", () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
});
document.querySelector("#closeModal").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

document.addEventListener("keydown", event => {
  if(event.key === "Escape") closeModal();
});

document.querySelectorAll(".quick-grid button, .panel-title button").forEach(button => {
  button.addEventListener("click", () => showToast(`${button.textContent.trim()} — recurso demonstrativo.`));
});
