// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id && id.startsWith('#') && id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// ===== Buscar (filtra por nombre contiene) =====
function buscarStickers(e){
  e.preventDefault();
  const q = (document.getElementById('q')?.value || '').toLowerCase().trim();
  const cards = document.querySelectorAll('.productos .card');
  cards.forEach(c=>{
    const nombre = c.querySelector('h3')?.textContent.toLowerCase() || '';
    c.style.display = nombre.includes(q) ? '' : 'none';
  });
  document.querySelector('#catalogo')?.scrollIntoView({behavior:'smooth'});
  // activar “Todos” visualmente
  document.querySelectorAll('.pill,.menulink').forEach(el=> el.classList.remove('is-active'));
  document.querySelectorAll('[data-filtro="Todos"]').forEach(el=> el.classList.add('is-active'));
  return false;
}

// ===== Filtro por categoría (pills + chips + menú) =====
const cards = document.querySelectorAll('.productos .card');
function aplicarFiltro(cat){
  cards.forEach(c=>{
    const ok = (cat==='Todos') || (c.dataset.cat===cat);
    c.style.display = ok ? '' : 'none';
  });
  document.querySelectorAll('.pill').forEach(p=>p.classList.toggle('is-active', p.dataset.filtro===cat));
  document.querySelectorAll('.menulink').forEach(l=>l.classList.toggle('is-active', l.dataset.filtro===cat));
  document.querySelector('#catalogo')?.scrollIntoView({behavior:'smooth', block:'start'});
}

document.querySelectorAll('.pill').forEach(p=>{
  p.addEventListener('click', ()=> aplicarFiltro(p.dataset.filtro));
});
document.querySelectorAll('.chip[data-chip]').forEach(ch=>{
  ch.addEventListener('click', ()=> aplicarFiltro(ch.dataset.chip));
});
document.querySelectorAll('.menulink[data-filtro]').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    aplicarFiltro(link.dataset.filtro || 'Todos');
  });
});

// ===== WhatsApp dinámico (por producto) =====
(function(){
  const phone = (window.STICKERLAND_WA && window.STICKERLAND_WA.phone) || "";
  const botones = document.querySelectorAll(".btn.wa");

  function buildMessage(nombre, precio){
    const texto = `Hola, me interesa el sticker "${nombre}" (L.${precio}). ¿Está disponible?`;
    return encodeURIComponent(texto);
  }

  botones.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const nombre = btn.getAttribute("data-nombre") || "Sticker";
      const precio = btn.getAttribute("data-precio") || "0.00";
      if(!phone){
        alert("Falta configurar el número de WhatsApp. Editá window.STICKERLAND_WA.phone en index.html");
        return;
      }
      const url = `https://wa.me/${phone}?text=${buildMessage(nombre, precio)}`;
      window.open(url, "_blank");
    });
  });
})();

// ===== Botón flotante WA (consulta general) =====
(function(){
  const phone = (window.STICKERLAND_WA && window.STICKERLAND_WA.phone) || "";
  const fab = document.getElementById('wa-float');
  if(fab){
    fab.addEventListener('click', (e)=>{
      e.preventDefault();
      if(!phone){ alert("Falta configurar número de WhatsApp en window.STICKERLAND_WA.phone"); return; }
      const msg = encodeURIComponent("Hola, quiero info general de Stickerland.");
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    });
  }
})();


