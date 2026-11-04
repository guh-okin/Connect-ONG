/* =========================================================
   Helpet - Catálogo de adoção (filtros, ordenação, paginação)
   ========================================================= */
(function () {
  "use strict";

  var POR_PAGINA = 6;

  /* ---------- Dados ---------- */
  // id maior = cadastro mais recente · m = idade em meses · km = distância
  // reg: grande-sp | campinas | curitiba
  var PETS = [
    { id: 18, nome: "Paçoca",   sp: "cao",    sx: "M", m: 12, porte: "Médio",   raca: "Caramelo",          temp: ["docil", "brincalhao"],             loc: "Pinheiros, SP",      reg: "grande-sp", km: 3.2,  cast: 1, vac: 1, verm: 1, pne: 0, img: "img/Thor.jpg" },
    { id: 17, nome: "Mel",      sp: "gato",   sx: "F", m: 6,  porte: "Pequeno", raca: "Tricolor",          temp: ["amoroso", "calmo"],                loc: "Vila Mariana, SP",   reg: "grande-sp", km: 5.1,  cast: 1, vac: 1, verm: 1, pne: 0, img: "img/gato em cadeira.jpg" },
    { id: 16, nome: "Pipoca",   sp: "cao",    sx: "F", m: 24, porte: "Pequeno", raca: "Spitz Mix",         temp: ["docil"],                           loc: "Santana, SP",        reg: "grande-sp", km: 8.4,  cast: 1, vac: 1, verm: 1, pne: 0, img: "img/Luna.jpg" },
    { id: 15, nome: "Amora",    sp: "cao",    sx: "F", m: 12, porte: "Médio",   raca: "Vira-lata",         temp: ["sociavel"],                        loc: "Tatuapé, SP",        reg: "grande-sp", km: 6.7,  cast: 1, vac: 1, verm: 1, pne: 0, img: "img/cachorro dormindo.jpg" },
    { id: 14, nome: "Frederico",sp: "coelho", sx: "M", m: 8,  porte: "Pequeno", raca: "Angorá",            temp: ["docil", "calmo"],                  loc: "Santo André, SP",    reg: "grande-sp", km: 14.0, cast: 0, vac: 1, verm: 1, pne: 0, img: "", emoji: "🐰", extra: "Fácil Cuidado" },
    { id: 13, nome: "Thor",     sp: "cao",    sx: "M", m: 3,  porte: "Grande",  raca: "Golden Retriever",  temp: ["brincalhao"],                      loc: "Moema, SP",          reg: "grande-sp", km: 4.3,  cast: 0, vac: 1, verm: 1, pne: 0, img: "img/Cachorro1.jpg" },
    { id: 12, nome: "Milo",     sp: "gato",   sx: "M", m: 30, porte: "Pequeno", raca: "Bicolor",           temp: ["independente"],                    loc: "Perdizes, SP",       reg: "grande-sp", km: 7.9,  cast: 1, vac: 1, verm: 1, pne: 0, img: "img/Milo.jpg" },
    { id: 11, nome: "Bidu",     sp: "cao",    sx: "M", m: 4,  porte: "Médio",   raca: "Vira-lata",         temp: ["brincalhao", "sociavel"],          loc: "Mooca, SP",          reg: "grande-sp", km: 9.6,  cast: 0, vac: 1, verm: 1, pne: 0, img: "img/cachorro2.jpg" },
    { id: 10, nome: "Duque",    sp: "cao",    sx: "M", m: 108,porte: "Grande",  raca: "Golden Retriever",  temp: ["calmo", "docil"],                  loc: "Butantã, SP",        reg: "grande-sp", km: 11.2, cast: 1, vac: 1, verm: 1, pne: 1, img: "img/cachorro e tigela.jpg", extra: "Sênior" },
    { id: 9,  nome: "Nina",     sp: "gato",   sx: "F", m: 10, porte: "Pequeno", raca: "Vira-lata",         temp: ["amoroso", "brincalhao"],           loc: "Guarulhos, SP",      reg: "grande-sp", km: 18.5, cast: 1, vac: 1, verm: 1, pne: 0, img: "img/gato e cachorro.jpg" },
    { id: 8,  nome: "Bolota",   sp: "cao",    sx: "F", m: 60, porte: "Médio",   raca: "Dachshund Mix",     temp: ["calmo", "amoroso"],                loc: "Lapa, SP",           reg: "grande-sp", km: 6.1,  cast: 1, vac: 1, verm: 1, pne: 0, img: "img/cachorro dormindo.jpg" },
    { id: 7,  nome: "Pepita",   sp: "cao",    sx: "F", m: 20, porte: "Pequeno", raca: "Poodle Mix",        temp: ["sociavel", "docil"],               loc: "Barão Geraldo, Campinas", reg: "campinas", km: 95, cast: 1, vac: 1, verm: 0, pne: 0, img: "img/Luna.jpg" },
    { id: 6,  nome: "Tigre",    sp: "gato",   sx: "M", m: 14, porte: "Médio",   raca: "Rajado",            temp: ["independente", "calmo"],           loc: "Cambuí, Campinas",   reg: "campinas",  km: 97,   cast: 1, vac: 1, verm: 1, pne: 0, img: "img/gato em cadeira.jpg" },
    { id: 5,  nome: "Caramelo", sp: "cao",    sx: "M", m: 36, porte: "Grande",  raca: "Vira-lata",         temp: ["brincalhao", "sociavel"],          loc: "Batel, Curitiba",    reg: "curitiba",  km: 408,  cast: 1, vac: 1, verm: 1, pne: 0, img: "img/Thor.jpg" }
  ];

  var TEMP = {
    docil: ["Dócil", "Dócil"], brincalhao: ["Brincalhão", "Brincalhona"], calmo: ["Calmo", "Calma"],
    sociavel: ["Sociável", "Sociável"], amoroso: ["Amoroso", "Amorosa"], independente: ["Independente", "Independente"]
  };

  var ICONE_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
  var ICONE_CORACAO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>';
  var ICONE_SETA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
  var ICONE_ESQ = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>';
  var ICONE_DIR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>';

  /* ---------- Elementos ---------- */
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  var grid = $("#grid");
  var form = $("#form-filtros");
  var campoNome = $("#f-nome");
  var campoTopo = $("#busca-header");
  var selLocal = $("#f-local");
  var selOrdem = $("#ordem");
  var elTotal = $("#total");
  var elAplicarN = $("#aplicar-n");
  var elVazio = $("#vazio");
  var elPager = $("#pager");
  var painel = $("#filtros");
  var btnAbrir = $("#abrir-filtros");
  var toastEl = $("#toast");

  var pagina = 1;
  var timerToast;

  /* ---------- Utilidades ---------- */
  function normalizar(t) {
    return String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  }

  function mostrarToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(timerToast);
    timerToast = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2600);
  }

  function idadeTexto(m) {
    if (m < 12) return m + (m === 1 ? " mês" : " meses");
    var a = Math.floor(m / 12);
    return a + (a === 1 ? " ano" : " anos");
  }

  function faixa(m) {
    if (m < 12) return "filhote";
    if (m < 36) return "jovem";
    if (m < 84) return "adulto";
    return "senior";
  }

  function marcados(nome) {
    return $$('input[name="' + nome + '"]:checked', form).map(function (i) { return i.value; });
  }

  function lerFavoritos() {
    try { return JSON.parse(localStorage.getItem("helpet-favoritos") || "[]"); } catch (e) { return []; }
  }

  function salvarFavoritos(lista) {
    try { localStorage.setItem("helpet-favoritos", JSON.stringify(lista)); } catch (e) { /* sem storage */ }
  }

  var favoritos = lerFavoritos();

  /* ---------- Filtragem ---------- */
  function filtrar() {
    var busca = normalizar(campoNome.value);
    var especies = marcados("especie");
    var sexo = ($('input[name="sexo"]:checked', form) || {}).value || "";
    var idades = marcados("idade");
    var portes = marcados("porte");
    var regiao = selLocal.value;
    var saude = marcados("saude");
    var temps = marcados("temp");

    var lista = PETS.filter(function (p) {
      if (busca && normalizar(p.nome).indexOf(busca) === -1) return false;
      if (especies.length && especies.indexOf(p.sp) === -1) return false;
      if (sexo && p.sx !== sexo) return false;
      if (idades.length && idades.indexOf(faixa(p.m)) === -1) return false;
      if (portes.length && portes.indexOf(p.porte) === -1) return false;
      if (regiao !== "todas" && p.reg !== regiao) return false;
      // Saúde: "castrado/vacinado/vermifugado" exigem o item; PNE é um recorte opcional
      for (var i = 0; i < saude.length; i++) {
        var s = saude[i];
        var chave = s === "castrado" ? "cast" : s === "vacinado" ? "vac" : s === "vermifugado" ? "verm" : "pne";
        if (!p[chave]) return false;
      }
      if (temps.length && !temps.some(function (t) { return p.temp.indexOf(t) !== -1; })) return false;
      return true;
    });

    var ordem = selOrdem.value;
    lista.sort(function (a, b) {
      if (ordem === "proximos") return a.km - b.km;
      if (ordem === "novos") return a.m - b.m;
      if (ordem === "nome") return a.nome.localeCompare(b.nome, "pt-BR");
      return b.id - a.id;
    });
    return lista;
  }

  /* ---------- Renderização ---------- */
  function cardHTML(p) {
    var feminino = p.sx === "F" ? 1 : 0;
    var temps = p.temp.map(function (t) { return TEMP[t][feminino]; });
    var partes = [p.raca, idadeTexto(p.m), temps.join(" e ")];
    if (p.extra) partes.push(p.extra);
    var ehFav = favoritos.indexOf(p.id) !== -1;
    var midia = p.img
      ? '<img src="' + p.img + '" alt="' + p.nome + ', ' + p.raca + '" loading="lazy">'
      : '<span class="pet-card__emoji" role="img" aria-label="' + p.nome + '">' + (p.emoji || "🐾") + "</span>";

    return '<li class="ct-pet-card">' +
      '<a class="pet-card__media" href="pet.html" tabindex="-1" aria-hidden="true">' + midia + "</a>" +
      '<button type="button" class="pet-card__fav' + (ehFav ? " is-fav" : "") + '" data-id="' + p.id + '" aria-pressed="' + ehFav + '" aria-label="Favoritar ' + p.nome + '">' + ICONE_CORACAO + "</button>" +
      '<div class="pet-card__body">' +
        '<div class="pet-card__top"><h3 class="pet-card__name">' + p.nome + '</h3><span class="pet-card__size">' + p.porte + "</span></div>" +
        '<p class="pet-card__meta">' + partes.join(" • ") + "</p>" +
        '<p class="pet-card__loc">' + ICONE_PIN + p.loc + " • " + p.km.toLocaleString("pt-BR", { minimumFractionDigits: p.km < 50 ? 1 : 0, maximumFractionDigits: 1 }) + " km</p>" +
        '<a class="pet-card__btn" href="pet.html">Conhecer &amp; Adotar ' + ICONE_SETA + "</a>" +
      "</div></li>";
  }

  function paginasVisiveis(atual, total) {
    if (total <= 5) {
      return Array.apply(null, Array(total)).map(function (_, i) { return i + 1; });
    }
    var set = [1, atual - 1, atual, atual + 1, total].filter(function (n) { return n >= 1 && n <= total; });
    set = set.filter(function (n, i) { return set.indexOf(n) === i; }).sort(function (a, b) { return a - b; });
    var saida = [];
    set.forEach(function (n, i) {
      if (i && n - set[i - 1] > 1) saida.push("...");
      saida.push(n);
    });
    return saida;
  }

  function renderPager(totalPaginas) {
    if (totalPaginas <= 1) { elPager.hidden = true; elPager.innerHTML = ""; return; }
    elPager.hidden = false;
    var html = '<button type="button" class="ct-pager__nav" data-ir="prev"' + (pagina === 1 ? " disabled" : "") + ">" + ICONE_ESQ + "<span>Anterior</span></button>";
    html += '<div class="pager__list">';
    paginasVisiveis(pagina, totalPaginas).forEach(function (n) {
      if (n === "...") html += '<span class="pager__dots" aria-hidden="true">…</span>';
      else html += '<button type="button" class="pager__page" data-ir="' + n + '"' + (n === pagina ? ' aria-current="page"' : "") + ' aria-label="Página ' + n + '">' + n + "</button>";
    });
    html += "</div>";
    html += '<button type="button" class="ct-pager__nav" data-ir="next"' + (pagina === totalPaginas ? " disabled" : "") + "><span>Próximo</span>" + ICONE_DIR + "</button>";
    elPager.innerHTML = html;
  }

  function render(rolar) {
    var lista = filtrar();
    var totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
    if (pagina > totalPaginas) pagina = totalPaginas;

    var inicio = (pagina - 1) * POR_PAGINA;
    var fatia = lista.slice(inicio, inicio + POR_PAGINA);

    grid.innerHTML = fatia.map(cardHTML).join("");
    grid.hidden = fatia.length === 0;
    elVazio.hidden = fatia.length !== 0;
    elTotal.textContent = lista.length;
    elAplicarN.textContent = lista.length;
    renderPager(totalPaginas);

    // Imagem quebrada vira emoji, sem layout quebrado
    $$(".pet-card__media img", grid).forEach(function (img) {
      img.addEventListener("error", function () {
        var span = document.createElement("span");
        span.className = "pet-card__emoji";
        span.textContent = "🐾";
        img.replaceWith(span);
      }, { once: true });
    });

    if (rolar) {
      var topo = $(".ct-results__bar");
      if (topo) topo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function resetarPagina() { pagina = 1; render(false); }

  /* ---------- Eventos ---------- */
  form.addEventListener("change", resetarPagina);
  selOrdem.addEventListener("change", resetarPagina);

  campoNome.addEventListener("input", function () {
    campoTopo.value = campoNome.value;
    resetarPagina();
  });

  campoTopo.addEventListener("input", function () {
    campoNome.value = campoTopo.value;
    resetarPagina();
  });

  $("#busca-topo").addEventListener("submit", function (e) {
    e.preventDefault();
    render(true);
  });

  form.addEventListener("reset", function () {
    // o reset nativo volta aos valores do HTML (padrões do design); depois re-renderiza
    setTimeout(function () {
      campoTopo.value = "";
      resetarPagina();
      mostrarToast("Filtros restaurados");
    }, 0);
  });

  $("#vazio-limpar").addEventListener("click", function () {
    form.reset();
  });

  $("#aplicar").addEventListener("click", function () {
    render(true);
    if (window.matchMedia("(max-width: 959px)").matches) {
      painel.classList.remove("is-open");
      btnAbrir.setAttribute("aria-expanded", "false");
    }
  });

  btnAbrir.addEventListener("click", function () {
    var aberto = painel.classList.toggle("is-open");
    btnAbrir.setAttribute("aria-expanded", String(aberto));
    if (aberto) painel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  elPager.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-ir]");
    if (!btn || btn.disabled) return;
    var alvo = btn.dataset.ir;
    if (alvo === "prev") pagina--;
    else if (alvo === "next") pagina++;
    else pagina = parseInt(alvo, 10);
    render(true);
  });

  grid.addEventListener("click", function (e) {
    var btn = e.target.closest(".pet-card__fav");
    if (!btn) return;
    var id = parseInt(btn.dataset.id, 10);
    var i = favoritos.indexOf(id);
    var pet = PETS.filter(function (p) { return p.id === id; })[0];
    if (i === -1) { favoritos.push(id); mostrarToast(pet.nome + " foi salvo nos favoritos"); }
    else { favoritos.splice(i, 1); mostrarToast(pet.nome + " saiu dos favoritos"); }
    salvarFavoritos(favoritos);
    btn.classList.toggle("is-fav", i === -1);
    btn.setAttribute("aria-pressed", String(i === -1));
  });

  $$('a[href="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  // Permite chegar de outras telas com ?q=nome
  try {
    var q = new URLSearchParams(location.search).get("q");
    if (q) { campoNome.value = q; campoTopo.value = q; }
  } catch (e) { /* sem URLSearchParams */ }

  render(false);
})();
