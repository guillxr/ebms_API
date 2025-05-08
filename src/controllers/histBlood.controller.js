// Importing blood history services.
const HistBloodService = require('../services/histBlood.service.js');

// Blood history controller.
const histBloodController = {

    // Creates data in the BlType table.
    create: async (req, res)=>{
        try{
            const answer = await HistBloodService.create();
            res.status(201).json({ 
                success : 'Os dados criados foram: ',
                data : answer
            });
        }catch(error){
            res.status(500).json({
                error: 'Falha ao criar os dados. Tente novamente.',
                details: error.message
            });
        };
    },

    // Consult all blood histories.
    read: async(req, res)=>{
        // Pass on the success with the return of the reading service for all blood types.
        try{
            const answer = await HistBloodService.read();
            res.status(200).json({ 
                success : 'Os dados encontrados foram: ', 
                data : answer
            });
        }catch(error){
            res.status(500).json({
                error: 'Falha ao recuperar os dados. Tente novamente.',
                details: error.message
            });
        };
    },

    // Only check the blood type requested in the parameter.
    readtype: async(req, res)=>{
        // Searches for the requested type in the parameter and checks if it exists in the table.
        try{
            const type = req.params.type;
            const answer = await HistBloodService.readtype(type);

            if (!answer) {
                return res.status(404).json({ error: `Nenhum dado encontrado para o tipo: ${type}` });
            }

            res.status(200).json({ 
                success : 'O dado encontrado foi: ', 
                data : answer
            });
        }catch(error){
            res.status(500).json({
                error: 'Falha ao recuperar o dado. Tente novamente.',
                details: error.message
            });
        };
    },

    // Updates the desired blood type.
    update: async(req, res)=>{
        // It searches for the requested type in the parameter, checks if it exists in the table and then updates it, using the service.
        try{
            const search = req.params.blood;
            const sent = req.body.sent;
            const answer = await HistBloodService.update(search, sent);

            if (!answer) {
                return res.status(404).json({ error: `Nenhum dado encontrado para o tipo sanguíneo: ${search}` });
            }

            res.status(200).json({ 
                changed : `sent alterado: ${sent}`,
                success : 'O dado encontrado foi: ', 
                confirm : answer 
            });
        }catch(error){
            res.status(500).json({
                error: 'Falha ao atualizar os dados. Tente novamente.',
                details: error.message
            });
        }; 
    },

    // Delete all modifications.
    delete: async(req, res)=>{
        // Calls the delete service and displays the result.
        try{
            const answer = await HistBloodService.delete();

            if (!answer) {
                return res.status(404).json({ error: 'Nenhum dado encontrado para deletar.' });
            }

            res.status(200).json({ 
                delete: answer
            });
        }catch(error){
            res.status(500).json({
                error: 'Falha ao deletar os dados. Tente novamente.',
                details: error.message
            });
        };
    }
}

// Exporting the controller
module.exports = histBloodController;