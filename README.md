<a name="tabela-de-conteúdos"></a>

<h1 align="center">
  Pokédex Angular
</h1>

<p align="center">
  Aplicação de Pokédex: Navegue pelos pokémons, visualize cards 3D interativos, filtre por tipo e busque por nome.
</p>

<p align="center">
  <a href="#sobre">Sobre</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#links">Links Relevantes</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#techs">Tecnologias Utilizadas</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#install">Instalação e Uso</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#devs">Desenvolvedor</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#terms">Termos de Uso</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

<a name="sobre"></a>

## 1. Sobre

- Esta aplicação é uma Pokédex interativa desenvolvida em Angular 20.  
- Permite visualizar pokémons em cards 3D que reagem ao movimento do mouse, além de buscar por nome, filtrar por tipo e navegar pelas páginas da lista.

<a name="links"></a>

## 2. Links Relevantes

- [Link da Aplicação](https://pokedex-pipk4mf64-gabrielfrays-projects.vercel.app/)

<a name="techs"></a>

## 3. Tecnologias Utilizadas

### Frontend:

- [Angular 20](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [RxJS](https://rxjs.dev/)
- [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) (para efeito 3D nos cards)
- [Typescript](https://www.typescriptlang.org/)
- [SCSS](https://sass-lang.com/)
- [PokéAPI](https://pokeapi.co/) (API de dados de Pokémon)

### Extras:

- Cards 3D interativos usando CSS e eventos de mouse
- Sistema de paginação com `MatPaginator`
- Filtros por tipo de Pokémon
- Skeleton loader para carregamento de cards

<a name="install"></a>

## 4. Instalação e Uso

### 4.1 Requisitos:
- Node.js a partir da versão 18
- Angular CLI
- Gerenciador de pacotes `yarn` ou `npm`

### 4.2 Instalação
4.2.1 - Após clonar o repositório, instale as dependências:  
```bash
yarn install
# ou
npm install
