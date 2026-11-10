# Connect ONG
 
Plataforma digital para facilitar a adoção de animais e as doações para ONGs de proteção animal. Projeto de pesquisa desenvolvido em HTML, CSS e JavaScript.
 
## Informações do trabalho
 
- **Alunos:** Gustavo Côrrea da Silva e Gustavo Mayer da Silva
- **Turma:** Técnico em Informática 62 1
- **Site (GitHub Pages):** https://guh-okin.github.io/Connect-ONG/
- **Repositório:** https://github.com/guh-okin/Connect-ONG

## Sobre o projeto

O Connect ONG nasceu como um projeto de pesquisa com o objetivo de desenvolver uma plataforma digital que torne a adoção de animais e as doações para ONGs mais simples, rápidas e acessíveis. Muitos animais continuam à espera de um lar, e muitas organizações de proteção animal dependem da ajuda de voluntários e doadores, mas nem sempre conseguem divulgar seu trabalho ou alcançar quem gostaria de ajudar. Pensando nisso, o site reúne em um só lugar os pets disponíveis para adoção, as informações de cada um deles e a possibilidade de apoiar as ONGs por meio de doações.

Ao longo do site, o usuário pode criar uma conta, fazer login, explorar o catálogo de animais, conhecer a história e as características de cada pet e escolher como contribuir. A proposta é aproximar quem quer adotar ou ajudar as instituições que cuidam dos animais, incentivando a adoção responsável e fortalecendo o trabalho das ONGs.

## Tecnologias
 
- HTML
- CSS
- JavaScript

## Como abrir
 
Acesse o link do site acima, ou baixe o repositório e abra o arquivo `index.html` no navegador.

## Checklist de avaliação
 
| Critério | Situação | Por quê |
| --- | --- | --- |
| Deploy e funcionamento | ✅ Atende | O site está publicado no GitHub Pages. A página inicial é o `index.html`, os arquivos de CSS e JS ficam nas pastas `estilo/` e `script/` e são carregados com caminhos relativos, sem tela em branco ou pasta exposta. |
| Interatividade sem recarregamento | ✅ Atende | Os formulários de cadastro e login, os filtros do catálogo e os links vazios usam `preventDefault()`. Os botões do catálogo e da doação (favoritar, escolher valor, alterar quantidade, remover item, limpar) atualizam a tela com JavaScript, sem recarregar a página. |
| Persistência de dados | ⚠️ Parcial | Os pets favoritados no catálogo são salvos no `localStorage` e continuam marcados depois de atualizar a página (F5). As demais telas ainda não guardam dados. |
| Estabilidade do console | ✅ Atende | Ao abrir cada página, o console não mostra nenhum erro em vermelho significante. |
| Adaptabilidade e responsividade | ✅ Atende | Todas as páginas usam a tag `viewport` e `@media` nos CSS, e em tela de celular não há barra de rolagem horizontal. Todas as imagens têm `alt`, o idioma da página é `pt-BR` e o código usa tags semânticas e atributos `aria-*` para leitores de tela. |
 
 
