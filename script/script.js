var toast = document.getElementById("toast");
var tempoToast;

function mostrarToast(texto) {
  if (toast == null) {
    return;
  }
  toast.textContent = texto;
  toast.classList.add("is-show");
  clearTimeout(tempoToast);
  tempoToast = setTimeout(function () {
    toast.classList.remove("is-show");
  }, 2600);
}

var linksVazios = document.querySelectorAll('a[href="#"]');
for (var a = 0; a < linksVazios.length; a++) {
  linksVazios[a].addEventListener("click", function (evento) {
    evento.preventDefault();
  });
}

var botoesToast = document.querySelectorAll("[data-toast]");
for (var b = 0; b < botoesToast.length; b++) {
  botoesToast[b].addEventListener("click", function () {
    mostrarToast(this.dataset.toast);
  });
}

var botoesOlho = document.querySelectorAll(".input__toggle");
for (var c = 0; c < botoesOlho.length; c++) {
  botoesOlho[c].addEventListener("click", function () {
    var campo = document.getElementById(this.dataset.target);
    var icones = this.querySelectorAll("svg");
    if (campo.type == "password") {
      campo.type = "text";
      icones[0].hidden = true;
      icones[1].hidden = false;
    } else {
      campo.type = "password";
      icones[0].hidden = false;
      icones[1].hidden = true;
    }
  });
}

var botoesFavorito = document.querySelectorAll("[data-favorito]");
for (var d = 0; d < botoesFavorito.length; d++) {
  botoesFavorito[d].addEventListener("click", function () {
    this.classList.toggle("is-favorite");
    this.setAttribute("aria-pressed", this.classList.contains("is-favorite"));
  });
}

var formCadastro = document.getElementById("form-cadastro");
if (formCadastro != null) {
  var campoSenha = document.getElementById("senha");
  var textoForca = document.getElementById("forca-texto");
  var medidor = document.getElementById("forca-medidor");
  var erroCadastro = document.getElementById("erro-form");

  campoSenha.addEventListener("input", function () {
    var senha = campoSenha.value;
    var pontos = 0;
    if (senha.length >= 8) {
      pontos = pontos + 1;
    }
    if (/[0-9]/.test(senha)) {
      pontos = pontos + 1;
    }
    if (/[A-Z]/.test(senha)) {
      pontos = pontos + 1;
    }
    if (/[^A-Za-z0-9]/.test(senha)) {
      pontos = pontos + 1;
    }

    medidor.value = pontos;
    if (senha == "") {
      textoForca.textContent = "Digite uma senha";
    } else if (pontos <= 1) {
      textoForca.textContent = "Fraca";
    } else if (pontos <= 3) {
      textoForca.textContent = "Média";
    } else {
      textoForca.textContent = "Forte";
    }
  });

  formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = campoSenha.value;
    var confirmar = document.getElementById("confirmar").value;
    var termos = document.getElementById("termos").checked;

    if (nome == "" || email == "") {
      erroCadastro.textContent = "Preencha o nome e o e-mail.";
    } else if (email.indexOf("@") == -1) {
      erroCadastro.textContent = "Digite um e-mail válido.";
    } else if (senha.length < 8) {
      erroCadastro.textContent = "A senha precisa ter no mínimo 8 caracteres.";
    } else if (senha != confirmar) {
      erroCadastro.textContent = "As senhas não são iguais.";
    } else if (termos == false) {
      erroCadastro.textContent = "Aceite os Termos de Uso para continuar.";
    } else {
      erroCadastro.textContent = "";
      window.location.href = "login.html";
    }
  });
}

var formLogin = document.getElementById("form-login");
if (formLogin != null) {
  var erroLogin = document.getElementById("erro-form");

  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (email == "" || senha == "") {
      erroLogin.textContent = "Preencha o e-mail e a senha.";
    } else if (email.indexOf("@") == -1) {
      erroLogin.textContent = "Digite um e-mail válido.";
    } else {
      erroLogin.textContent = "";
      window.location.href = "perfil.html";
    }
  });
}

var itensMenu = document.querySelectorAll(".panel-menu a");
for (var e = 0; e < itensMenu.length; e++) {
  itensMenu[e].addEventListener("click", function (evento) {
    evento.preventDefault();
    for (var f = 0; f < itensMenu.length; f++) {
      itensMenu[f].removeAttribute("aria-current");
    }
    this.setAttribute("aria-current", "true");
  });
}

var fotoPrincipal = document.getElementById("foto-principal");
if (fotoPrincipal != null) {
  var miniaturas = document.querySelectorAll(".gallery__thumb");
  var contadorFotos = document.getElementById("contador-fotos");

  for (var g = 0; g < miniaturas.length; g++) {
    miniaturas[g].addEventListener("click", function () {
      for (var h = 0; h < miniaturas.length; h++) {
        miniaturas[h].classList.remove("is-active");
      }
      this.classList.add("is-active");
      fotoPrincipal.src = this.dataset.foto;
      contadorFotos.textContent = this.dataset.numero + "/4 fotos";
    });
  }
}
