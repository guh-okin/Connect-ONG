function mostrarAviso(texto) {
  var aviso = document.getElementById("aviso");
  if (aviso == null) {
    return;
  }
  aviso.textContent = texto;
  aviso.classList.add("visivel");
  setTimeout(function () {
    aviso.classList.remove("visivel");
  }, 2500);
}

var botoesAviso = document.querySelectorAll("[data-aviso]");
for (var a = 0; a < botoesAviso.length; a++) {
  botoesAviso[a].addEventListener("click", function () {
    mostrarAviso(this.dataset.aviso);
  });
}

var formsBusca = document.querySelectorAll(".busca-topo");
for (var b = 0; b < formsBusca.length; b++) {
  formsBusca[b].addEventListener("submit", function (evento) {
    evento.preventDefault();
  });
}

var botoesOlho = document.querySelectorAll(".olho");
for (var c = 0; c < botoesOlho.length; c++) {
  botoesOlho[c].addEventListener("click", function () {
    var campo = document.getElementById(this.dataset.alvo);
    var icone = this.querySelector("i");
    if (campo.type == "password") {
      campo.type = "text";
      icone.className = "fa-regular fa-eye-slash";
    } else {
      campo.type = "password";
      icone.className = "fa-regular fa-eye";
    }
  });
}

var botoesAba = document.querySelectorAll(".abas button");
for (var d = 0; d < botoesAba.length; d++) {
  botoesAba[d].addEventListener("click", function () {
    var irmaos = this.parentElement.children;
    for (var e = 0; e < irmaos.length; e++) {
      irmaos[e].classList.remove("ativo");
    }
    this.classList.add("ativo");
  });
}

var botoesFavorito = document.querySelectorAll(".favorito");
for (var f = 0; f < botoesFavorito.length; f++) {
  botoesFavorito[f].addEventListener("click", function () {
    var icone = this.querySelector("i");
    this.classList.toggle("ativo");
    if (this.classList.contains("ativo")) {
      icone.className = "fa-solid fa-heart";
    } else {
      icone.className = "fa-regular fa-heart";
    }
  });
}

var formCadastro = document.getElementById("form-cadastro");
if (formCadastro != null) {
  var campoSenha = document.getElementById("senha");
  var textoForca = document.getElementById("texto-forca");
  var barraForca = document.getElementById("barra-forca");
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

    if (senha == "") {
      textoForca.textContent = "Digite uma senha";
      barraForca.style.width = "0%";
    } else if (pontos <= 1) {
      textoForca.textContent = "Fraca";
      barraForca.style.width = "30%";
      barraForca.style.background = "#d32f2f";
    } else if (pontos <= 3) {
      textoForca.textContent = "Média";
      barraForca.style.width = "65%";
      barraForca.style.background = "#f5a300";
    } else {
      textoForca.textContent = "Forte";
      barraForca.style.width = "100%";
      barraForca.style.background = "#34c45a";
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

var botoesMenuPerfil = document.querySelectorAll(".menu-perfil button");
for (var g = 0; g < botoesMenuPerfil.length; g++) {
  botoesMenuPerfil[g].addEventListener("click", function () {
    for (var h = 0; h < botoesMenuPerfil.length; h++) {
      botoesMenuPerfil[h].classList.remove("ativo");
    }
    this.classList.add("ativo");
  });
}

var fotoPrincipal = document.getElementById("foto-principal");
if (fotoPrincipal != null) {
  var miniaturas = document.querySelectorAll(".miniaturas-pet button");
  var contadorFotos = document.getElementById("contador-fotos");

  for (var i = 0; i < miniaturas.length; i++) {
    miniaturas[i].addEventListener("click", function () {
      for (var j = 0; j < miniaturas.length; j++) {
        miniaturas[j].classList.remove("ativo");
      }
      this.classList.add("ativo");
      fotoPrincipal.src = this.querySelector("img").src;
      contadorFotos.textContent = this.dataset.numero + "/4 fotos";
    });
  }
}
