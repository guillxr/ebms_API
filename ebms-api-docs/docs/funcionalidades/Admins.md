---
sidebar_position: 4
---

# Rotas de Admins (/admins)

## Criar admin

**POST** `/admins`:

**Body:**
```json
{
  "email": "admin@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "_id": "6650c3e4e5e4a2c001f8e4a3e",
  "email": "admin@email.com"
}
```

## Login

**POST** `/admins/login`:

**Body:**
```json
{
  "email": "admin@email.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "jwt.token.aqui",
  "user": {
    "_id": "6650c3e4e5e4a2c001f8e4a3e",
    "email": "admin@email.com"
  }
}
```