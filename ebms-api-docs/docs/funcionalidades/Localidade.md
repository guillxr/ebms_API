---
sidebar_position: 2 # Adjust as needed for your Docusaurus sidebar order
---

# API: Gerenciamento de Localidades (/localities)

Esta seção descreve os endpoints da API para gerenciar localidades (endereços).

## Criar Localidade

Cria um novo registro de localidade.

**POST** `/localities`

**Corpo da Requisição (Body):**

Todos os campos são obrigatórios para criar uma nova localidade.

```json
{
  "street": "Rua Exemplo",
  "neighborhood": "Bairro Modelo",
  "zip": "29700-000",
  "city": "Rio de Janeiro",
  "state": "RJ"
}
Campos do Corpo da Requisição:street (String, Obrigatório): Nome da rua.neighborhood (String, Obrigatório): Nome do bairro.zip (String, Obrigatório): Código Postal (CEP).city (String, Obrigatório): Nome da cidade.state (String, Obrigatório): Sigla do estado (ex: "ES").Resposta de Sucesso (201 Created):Retorna o objeto da localidade criada, incluindo o ID gerado e timestamps (se configurados no schema Prisma).{
  "id": 1, // Exemplo de ID numérico autoincrementado
  "street": "Rua Exemplo",
  "neighborhood": "Bairro Modelo",
  "zip": "29700-000",
  "city": "Rio de Janeiro",
  "state": "RJ"
  // "createdAt": "2025-05-22T18:30:00.000Z", // Exemplo se o schema tiver timestamps
  // "updatedAt": "2025-05-22T18:30:00.000Z"  // Exemplo se o schema tiver timestamps
}
Respostas de Erro:400 Bad Request:Se ocorrer uma falha durante a criação (ex: violação de constraint do banco de dados, campos faltando se o Prisma tiver validações mais estritas não visíveis no controller, ou outro erro Prisma).{
  "message": "Mensagem específica do erro do Prisma ou do banco de dados"
}
Listar Todas as LocalidadesRecupera uma lista de todos os registros de localidade.GET /localitiesResposta de Sucesso (200 OK):Retorna um array de objetos de localidade.[
  {
    "id": 1,
    "street": "Rua Exemplo",
    "neighborhood": "Bairro Modelo",
    "zip": "29700-000",
    "city": "Rio de Janeiro",
    "state": "RJ"
  },
  {
    "id": 2,
    "street": "Avenida Principal",
    "neighborhood": "Centro",
    "zip": "29703-100",
    "city": "Rio de Janeiro",
    "state": "RJ"
  }
]
Se nenhum registro for encontrado, retorna um array vazio [].Respostas de Erro:500 Internal Server Error:Se ocorrer uma falha ao buscar as localidades.{
  "message": "Mensagem específica do erro"
}
Atualizar LocalidadeAtualiza um registro de localidade existente identificado pelo seu id.PUT /localities/:idParâmetros de Rota (Path Parameters):id (Integer, Obrigatório): O ID da localidade a ser atualizada.Corpo da Requisição (Body):Espera-se que todos os campos da localidade sejam fornecidos para a atualização.{
  "street": "Rua Nova Exemplo",
  "neighborhood": "Novo Bairro Modelo",
  "zip": "29700-001",
  "city": "Rio de Janeiro",
  "state": "RJ"
}
Resposta de Sucesso (200 OK):Retorna o objeto da localidade atualizada.{
  "id": 1,
  "street": "Rua Nova Exemplo",
  "neighborhood": "Novo Bairro Modelo",
  "zip": "29700-001",
  "city": "Rio de Janeiro",
  "state": "RJ"
}
Respostas de Erro:400 Bad Request:Se ocorrer uma falha durante a atualização. Isso pode incluir o caso em que a localidade com o id fornecido não é encontrada (Prisma error P2025), pois o controller atual não trata este caso especificamente para retornar um 404.{
  "message": "Mensagem específica do erro (ex: 'Record to update not found.')"
}
Se os dados fornecidos forem inválidos ou faltarem campos (dependendo das constraints do Prisma).Deletar LocalidadeRemove um registro de localidade existente identificado pelo seu id.(Endpoint implementado no controller como deletLocality)DELETE /localities/:idParâmetros de Rota (Path Parameters):id (Integer, Obrigatório): O ID da localidade a ser deletada.Resposta de Sucesso (204 No Content):Nenhum corpo na resposta. Indica que a deleção foi bem-sucedida.Respostas de Erro:400 Bad Request:Se ocorrer uma falha durante a deleção. Isso pode incluir o caso em que a localidade com o id fornecido não é encontrada (Prisma error P2025), pois o controller atual não trata este caso especificamente para retornar um 404.{
  "message": "Mensagem específica do erro (ex: 'Record to delete not found.')"
}
