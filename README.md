# Sistema de Front-End GestãoDS

## Objetivo
Avaliar as habilidades do candidato em desenvolvimento front-end, especificamente utilizando React. Este teste inclui a implementação de um conjunto de telas com base em um design fornecido no Figma. As bibliotecas utilizadas são de escolha do candidato, mas alguns diferenciais podem ser considerados.

## Modelo de dados

collection **Profile**
```json
{
  "patient": "",
  "surname": "",
  "nationality": "",
  "birth": "",
  "cpf": "",
  "rg": "",
  "gender": "",
  "civilStates": "",
  "email": "",
  "comments": "",
  "cep": "",
  "city": "",
  "uf": "",
  "address": "",
  "number": "",
  "neighborhood": "",
  "complement": ""
}
```
# Como iniciar a aplicação
## API
- É necessário ter Node instalado.
- É necessário criar o banco de dados no mongoDB local ou no cloud.mongodb.com.

- Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no arquivo `.env`.
```cl
PORT= (padrão: 3030)
IP= (padrão: 0.0.0.0)

MONGODB_USERNAME=
MONGODB_URL_ATLAS=
```

### Executando o projeto
- Dentro da pasta `./api`, instale as dependências do projeto.

```cl
npm install
```

- Em seguida, inicie o projeto.

```cl
npm run dev
```
## APP
- É necessário ter o Node instalado.

### Executando o projeto
- Dentro da pasta `./front`, instale as dependências do projeto.

```cl
npm install
```

- Em seguida, inicie o projeto.

```cl
npm start
```

## Rotas (REST)
| Rota | Descrição |
| --- | --- |
| `POST /profile` | Salvar informações de paciente |
| `GET /profile` | Listar pacientes cadastrados |
| `DELETE /profile/:cpf` | Excluir paciente cadastrado por CPF |
| `GET /profile-edit/:cpf` | Listar informações do paciente por CPF |
| `GET /search` | Listar pacientes por pesquisa de texto |
| --- | --- |
