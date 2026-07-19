
const page = document.body.dataset.page;
document.querySelectorAll('.sidebar nav a').forEach(a=>{
  if(a.dataset.page===page) a.classList.add('active');
});

const sidebar=document.getElementById('sidebar'), overlay=document.getElementById('mobileOverlay');
document.getElementById('menuBtn')?.addEventListener('click',()=>{sidebar.classList.add('open');overlay.classList.add('show')});
overlay?.addEventListener('click',()=>{sidebar.classList.remove('open');overlay.classList.remove('show')});

const toast=document.getElementById('toast');
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>toast.classList.remove('show'),2600)}
document.querySelectorAll('[data-toast]').forEach(el=>el.addEventListener('click',()=>showToast(el.dataset.toast)));

const tickets=[
{id:'#4587',title:'Erro ao acessar o sistema',category:'Sistemas',status:'Aberto',owner:'Carlos',date:'Hoje, 09:15'},
{id:'#4586',title:'Solicitação de acesso',category:'Acessos',status:'Em andamento',owner:'Mariana',date:'Hoje, 08:40'},
{id:'#4585',title:'Dúvida sobre relatório',category:'Relatórios',status:'Em andamento',owner:'Lucas',date:'Ontem, 17:32'},
{id:'#4584',title:'Problema de impressão',category:'Sistemas',status:'Resolvido',owner:'Fernanda',date:'Ontem, 15:10'},
{id:'#4583',title:'Cadastro de novo produto',category:'Cadastros',status:'Aberto',owner:'Juliana',date:'18 jul, 14:26'}
];
function renderTickets(){
 const table=document.getElementById('ticketTable'); if(!table)return;
 const term=(document.getElementById('ticketSearch').value||'').toLowerCase();
 const status=document.getElementById('statusFilter').value;
 table.innerHTML='<div class="ticket-row header"><span>ID</span><span>Assunto</span><span>Categoria</span><span>Status</span><span>Responsável</span></div>';
 tickets.filter(t=>(t.title.toLowerCase().includes(term)||t.id.includes(term))&&(status==='all'||t.status===status)).forEach(t=>{
   const row=document.createElement('div');row.className='ticket-row';
   row.innerHTML=`<b>${t.id}</b><span>${t.title}</span><span>${t.category}</span><span class="status ${t.status.replace(' ','-')}">${t.status}</span><span>${t.owner}</span>`;
   table.appendChild(row);
 });
}
document.getElementById('ticketSearch')?.addEventListener('input',renderTickets);
document.getElementById('statusFilter')?.addEventListener('change',renderTickets);
renderTickets();

const drawer=document.getElementById('ticketDrawer');
document.getElementById('newTicketBtn')?.addEventListener('click',()=>drawer.classList.add('show'));
document.getElementById('closeDrawer')?.addEventListener('click',()=>drawer.classList.remove('show'));
document.getElementById('ticketForm')?.addEventListener('submit',e=>{
 e.preventDefault(); const title=document.getElementById('ticketTitle').value;
 tickets.unshift({id:'#'+(4590+tickets.length),title,category:'Sistemas',status:'Aberto',owner:'A definir',date:'Agora'});
 drawer.classList.remove('show');renderTickets();showToast('Chamado registrado com sucesso.');
});

const flows={
 atendimento:{title:'Atendimento de chamados',steps:['Início','Receber solicitação','Classificar demanda','Analisar solução','Resolver chamado','Validar com solicitante','Finalizar']},
 onboarding:{title:'Onboarding',steps:['Admissão confirmada','Criar acessos','Preparar equipamentos','Apresentação institucional','Treinamentos iniciais','Acompanhamento','Conclusão']},
 cadastro:{title:'Cadastro de produtos',steps:['Solicitação','Conferência dos dados','Validação fiscal','Cadastro no sistema','Retorno ao solicitante']},
 aprovacao:{title:'Aprovação de solicitações',steps:['Solicitação','Gestor imediato','Conferência','Alçada financeira','Diretoria','Aprovação','Execução','Encerramento']}
};
function renderFlow(key){
 const map=document.getElementById('processMap'); if(!map)return;
 document.getElementById('flowTitle').textContent=flows[key].title;
 map.innerHTML=flows[key].steps.map((s,i)=>`<div class="process-node">${i+1}. ${s}</div>${i<flows[key].steps.length-1?'<span class="process-arrow">→</span>':''}`).join('');
}
document.querySelectorAll('.flow-select').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.flow-select').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderFlow(btn.dataset.flow)
}));
renderFlow('atendimento');

const aiForm=document.getElementById('aiForm'), aiInput=document.getElementById('aiInput'), chatMessages=document.getElementById('chatMessages');
function sendAI(text){
 if(!chatMessages)return;
 chatMessages.insertAdjacentHTML('beforeend',`<div class="chat user"><div class="ai-mini">GF</div><p>${text}</p></div>`);
 setTimeout(()=>chatMessages.insertAdjacentHTML('beforeend',`<div class="chat assistant"><div class="ai-mini">✦</div><p>Com base na central demonstrativa, encontrei informações relacionadas a “${text}”. Na versão integrada, esta resposta será alimentada pelos seus processos, documentos, treinamentos e chamados reais.</p></div>`),450);
}
aiForm?.addEventListener('submit',e=>{e.preventDefault();if(!aiInput.value.trim())return;sendAI(aiInput.value.trim());aiInput.value=''});
document.querySelectorAll('.suggestions button').forEach(b=>b.addEventListener('click',()=>sendAI(b.textContent)));

const canvas=document.getElementById('lineChart');
if(canvas){
 const ctx=canvas.getContext('2d'), dpr=window.devicePixelRatio||1;
 const cssW=canvas.clientWidth||700, cssH=canvas.clientHeight||300;
 canvas.width=cssW*dpr;canvas.height=cssH*dpr;ctx.scale(dpr,dpr);
 const pad=35,w=cssW-pad*2,h=cssH-pad*2,data=[32,44,39,58,49,64,72,68,86,93,101,118],max=130;
 ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;
 for(let i=0;i<5;i++){const y=pad+i*h/4;ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(cssW-pad,y);ctx.stroke()}
 const grad=ctx.createLinearGradient(0,pad,0,cssH-pad);grad.addColorStop(0,'rgba(240,185,86,.32)');grad.addColorStop(1,'rgba(240,185,86,0)');
 ctx.beginPath();data.forEach((v,i)=>{const x=pad+i*w/(data.length-1),y=pad+h-(v/max*h);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});
 ctx.lineTo(cssW-pad,cssH-pad);ctx.lineTo(pad,cssH-pad);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
 ctx.beginPath();data.forEach((v,i)=>{const x=pad+i*w/(data.length-1),y=pad+h-(v/max*h);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});
 ctx.strokeStyle='#f0b956';ctx.lineWidth=3;ctx.stroke();
 data.forEach((v,i)=>{const x=pad+i*w/(data.length-1),y=pad+h-(v/max*h);ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fillStyle='#f0b956';ctx.fill()});
}
