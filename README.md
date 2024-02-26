# Lista de Tarefas

Este é um projeto de Lista de Tarefas onde os usuários podem criar, editar ou excluir tarefas. Cada tarefa tem um nome, descrição, usuário atribuído e status. Além disso, o projeto oferece funcionalidades para cadastrar, editar e excluir usuários e status.

## Tecnologias Utilizadas

- **Backend/API:**
  - Linguagem: C#
  - Framework: .NET
  - ORM: Entity Framework
  - Banco de Dados: SQL Server

- **Frontend:**
  - Biblioteca: React.js
  - Linguagem: TypeScript

## Funcionalidades

### Tarefas

- **Criar Tarefa:** Os usuários podem criar uma nova tarefa, especificando seu nome, descrição, usuário atribuído e status.
- **Editar Tarefa:** É possível editar uma tarefa existente, alterando seu nome, descrição, usuário atribuído e/ou status.
- **Excluir Tarefa:** Os usuários podem excluir uma tarefa existente.

### Usuários

- **Cadastrar Usuário:** Administradores podem cadastrar novos usuários no sistema.
- **Editar Usuário:** É possível editar as informações de um usuário existente, como nome, e-mail, etc.
- **Excluir Usuário:** Administradores podem excluir usuários do sistema.

### Status

- **Cadastrar Status:** Administradores podem adicionar novos status para as tarefas, como "A fazer", "Em andamento", "Concluído", etc.
- **Editar Status:** É possível editar os nomes dos status existentes.
- **Excluir Status:** Administradores podem remover status do sistema.

## Configuração do Projeto

1. **Backend/API:**
    - Clone este repositório.
    - Certifique-se de ter o .NET instalado em sua máquina.
    - Navegue até o diretório `services/APIWeb` e execute `dotnet run` para iniciar o servidor.

2. **Frontend:**
    - Clone este repositório, se ainda não o fez.
    - Certifique-se de ter o Node.js e o npm instalados.
    - Navegue até o diretório `UI/keevo-software` e execute `npm install` para instalar as dependências.
    - Após a instalação, execute `npm start` para iniciar o servidor de desenvolvimento do React.

3. **Banco de Dados:**
    - Certifique-se de ter o SQL Server instalado.
    - Execute os scripts de criação do banco de dados e das tabelas disponíveis no diretório `database`.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue caso encontre algum problema ou enviar um pull request com melhorias.

