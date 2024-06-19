# MAC0350 Campus-SportNet ⚽

- A próxima tendência para atletas e torcedores das mais badaladas universidades brasileiras. 
- Cansado de perder um jogo de sua atlética?
- Cadastre sua conta e não perca mais nenhum evento!
- Participe de festas, jogos e saiba de tudo que ocorre na vida universitária
- Cadastre sua conta e junte-se a essa comunidade 🥇

<h2>Tecnologias</h2>

<a href="https://react.dev" target=”_blank”>![React](https://skillicons.dev/icons?i=react)</a>
<a href="https://ktor.io" target=”_blank”>![KTOR](https://skillicons.dev/icons?i=ktor)</a>
<a href="https://www.postgresql.org" target=”_blank”>![PostgreSQL](https://skillicons.dev/icons?i=postgresql)</a>

<h2>Execução</h2>

<h3>Para executar o front-end, utilize: </h3>

```
cd csn-react-front
npm start
```

<h3>Para executar o back-end, digite:</h3>

```
cd campus-v2
idea .
```

<p>Ao abrir o IntelliJ Idea, o programa pode ser executado com o botão de execução, no canto superior esquerdo. Ao configurar um banco de dados local com PostgreSQL na sua máquina, e modificando os parâmetros necessários de login e senha no código do back-end (caso você não saiba como fazer isso, pode encontrar um tutorial nas referências, ao fim desse arquivo), você está pronto para enviar requisições e popular o banco de dados. Seguem alguns exemplos:</p>

<h3>Popular a tabela de publicações</h3>

```
curl -X POST http://localhost:8080/publications -H "Content-Type: application/json" -d '{
  "userId": 1,
  "publicationText": "This is a new publication",
  "publicationType": "A",
  "countParticipants": 0,
  "dateTime": "2024-05-23T10:00:00",
  "publicationImagePath": "/path/to/image.jpg"
}'
```

<h3>Popular a tabela de usuários</h3>

```
curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{     ─╯
    "username": "User1",
    "password": "password1",
    "profileBio": "Bio1",  
    "university": "University1",
    "team": "Team1",
    "userType": "A"
}'
```

<h3>Fazer que um usuário deixe de seguir outro (é necessário existir pelo menos dois usuários no BD, que já se seguem)</h3>

```
curl -X DELETE http://localhost:8080/users/unfollow -H "Content-Type: application/json" -d '{               
  "followerId": 1,
  "followedId": 2
}' 
```


<h2>Referências</h2>

1. [Setup PostgreSQL with MacOS and PGAdmin](https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/)
2. [Setup PostgreSQL with Linux and PGAdmin](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)
3. [SQL Integration with KTOR](https://blog.stackademic.com/guide-to-sql-database-integration-with-ktor-applications-c6cb52e6c346)
4. [ReactJS Integration with KTOR](https://www.freecodecamp.org/news/how-to-consume-rest-apis-in-react/)
5. [Login Authentication on React Applications](https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications)
