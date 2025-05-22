---
sidebar_position: 4
---

# Rotas de Admins (/admins)

## Criar admin

**POST** `/admins`:

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

## Login

**POST** `/admins/login`:

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