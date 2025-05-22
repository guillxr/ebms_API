---
sidebar_position: 5
---

# Rotas de Estoque de Sangue (/estBlood)

## Adicionar lote ao estoque

**POST** `/estBlood/stock`:

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

## Consultar estoque

**GET** `/estBlood/stock`:

**Resposta:**
```json
  {
    "_id": "6650d4f5e5e4a2c001f8e4a4f",
    "tipo": "A+",
    "quantidade": 10
  }
```

## Atualizar quantidade

**PUT** `/estBlood/stock/:id`:

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

## Remover lote

**DELETE** `/estBlood/stock/:id`

**Resposta:**
```json
Status 204 No Content (sem corpo)
```