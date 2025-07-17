const { prisma } = require('../../prisma/client');

class ServicoAgendamento {
    // Cria um novo agendamento
    async criarAgendamento(appointmentData) {
        return await prisma.scheduling.create({ data: appointmentData });
    }

    // Lista todos os agendamentos
    async listarAgendamentos() {
        return await prisma.scheduling.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        donor: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }

    // Atualiza um agendamento pelo ID
    async atualizarAgendamento(id, appointmentData) {
        return await prisma.scheduling.update({
            where: { id },
            data: appointmentData,
        });
    }

    // Deleta um agendamento pelo ID
    async deletarAgendamento(id) {
        return await prisma.scheduling.delete({ where: { id } });
    }
}

module.exports = new ServicoAgendamento();

