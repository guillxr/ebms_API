const express = require('express');

const stockBlood = new express({
  lote: {
    type: String,
    required: true,
    unique: true,
  },
  quantidade: {
    type: Number,
    required: true,
  },
  dataVencimento: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['disponível', 'vencido', 'com problema'],
    default: 'disponível',
  },
});
const Stock = express('Stock', stockBlood);
module.exports = Stock;
