const express = require("express");

 
 const scheduling = new express({ 
  usuario_id: {
    type:String,
    ref: 'Usuario',
    required: true
  },
  data_agendamento: {
    type: Date,
    required: true
  },
  local: {
    type: String
  },
  status: {
    type: String,
    enum: ['agendado', 'cancelado', 'concluído'],
    default: 'agendado'
  }
});

const agenda = express("agenda", scheduling);
module.exports = agenda;
class Scheduling {
  constructor({ usuario_id, data_agendamento, local, status = 'agendado' }) {
    this.usuario_id = usuario_id;
    this.data_agendamento = data_agendamento;
    this.local = local;
    this.status = status;
  }
}

module.exports = Scheduling;