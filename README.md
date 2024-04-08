## CoreNotes Front-end Challange

Consiste em um site responsivo e performático para gerenciamento de Notes(Anotações) do CoreNotes, desenvolvido utilizando React com Typescript, estilizado com o pre-processador Sass, integrado com a Api utilizando Axios, gerencimaneto de estados com ContextAPI para uma melhor concentração das mudanças de estados, evitando prop drilling, garantindo uma boa performance e uma boa comunicação entre os componentes. Ao rodar o projeto e acessar localhost:3000, você terá a tela de login, para logar ou criar conta, e em seguida ser redirecionado para a tela home e poder iniciar as criações e gerenciamentos de anotações com o CoreNotes. Nesta mesma tela, você terá todas as funcionalidades disponíveis, utilizando este site conectado a Api (<a href="https://github.com/victor-figueiredo/corenotes-api-challange-php">Link da Api</a>), o usuário poderá:

1. Criar uma anotação, atualizar, excluir e listar, podendo filtrar pelo título ou cor.
2. É possível também marcar uma anotação como favorita, e essas anotações ficarão no topo da sua lista para ficar acessível.
3. Definir uma cor para cada anotação, podendo ser encontrada pela sua cor.

O site foi desenvolvido focado em detalhes para que o usuário possa ter uma boa experiência, design atraente, como proposto no figma pela CoreLab, as mudanças são feitas em tempo real e armazenadas no banco, porém sem necessidade de fazer uma nova busca dos dados sempre que for feita uma mudança, sendo assim reduzindo requisições desnecessárias e poupando o consumo do banco de dados.

## Que tal conferirmos como ficou o resultado? Segue os passos para rodar o front na sua máquina e conectar com a Api(<a href="https://github.com/victor-figueiredo/corenotes-api-challange-php">link</a>).

## Passos para rodar este Front-end no seu computador

### Pré-requisitos
- Node: ^16.15.0
- NPM: ^8.5.5
- Framework: React TS

### 1 - Clonando o repositório
```bash
git clone git@github.com:victor-figueiredo/corenotes-web-challange-react.git
cd corenotes-web-challange-react
```

### 2 - Baixar e instalar as dependências
```bash
npm install
```

### 3 - Iniciar o servidor
```bash
npm run dev
```

### 4 - Rodando a api juntamente, você poderá usufruir dos recursos disponíveis na plataforma.
<a href="https://github.com/victor-figueiredo/corenotes-api-challange-php">(Link da api)</a>
Lá você terá o passo a passo para conectar a api na sua máquina.

#### 👋 Eu, Victor Figueiredo, sou grato a Corelab pela oportunidade, conhecer um pouco desta empresa e poder participar deste processo é muito satisfatório.
