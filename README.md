# steamfriendmatch
An APP to find friends on steam
1. Para executar o Backend deve-se instalar os pré-requisitos:

* Node-JS 
* PostgreSQL

2. Após instalar os pré requisitos é necessário criar no PostgreSQL um banco de dados com o nome:

`friendmatch`

3. Inserir a senha do seu postgres alterar o arquivo "ormconfig.json" no campo password.

4. Copiar o arquivo ".env.example" e renomear como .env

5. No terminal na pasta do Projeto executar o seguinte comando:

`npm install`

6. Para iniciar o backend basta inserir o comando:

`npm run start`

Terminal irá retornar:
```
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node ./src/index.ts`
⚡️[server]: Server is running at http://localhost:3000
```

Esse Backend tem a funcionalidade de receber requisições do projeto:
https://github.com/gabzeel/steamfriendmatch-loide

