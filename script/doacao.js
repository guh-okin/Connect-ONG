/* =========================================================
   Helpet - Doação de alimentos e ração
   Simulador, carrinho de doação, logística, Pix e confirmação
   ========================================================= */
(function () {
  "use strict";

  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };

  var brl = function (n) {
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  /* ---------- Toast ---------- */
  var toastEl = $("#toast");
  var timerToast;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(timerToast);
    timerToast = setTimeout(function () { toastEl.classList.remove("is-visible"); }, 2800);
  }

  $$('a[href="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  /* ---------- Estado da doação ---------- */
  var DESTINO_PADRAO = "Fundo Geral de Maior Urgência";
  var itens = {};            // chave -> { nome, preco, qtd }
  var destino = DESTINO_PADRAO;
  var modo = "coleta";       // coleta | ponto
  var simKg = 15;

  var elItens = $("#itens");
  var elVazio = $("#itens-vazio");
  var elTotal = $("#total");
  var elDestino = $("#destino");
  var elTaxa = $("#taxa");

  function total() {
    return Object.keys(itens).reduce(function (soma, k) { return soma + itens[k].preco * itens[k].qtd; }, 0);
  }

  function renderResumo() {
    var chaves = Object.keys(itens);
    elVazio.hidden = chaves.length !== 0;
    elItens.innerHTML = chaves.map(function (k) {
      var it = itens[k];
      return '<li class="item" data-key="' + k + '">' +
        '<span class="item__name">' + it.nome + "</span>" +
        '<span class="item__qty">' +
          '<button type="button" data-acao="menos" aria-label="Diminuir ' + it.nome + '">&minus;</button>' +
          "<span>" + it.qtd + "</span>" +
          '<button type="button" data-acao="mais" aria-label="Aumentar ' + it.nome + '">+</button>' +
        "</span>" +
        '<span class="item__price">' + brl(it.preco * it.qtd) + "</span></li>";
    }).join("");

    elTotal.textContent = brl(total());
    elDestino.textContent = destino;
    elTaxa.textContent = "Gratuita";

    // Botões "Adicionar" refletem o que está no resumo
    $$(".product").forEach(function (card) {
      var botao = $(".product__add", card);
      var noResumo = !!itens[card.dataset.produto];
      botao.classList.toggle("is-added", noResumo);
      $("span", botao).textContent = noResumo ? "Adicionado (trocar opção)" : "Adicionar à Doação";
    });
  }

  /* ---------- Simulador ---------- */
  var IMPACTO = {
    5:  "5 kg de ração alimentam 1 cão resgatado por 2 semanas inteiras.",
    15: "15 kg de ração alimentam 3 cães resgatados por 2 semanas inteiras.",
    30: "30 kg de ração alimentam 6 cães resgatados por 2 semanas inteiras.",
    60: "60 kg de ração alimentam 12 cães resgatados por 2 semanas inteiras."
  };

  function aplicarSimulador(kg, preco, avisar) {
    simKg = kg;
    $$(".sim-opt").forEach(function (b) {
      var ativo = parseInt(b.dataset.kg, 10) === kg;
      b.classList.toggle("is-selected", ativo);
      b.setAttribute("aria-checked", String(ativo));
    });
    $("#sim-titulo").textContent = IMPACTO[kg];
    itens.sim = { nome: "Pacote Ração Solidária (" + kg + "kg)", preco: preco, qtd: 1 };
    renderResumo();
    if (avisar) toast("Doação de " + kg + " kg atualizada no resumo");
  }

  $("#sim-options").addEventListener("click", function (e) {
    var b = e.target.closest(".sim-opt");
    if (!b) return;
    aplicarSimulador(parseInt(b.dataset.kg, 10), parseFloat(b.dataset.preco), true);
  });

  /* ---------- Produtos ---------- */
  $$(".product").forEach(function (card) {
    $(".product__add", card).addEventListener("click", function () {
      var escolhido = $('input[type="radio"]:checked', card);
      var chave = card.dataset.produto;
      var jaTinha = itens[chave];
      itens[chave] = { nome: escolhido.value, preco: parseFloat(escolhido.dataset.preco), qtd: jaTinha ? jaTinha.qtd : 1 };
      renderResumo();
      toast(escolhido.value + (jaTinha ? " atualizado" : " adicionado à doação"));
    });
  });

  /* ---------- Resumo: quantidade e remover ---------- */
  elItens.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-acao]");
    if (!btn) return;
    var li = btn.closest(".item");
    var chave = li.dataset.key;
    var it = itens[chave];
    if (btn.dataset.acao === "mais") {
      if (it.qtd < 20) it.qtd++;
    } else {
      it.qtd--;
      if (it.qtd <= 0) {
        delete itens[chave];
        if (chave === "sim") {
          $$(".sim-opt").forEach(function (b) { b.classList.remove("is-selected"); b.setAttribute("aria-checked", "false"); });
        }
      }
    }
    renderResumo();
  });

  $("#limpar-doacao").addEventListener("click", function () {
    itens = {};
    destino = DESTINO_PADRAO;
    $$(".ngo").forEach(function (n) { n.classList.remove("is-chosen"); });
    $$(".ngo__btn span").forEach(function (s) { s.textContent = "Apoiar este abrigo agora"; });
    $$(".sim-opt").forEach(function (b) { b.classList.remove("is-selected"); b.setAttribute("aria-checked", "false"); });
    renderResumo();
    toast("Resumo da doação limpo");
  });

  /* ---------- ONGs críticas ---------- */
  $$(".ngo").forEach(function (card) {
    $(".ngo__btn", card).addEventListener("click", function () {
      var nome = card.dataset.ong;
      $$(".ngo").forEach(function (n) {
        n.classList.remove("is-chosen");
        $(".ngo__btn span", n).textContent = "Apoiar este abrigo agora";
      });
      card.classList.add("is-chosen");
      $(".ngo__btn span", card).textContent = "Apoiando este abrigo";
      destino = nome;
      // Se a doação estiver vazia, já sugere o pacote padrão do simulador
      if (!Object.keys(itens).length) aplicarSimulador(simKg, precoDoKg(simKg), false);
      renderResumo();
      toast("Sua doação será destinada ao " + nome);
      $(".dn-summary").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  function precoDoKg(kg) {
    var b = $('.sim-opt[data-kg="' + kg + '"]');
    return parseFloat(b.dataset.preco);
  }

  /* ---------- Pix ---------- */
  $("#copiar-pix").addEventListener("click", function () {
    var chave = $("#pix-chave").textContent.trim();
    var ok = function () { toast("Chave Pix copiada: " + chave); };
    var fallback = function () {
      var t = document.createElement("textarea");
      t.value = chave;
      t.setAttribute("readonly", "");
      t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t);
      t.select();
      var copiou = false;
      try { copiou = document.execCommand("copy"); } catch (e) { copiou = false; }
      document.body.removeChild(t);
      if (copiou) ok(); else toast("Não foi possível copiar. Chave: " + chave);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(chave).then(ok, fallback);
    } else {
      fallback();
    }
  });

  /* ---------- Abas do topo ---------- */
  $("#aba-resgate").addEventListener("click", function () {
    toast("O cadastro de animais para resgate chega em breve");
  });

  /* ---------- Logística ---------- */
  $$(".delivery__opt").forEach(function (b) {
    b.addEventListener("click", function () {
      modo = b.dataset.modo;
      $$(".delivery__opt").forEach(function (o) {
        var ativo = o === b;
        o.classList.toggle("is-selected", ativo);
        o.setAttribute("aria-checked", String(ativo));
      });
      $("#campos-coleta").hidden = modo !== "coleta";
      $("#campos-ponto").hidden = modo !== "ponto";
      renderResumo();
    });
  });

  var campoCep = $("#cep");
  campoCep.addEventListener("input", function () {
    var d = campoCep.value.replace(/\D/g, "").slice(0, 8);
    campoCep.value = d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
  });

  var campoData = $("#data");
  (function definirMinimo() {
    var h = new Date();
    var mm = String(h.getMonth() + 1).padStart(2, "0");
    var dd = String(h.getDate()).padStart(2, "0");
    campoData.min = h.getFullYear() + "-" + mm + "-" + dd;
  })();

  function erro(campoId, erroId, msg) {
    var c = $("#" + campoId);
    $("#" + erroId).textContent = msg || "";
    if (msg) c.setAttribute("aria-invalid", "true"); else c.removeAttribute("aria-invalid");
    return !msg;
  }

  ["endereco", "cep", "data"].forEach(function (id) {
    $("#" + id).addEventListener("input", function () { erro(id, "erro-" + id, ""); });
  });

  function validarColeta() {
    var ok = true;
    var primeiroInvalido = null;
    function checar(id, cond, msg) {
      var valido = erro(id, "erro-" + id, cond ? "" : msg);
      if (!valido) { ok = false; if (!primeiroInvalido) primeiroInvalido = $("#" + id); }
    }
    checar("endereco", $("#endereco").value.trim().length >= 5, "Informe a rua e o número para a retirada.");
    checar("cep", /^\d{5}-\d{3}$/.test(campoCep.value), "Digite um CEP válido (00000-000).");
    var d = campoData.value;
    checar("data", d && d >= campoData.min, d ? "Escolha uma data a partir de hoje." : "Escolha a data da coleta.");
    if (primeiroInvalido) primeiroInvalido.focus();
    return ok;
  }

  /* ---------- Confirmar ---------- */
  var modal = $("#modal");
  var ultimoFoco = null;

  $("#prosseguir").addEventListener("click", function () {
    if (!Object.keys(itens).length) {
      toast("Adicione ao menos um item à doação para continuar");
      return;
    }
    if (modo === "coleta" && !validarColeta()) {
      toast("Revise os dados da coleta");
      return;
    }
    var qtd = Object.keys(itens).reduce(function (s, k) { return s + itens[k].qtd; }, 0);
    var forma = modo === "coleta" ? "coleta na sua residência" : "entrega em " + $("#ponto").value;
    $("#modal-texto").textContent =
      qtd + (qtd === 1 ? " item" : " itens") + " no valor de " + brl(total()) +
      " serão destinados a: " + destino + ". Forma de entrega: " + forma +
      ". Seu certificado digital chegará por e-mail após a confirmação.";
    ultimoFoco = document.activeElement;
    modal.hidden = false;
    $("#modal-fechar").focus();
  });

  function fecharModal() {
    modal.hidden = true;
    if (ultimoFoco) ultimoFoco.focus();
  }

  $("#modal-fechar").addEventListener("click", function () {
    fecharModal();
    itens = {};
    destino = DESTINO_PADRAO;
    $$(".ngo").forEach(function (n) { n.classList.remove("is-chosen"); });
    $$(".ngo__btn span").forEach(function (s) { s.textContent = "Apoiar este abrigo agora"; });
    $$(".sim-opt").forEach(function (b) { b.classList.remove("is-selected"); b.setAttribute("aria-checked", "false"); });
    $("#form-logistica").reset();
    renderResumo();
    toast("Obrigado por encher uma tigela hoje!");
  });

  modal.addEventListener("click", function (e) { if (e.target === modal) fecharModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) fecharModal();
  });

  /* ---------- Meta e números animados ---------- */
  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setTimeout(function () { $("#meta-barra").style.width = "78%"; }, reduzir ? 0 : 250);

  function contar(el) {
    var alvo = parseInt(el.dataset.count, 10);
    var sufixo = el.dataset.suffix || "";
    if (reduzir) { el.textContent = alvo.toLocaleString("pt-BR") + sufixo; return; }
    var inicio = null;
    var duracao = 1100;
    function passo(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / duracao, 1);
      var v = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString("pt-BR") + sufixo;
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  var contadores = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { contar(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    contadores.forEach(function (c) { obs.observe(c); });
  }

  /* ---------- Início: simulador em 15 kg, como no design ---------- */
  aplicarSimulador(15, 124, false);
})();
