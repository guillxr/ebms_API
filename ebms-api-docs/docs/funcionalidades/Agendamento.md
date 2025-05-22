---
sidebar_position: 2
---

# Rotas de Agendamento (/agendamentos)

## Criar um novo agendamento

**POST** `/agendamentos`:

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

## Listar todos os agendamentos

**GET** `/agendamentos`:

**Resposta:**
```json
  {
    "_id": "6650a1c2e5e4a2c001f8e4a1c",
    "usuario_id": "664b1f2e5e4a2c001f8e4a1b",
    "data_agendamento": "2025-06-01T10:00:00.000Z",
    "local": "Hemocentro Central",
    "status": "agendado"
  }
```

## Atualizar um agendamento

**PUT** `/agendamentos/:id`:

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

## Atualizar um agendamento

**DELETE** `/agendamentos/:id`:

**Resposta:**
```json
Status 204 No Content (sem corpo)
```