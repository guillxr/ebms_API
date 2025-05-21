const Agenda = require("../models/scheduling.model.js");

class ServicoAgendamento {
    // Cria um novo agendamento
    async criarAgendamento(appointmentData) {
        const appointment = new Agenda(appointmentData);
        return await appointment.save();
    }
    
    // Lista todos os agendamentos
    async listarAgendamentos() {
        return await Agenda.find();
    }
    
    // Atualiza um agendamento pelo ID
    async atualizarAgendamento(id, appointmentData) {
        return await Agenda.findByIdAndUpdate(id, appointmentData, { new: true });
    }
    
    // Deleta um agendamento pelo ID
    async deletarAgendamento(id) {
        return await Agenda.findByIdAndDelete(id);
    }
}

module.exports = new ServicoAgendamento();

