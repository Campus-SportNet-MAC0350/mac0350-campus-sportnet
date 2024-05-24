# MAC0350 Campus-SportNet

:soccer: A próxima tendência para atletas e torcedores das mais badaladas universidades brasileiras. 

:soccer: Cadastre sua atlética e os eventos esportivos, e se junte a essa comunidade!

<h3>Para executar o front-end, utilize: </h3>

```
cd csn-react-front
npm start
```

<p>Para executar o back-end, digite:</p>

```
cd campus-v2
idea .
```

<p>Ao abrir o IntelliJ Idea, o programa pode ser executado com o botão de execução, no canto superior esquerdo. Ao configurar um banco de dados local com PostgreSQL na sua máquina, e modificando os parâmetros necessários de login e senha no código do back-end, você está pronto para enviar requisições e popular o banco de dados. Seguem alguns exemplos:</p>

<p>Popular a tabela de publicações</p>

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

<p>Popular a tabela de usuários</p>

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

<p>Fazer que um usuário deixe de seguir outro (é necessário existir pelo menos dois usuários no BD, que já se seguem)</p>

```
curl -X DELETE http://localhost:8080/users/unfollow -H "Content-Type: application/json" -d '{               
  "followerId": 1,
  "followedId": 2
}' 
```
