# 🩸 EBMS API - Sistema de Gerenciamento de Banco de Sangue

Bem-vindo ao repositório da **EBMS API**!  
Aqui você encontra uma API RESTful moderna para gerenciar doadores, agendamentos, estoque e histórico de sangue.  
Feita com carinho para facilitar a vida de quem salva vidas! 🚑❤️

---

## 🚀 Tecnologias Utilizadas

- **Node.js** (v22+)
- **Express.js**
- **MongoDB** (via Mongoose)
- **Swagger** (documentação)
- **Nodemon** (dev)
- **Helmet, CORS, Compression** (segurança e performance)

---

## 📅 Rotas de Agendamento (`/agendamentos`)

### Criar um novo agendamento

**POST** `/agendamentos`

**Body:**
```json
{
  "usuario_id": "664b1f2e5e4a2c001f8e4a1b",
  "data_agendamento": "2025-06-01T10:00:00.000Z",
  "local": "Hemocentro Central"
}
```

**Resposta:**
```json
{
  "_id": "6650a1c2e5e4a2c001f8e4a1c",
  "usuario_id": "664b1f2e5e4a2c001f8e4a1b",
  "data_agendamento": "2025-06-01T10:00:00.000Z",
  "local": "Hemocentro Central",
  "status": "agendado",
  "__v": 0
}
```

### Listar todos os agendamentos

**GET** `/agendamentos`

**Resposta:**
```json
[
  {
    "_id": "6650a1c2e5e4a2c001f8e4a1c",
    "usuario_id": "664b1f2e5e4a2c001f8e4a1b",
    "data_agendamento": "2025-06-01T10:00:00.000Z",
    "local": "Hemocentro Central",
    "status": "agendado"
  }
]
```

### Atualizar um agendamento

**PUT** `/agendamentos/:id`

**Body:**
```json
{
  "local": "Hemocentro Zona Sul",
  "status": "concluído"
}
```

**Resposta:**
```json
{
  "_id": "6650a1c2e5e4a2c001f8e4a1c",
  "usuario_id": "664b1f2e5e4a2c001f8e4a1b",
  "data_agendamento": "2025-06-01T10:00:00.000Z",
  "local": "Hemocentro Zona Sul",
  "status": "concluído"
}
```

### Deletar um agendamento

**DELETE** `/agendamentos/:id`

**Resposta:**  
Status `204 No Content` (sem corpo)

---

## 🧑‍🦰 Rotas de Doadores (`/donors`)

### Criar doador

**POST** `/donors`

**Body:**
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "tipo_sanguineo": "O+"
}
```

**Resposta:**
```json
{
  "_id": "6650b2d3e5e4a2c001f8e4a2d",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "tipo_sanguineo": "O+"
}
```

### Listar todos os doadores

**GET** `/donors`

**Resposta:**
```json
[
  {
    "_id": "6650b2d3e5e4a2c001f8e4a2d",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "tipo_sanguineo": "O+"
  }
]
```

### Buscar doador por ID

**GET** `/donors/:id`

**Resposta:**
```json
{
  "_id": "6650b2d3e5e4a2c001f8e4a2d",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "tipo_sanguineo": "O+"
}
```

### Buscar doadores por tipo sanguíneo

**GET** `/donors/blood-type/O+`

**Resposta:**
```json
[
  {
    "_id": "6650b2d3e5e4a2c001f8e4a2d",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "tipo_sanguineo": "O+"
  }
]
```

### Atualizar doador

**PUT** `/donors/:id`

**Body:**
```json
{
  "nome": "Maria S. Silva"
}
```

**Resposta:**
```json
{
  "_id": "6650b2d3e5e4a2c001f8e4a2d",
  "nome": "Maria S. Silva",
  "email": "maria@email.com",
  "tipo_sanguineo": "O+"
}
```

### Deletar doador

**DELETE** `/donors/:id`

**Resposta:**  
Status `204 No Content` (sem corpo)

---

## 🛡️ Rotas de Admins (`/admins`)

### Criar admin

**POST** `/admins`

**Body:**
```json
{
  "username": "admin",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "_id": "6650c3e4e5e4a2c001f8e4a3e",
  "username": "admin"
}
```

### Login

**POST** `/admins/login`

**Body:**
```json
{
  "username": "admin",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "jwt.token.aqui",
  "user": {
    "_id": "6650c3e4e5e4a2c001f8e4a3e",
    "username": "admin"
  }
}
```

---

## 🩸 Rotas de Estoque de Sangue (`/estBlood`)

### Adicionar lote ao estoque

**POST** `/estBlood/stock`

**Body:**
```json
{
  "tipo": "A+",
  "quantidade": 10
}
```

**Resposta:**
```json
{
  "_id": "6650d4f5e5e4a2c001f8e4a4f",
  "tipo": "A+",
  "quantidade": 10
}
```

### Consultar estoque

**GET** `/estBlood/stock`

**Resposta:**
```json
[
  {
    "_id": "6650d4f5e5e4a2c001f8e4a4f",
    "tipo": "A+",
    "quantidade": 10
  }
]
```

### Atualizar quantidade

**PUT** `/estBlood/stock/:id`

**Body:**
```json
{
  "quantidade": 15
}
```

**Resposta:**
```json
{
  "_id": "6650d4f5e5e4a2c001f8e4a4f",
  "tipo": "A+",
  "quantidade": 15
}
```

### Remover lote

**DELETE** `/estBlood/stock/:id`

**Resposta:**  
Status `204 No Content` (sem corpo)

---

## 📖 Rotas de Histórico de Sangue (`/histBlood`)

### Criar histórico

**POST** `/histBlood/create`

**Body:**
```json
{
  "tipo": "B-",
  "quantidade": 5,
  "data": "2025-05-21"
}
```

**Resposta:**
```json
{
  "_id": "6650e5a6e5e4a2c001f8e4a5a",
  "tipo": "B-",
  "quantidade": 5,
  "data": "2025-05-21"
}
```

### Listar histórico

**GET** `/histBlood`

**Resposta:**
```json
[
  {
    "_id": "6650e5a6e5e4a2c001f8e4a5a",
    "tipo": "B-",
    "quantidade": 5,
    "data": "2025-05-21"
  }
]
```

### Buscar histórico por tipo

**GET** `/histBlood/B-`

**Resposta:**
```json
{
  "_id": "6650e5a6e5e4a2c001f8e4a5a",
  "tipo": "B-",
  "quantidade": 5,
  "data": "2025-05-21"
}
```

---

## 🛠️ Como rodar

```bash
git clone https://github.com/seu-usuario/ebms_API.git
cd ebms_API
npm install
npm run dev
```

---

## 🤝 Contribua!

Sinta-se à vontade para abrir issues, enviar PRs ou sugerir melhorias.  
Juntos, salvamos mais vidas! 🩸🚀

---

Feito com 💙 por toda a equipe EBMS!