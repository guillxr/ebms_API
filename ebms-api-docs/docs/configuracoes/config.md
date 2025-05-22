---
sidebar_position: 2
---

# Configurações

Para utilizar API, basta configurar a chave **'DATABASE_URL'** na pasta `.env`, e se alimentar do cliente prisma, que é gerado automaticamente quando vocês execultam 'npm install'.

**Exemplo**:
```
DATABASE_URL= "postgresql://datebase_owner:npg_1T6BGMfshcDX@ep-solitary-lab-a5csvwrr-pooler.us-east-2.aws.neon.tech/datebase?sslmode=require"
PORT=3000
NODE_ENV=development
```
*Obs:* Após esse processo basta apenas execulta, seguinte comando `npm install`.

## Swagger

Para ver cada método de modo simplificado veja pela nosso documento Swagger.

**Link**:
```
    http:localhost:3000/api-docs
```
*Obs:* Antes de acessar o documento, basta utilizar seguinte comando `npm run dev`.