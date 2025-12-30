## 📌 Descrição Geral do Projeto

Este projeto foi desenvolvido utilizando *Next.js, TypeScript e Tailwind CSS*, estruturado para oferecer uma aplicação moderna, organizada e escalável.  
No back-end, foram criadas rotas de API seguindo o padrão *REST, utilizando os métodos **GET, POST e PATCH*.  
No front-end, a biblioteca *Leaflet* é responsável por capturar latitude e longitude e enviar esses dados para o servidor, onde as informações são registradas no banco de dados através do *Prisma* conectado ao *PostgreSQL*.

Essa combinação permite uma aplicação consistente, tipada, com melhor manutenção e segurança na troca de dados entre cliente e servidor.

---

## 🗺️ Mapa, Localização e Banco de Dados
- Captura de coordenadas (latitude/longitude) via Leaflet (front-end)
- Envio dos dados para o servidor via rotas REST
- Registro das informações no banco utilizando Prisma + PostgreSQL
- Estrutura pensada para escalabilidade e organização do código

---

## ♻️ Diferencial do Projeto

O projeto utiliza um sistema de *exclusão lógica* aplicado através do método *HTTP PATCH*:

✔ Quando o usuário “exclui” um mapa ou ponto, o registro *não é apagado do banco*  
✔ O sistema altera o campo status para false  
✔ O item deixa de aparecer na interface, como se estivesse realmente excluído  
✔ O registro é mantido para *histórico, auditoria e controle interno*

> Isso evita perda de dados, facilita rastreamento e garante maior segurança estrutural ao sistema.

---

## 🛠️ Tecnologias Utilizadas
- *Next.js*
- *TypeScript*
- *Tailwind CSS*
- *Leaflet*
- *Prisma ORM*
- *PostgreSQL*
- *REST API (GET, POST e PATCH)*

---
