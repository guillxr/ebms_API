---
sidebar_position: 1 # Adjust as needed for your Docusaurus sidebar order
---

# API: Gerenciamento de Validade de Estoque (/validity)

Esta seção descreve os endpoints da API para gerenciar a validade dos itens em estoque.

## Criar Registro de Validade

Cria um novo registro de validade para um lote de estoque.

**POST** `/validity`

**Corpo da Requisição (Body):**

É necessário fornecer `batch`, `quantity` e `expirationDate`. O campo `status` é opcional e o padrão é "available".

```json
{
  "batch": "LOTE202505A",
  "quantity": 100,
  "expirationDate": "2026-12-31T23:59:59.000Z",
  "status": "available"
}
Campos do Corpo da Requisição:batch (String, Obrigatório): Identificador único do lote.quantity (Integer, Obrigatório): Quantidade de itens no lote.expirationDate (String ISO 8601, Obrigatório): Data e hora de vencimento do lote.status (String, Opcional): Status do lote (ex: "available", "quarantined"). Padrão: "available".Resposta de Sucesso (201 Created):Retorna o objeto do registro de validade criado, incluindo o ID gerado e timestamps.{
  "id": "c123e456-e89b-12d3-a456-426614174000",
  "batch": "LOTE202505A",
  "quantity": 100,
  "expirationDate": "2026-12-31T23:59:59.000Z",
  "status": "available",
  "createdAt": "2025-05-22T15:00:00.000Z",
  "updatedAt": "2025-05-22T15:00:00.000Z"
}
Respostas de Erro:400 Bad Request:Se campos obrigatórios (batch, quantity, expirationDate) não forem fornecidos:{
  "error": "All fields must be filled."
}
Se quantity não for um número válido:{
  "error": "Quantity must be a valid number."
}
Se expirationDate não for uma data válida:{
  "error": "Expiration date must be a valid date."
}
Se ocorrer uma falha genérica ao criar (ex: erro no banco de dados):{
  "error": "Failed to create stock validity",
  "details": "Mensagem específica do erro do banco de dados ou Prisma"
}
Consultar Registros de ValidadeRecupera uma lista de todos os registros de validade. Opcionalmente, pode ser filtrado por batch.GET /validityParâmetros de Query (Query Parameters):batch (String, Opcional): Filtra os registros de validade que contêm o valor fornecido no campo batch (busca case-insensitive).Exemplo de Requisição com Filtro:GET /validity?batch=LOTE2025Resposta de Sucesso (200 OK):Retorna um array de objetos de registro de validade.[
  {
    "id": "c123e456-e89b-12d3-a456-426614174000",
    "batch": "LOTE202505A",
    "quantity": 100,
    "expirationDate": "2026-12-31T23:59:59.000Z",
    "status": "available",
    "createdAt": "2025-05-22T15:00:00.000Z",
    "updatedAt": "2025-05-22T15:00:00.000Z"
  },
  {
    "id": "d456e789-e12b-34c5-d678-527725285111",
    "batch": "LOTE202505B",
    "quantity": 50,
    "expirationDate": "2027-01-15T23:59:59.000Z",
    "status": "quarantined",
    "createdAt": "2025-05-23T10:00:00.000Z",
    "updatedAt": "2025-05-23T11:30:00.000Z"
  }
]
Se nenhum registro for encontrado, retorna um array vazio [].Respostas de Erro:500 Internal Server Error:{
  "error": "Failed to fetch validities",
  "details": "Mensagem específica do erro"
}
Atualizar Registro de ValidadeAtualiza um registro de validade existente identificado pelo seu id.PUT /validity/:idParâmetros de Rota (Path Parameters):id (String, Obrigatório): O ID do registro de validade a ser atualizado.Corpo da Requisição (Body):Todos os campos (batch, quantity, expirationDate, status) são obrigatórios para a atualização.{
  "batch": "LOTE202505A-MOD",
  "quantity": 90,
  "expirationDate": "2026-12-30T23:59:59.000Z",
  "status": "pending_review"
}
Resposta de Sucesso (200 OK):Retorna o objeto do registro de validade atualizado.{
  "id": "c123e456-e89b-12d3-a456-426614174000",
  "batch": "LOTE202505A-MOD",
  "quantity": 90,
  "expirationDate": "2026-12-30T23:59:59.000Z",
  "status": "pending_review",
  "createdAt": "2025-05-22T15:00:00.000Z",
  "updatedAt": "2025-05-23T16:00:00.000Z"
}
Respostas de Erro:400 Bad Request:Se campos obrigatórios (batch, quantity, expirationDate, status) não forem fornecidos para a atualização:{
  "error": "All fields must be filled for update."
}
Se quantity não for um número válido:{
  "error": "Quantity must be a valid number."
}
Se expirationDate não for uma data válida:{
  "error": "Expiration date must be a valid date."
}
404 Not Found:Se o registro de validade com o id fornecido não for encontrado:{
  "error": "Stock validity entry not found." 
}
Ou, se o erro for capturado pelo Prisma durante a operação de update:{
  "error": "Stock validity entry not found to update.",
  "details": "No 'Validity' record(s) (needed to inline the relation on 'Validity' record(s)) was found for a nested connect on one-to-many relation 'ValidityToStockItem'." // Exemplo de detalhe do Prisma
}
500 Internal Server Error:{
  "error": "Failed to update validity",
  "details": "Mensagem específica do erro"
}
Deletar Registro de ValidadeRemove um registro de validade existente identificado pelo seu id.DELETE /validity/:idParâmetros de Rota (Path Parameters):id (String, Obrigatório): O ID do registro de validade a ser deletado.Resposta de Sucesso (200 OK):Retorna uma mensagem de sucesso. (Nota: o controller original retorna res.json, poderia ser res.status(204).send() para "No Content" que é comum para DELETE bem-sucedido sem corpo de resposta).{
  "message": "Stock validity entry deleted successfully"
}
Respostas de Erro:404 Not Found:Se o registro de validade com o id fornecido não for encontrado:{
  "error": "Stock validity entry not found."
}
Ou, se o erro for capturado pelo Prisma durante a operação de delete:{
  "error": "Stock validity entry not found to delete.",
  "details": "An operation failed because it depends on one or more records that were required but not found. Record to delete not found." // Exemplo de detalhe do Prisma
}
500 Internal Server Error:{
  "error": "Failed to delete validity",
  "details": "Mensagem específica do erro"
}
