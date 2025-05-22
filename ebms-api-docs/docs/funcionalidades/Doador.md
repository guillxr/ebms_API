---
sidebar_position: 3
---

# Rotas de Doadores (/donors)

## Criar doador

**POST** `/donors`:

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

## Listar todos os doadores

**GET** `/donors`:

**Resposta:**
```json
  {
    "_id": "6650b2d3e5e4a2c001f8e4a2d",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "tipo_sanguineo": "O+"
  }
```

## Buscar doador por ID

**GET** `/donors/:id`:

**Resposta:**
```json
  {
  "_id": "6650b2d3e5e4a2c001f8e4a2d",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "tipo_sanguineo": "O+"
}
```

## Buscar doadores por tipo sanguíneo

**GET** `/donors/blood-type/O+`:

**Resposta:**
```json
  {
    "_id": "6650b2d3e5e4a2c001f8e4a2d",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "tipo_sanguineo": "O+"
  }
```

## Atualizar doador

**PUT** `/donors/:id`:

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

## Deletar doador

**DELETE** `/donors/:id`:

**Resposta:**
```json
Status 204 No Content (sem corpo)
```
