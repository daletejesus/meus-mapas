
## 📌 Descrição Geral do Projeto

Este projeto foi desenvolvido utilizando *Next.js, TypeScript e Tailwind CSS*, estruturado para oferecer uma aplicação moderna, organizada e escalável.  
No back-end, foram criadas rotas de API seguindo o padrão *REST, utilizando os métodos **GET, POST e PATCH*.  
No front-end, a biblioteca *Leaflet* é responsável por renderizar o mapa à partir dos pontos enviados pelo usuário, onde as informações são registradas no banco de dados através do *Prisma* conectado ao *PostgreSQL*.

Essa combinação permite uma aplicação consistente, tipada, com melhor manutenção e segurança na troca de dados entre cliente e servidor.

---

## 🛠️ Tecnologias Utilizadas
- *Next.js*
- *TypeScript*
- *Tailwind CSS*
- *Leaflet*
- *Prisma ORM*
- *PostgreSQL*
- *Motion (Animações)*
- *REST API (GET, POST e PATCH)*

---

## ⚙️ Funcionalides

- Criação de mapa a partir de um nome dado pelo usuário;
- Listagem de todos os mapas ativos no banco de dados;
- Possibilidade de excluir um mapa ativo (exclusão lógica);
- Criação de pontos físicos relacionados ao mapa;
- Listagem de todos os pontos ativos no banco de dados;
- Exclusão lógica dos pontos ativos

## ♻️ Diferencial do Projeto

- Deploy da aplicação (https://meus-mapas.vercel.app/);
- Testes end-to-end das funcionalidades disponíveis;
- Colletion das rotas HTTP para o Postman;
- Animações utilizando o motion.dev;
- Exlusão lógica dos items ao invés de exclusão física;

## 🚀 Como executar o projeto

Este projeto foi desenvolvido utilizando Next.js, Prisma ORM e PostgreSQL.

## 📋 Pré-requisitos

Antes de iniciar, você precisará ter instalado em sua máquina:

Node.js (versão 18 ou superior)

npm ou yarn

PostgreSQL

Git


## 📦 Clonando o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

## 📥 Instalando as dependências
npm install

## ⚙️ Configurando as variáveis de ambiente

Crie um arquivo .env na raiz do projeto e configure a conexão com o banco de dados:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/meus_mapas"

Adicione também a url base do projeto:

NEXT_PUBLIC_API_URL="http://localhost:3000"


## 🗄️ Configurando o Prisma

Execute os comandos abaixo para configurar o banco de dados:

npx prisma generate
npx prisma migrate dev


prisma generate → gera o Prisma Client

prisma migrate dev → cria e aplica as migrations no banco de dados

Opcionalmente, para visualizar os dados no Prisma Studio:

npx prisma studio

## ▶️ Executando o projeto

Para iniciar o servidor em ambiente de desenvolvimento:

npm run dev

A aplicação estará disponível em:

http://localhost:3000


## ▶️👨‍🔬 Executando os testes e2e

Foi criado um arquivo chamado testes.spec.ts com os testes de todas as telas e rotas HTTP disponíveis no projeto.

Para executar os testes end-to-end, apenas execute no terminal do projeto a seguinte instrução:

npm run test:e2e

Ao executar, será executado um arquivo seed para limpar o banco de dados para testar inclusões e retornos de dados de teste, sendo possível acompanhar o resultado de cada teste pelo terminal.
