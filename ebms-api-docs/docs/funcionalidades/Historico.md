---
sidebar_position: 3 # Ajuste conforme necessário para a ordem da sua barra lateral Docusaurus
---

# API: Gerenciamento de Histórico Sanguíneo (/blood-history)

Esta seção descreve os endpoints da API para gerenciar o histórico de tipos sanguíneos e suas modificações.

## Criar Dados de Histórico Sanguíneo

Cria novos dados na tabela de histórico sanguíneo.

**POST** `/blood-history`

**Corpo da Requisição (Body):**

Nenhum corpo de requisição é processado por este endpoint no controller atual.

**Resposta de Sucesso (201 Created):**

Retorna uma mensagem de sucesso e os dados criados pelo serviço.

```json
{
  "success": "Os dados criados foram: ",
  "data": {
    // Exemplo de dados retornados pelo serviço:
    "id": "some-uuid-123",
    "type": "O+",
    "log": "Initial record created",
    "createdAt": "2025-05-22T10:00:00.000Z"
  }
}
Respostas de Erro:500 Internal Server Error:{
  "error": "Falha ao criar os dados. Tente novamente.",
  "details": "Mensagem específica do erro"
}
Consultar Todos os Históricos SanguíneosRecupera uma lista de todos os registros de histórico sanguíneo.GET /blood-historyResposta de Sucesso (200 OK):Retorna uma mensagem de sucesso e um array de objetos de histórico sanguíneo.{
  "success": "Os dados encontrados foram: ",
  "data": [
    {
      "id": "some-uuid-123",
      "type": "O+",
      "modifications": [],
      "lastSent": null,
      "createdAt": "2025-05-22T10:00:00.000Z"
    },
    {
      "id": "some-uuid-456",
      "type": "A-",
      "modifications": ["sent_value_1", "sent_value_2"],
      "lastSent": "sent_value_2",
      "createdAt": "2025-05-21T14:30:00.000Z"
    }
  ]
}
Se nenhum registro for encontrado, o campo data pode ser um array vazio [].Respostas de Erro:500 Internal Server Error:{
  "error": "Falha ao recuperar os dados. Tente novamente.",
  "details": "Mensagem específica do erro"
}
Consultar Histórico por Tipo SanguíneoRecupera o histórico sanguíneo para um tipo específico.GET /blood-history/type/:typeParâmetros de Rota (Path Parameters):type (String, Obrigatório): O tipo sanguíneo a ser consultado (ex: "O+", "A-").Resposta de Sucesso (200 OK):Retorna uma mensagem de sucesso e os dados do histórico para o tipo sanguíneo especificado.{
  "success": "O resultado da busca foi: ",
  "data": {
    "id": "some-uuid-123",
    "type": "O+",
    "modifications": ["initial_state", "update_1"],
    "lastSent": "update_1",
    "createdAt": "2025-05-22T10:00:00.000Z",
    "updatedAt": "2025-05-22T11:00:00.000Z"
  }
}
Respostas de Erro:404 Not Found:{
  "error": "Nenhum dado encontrado para o tipo: O+"
}
500 Internal Server Error:{
  "error": "Falha ao recuperar o dado. Tente novamente.",
  "details": "Mensagem específica do erro"
}
Atualizar Histórico Sanguíneo (Valor "Sent")Atualiza o valor "sent" para um tipo sanguíneo específico.PUT /blood-history/update/:blood(Alternativamente, poderia ser PATCH dependendo da semântica exata da atualização)Parâmetros de Rota (Path Parameters):blood (String, Obrigatório): O tipo sanguíneo a ser atualizado (ex: "AB+").Corpo da Requisição (Body):{
  "sent": "novoValorEnviado123"
}
Campos do Corpo da Requisição:sent (Any, Obrigatório): O novo valor a ser registrado como "sent". O tipo exato (String, Number, etc.) dependerá da implementação do serviço.Resposta de Sucesso (200 OK):Retorna uma mensagem indicando a alteração e os dados confirmados pelo serviço.{
  "changed": "sent alterado: novoValorEnviado123",
  "confirm": {
    // Exemplo de dados atualizados retornados pelo serviço:
    "id": "some-uuid-789",
    "type": "AB+",
    "modifications": ["old_value", "novoValorEnviado123"],
    "lastSent": "novoValorEnviado123",
    "updatedAt": "2025-05-22T12:00:00.000Z"
  }
}
Respostas de Erro:404 Not Found:{
  "error": "Nenhum dado encontrado para o tipo sanguíneo: AB+"
}
500 Internal Server Error:{
  "error": "Falha ao atualizar os dados. Tente novamente.",
  "details": "Mensagem específica do erro"
}
Reverter Última Modificação do Histórico SanguíneoReverte a última modificação registrada para um tipo sanguíneo específico.PATCH /blood-history/revert/:bld(PATCH é semanticamente adequado para esta operação específica)Parâmetros de Rota (Path Parameters):bld (String, Obrigatório): O tipo sanguíneo para o qual a última modificação será revertida (ex: "B-").Corpo da Requisição (Body):Nenhum corpo de requisição é esperado por este endpoint no controller atual.Resposta de Sucesso (200 OK):Retorna uma mensagem de sucesso e os dados confirmados pelo serviço após a reversão.{
  "success": "Revertendo B-",
  "confirm": {
    // Exemplo de dados após a reversão:
    "id": "some-uuid-abc",
    "type": "B-",
    "modifications": ["previous_value"], // Supõe que a última foi removida
    "lastSent": "previous_value",
    "updatedAt": "2025-05-22T13:00:00.000Z"
  }
}
Respostas de Erro:404 Not Found:{
  "error": "Nenhum dado encontrado para o tipo sanguíneo: B-"
}
500 Internal Server Error:{
  "error": "Falha ao atualizar os dados. Tente novamente.", // A mensagem de erro é genérica para "atualizar"
  "details": "Mensagem específica do erro"
}
Deletar Todas as Modificações do HistóricoDeleta todas as modificações ou dados gerenciados pelo serviço de histórico sanguíneo.Nota: Esta operação parece ser uma deleção em massa, não de um registro específico por ID.DELETE /blood-history(Assumindo que DELETE na raiz do recurso /blood-history implica em deletar todos os dados gerenciados por este serviço, já que não há ID)Resposta de Sucesso (200 OK):Retorna uma confirmação ou os dados retornados pelo serviço após a deleção.{
  "delete": {
    // Exemplo de resposta do serviço:
    "deletedCount": 15, // Ou alguma outra forma de confirmação
    "message": "Todos os históricos foram limpos."
  }
}
Respostas de Erro:404 Not Found:{
  "error": "Nenhum dado encontrado para deletar."
}
500 Internal Server Error:{
  "error": "Falha ao deletar os dados. Tente novamente.",
  "details": "Mensagem específica do erro"
}
