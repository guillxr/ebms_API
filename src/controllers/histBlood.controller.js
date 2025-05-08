// Importing blood history services.
// const data = require('@utils/histBlood');
const HistBloodService = require('../services/histBlood.service.js');

// Blood history controller.
const histBloodController = {

    create: async (req, res)=>{
        try{
            const answer = await HistBloodService.create();
            res.status(201).json({ success : 'Os dados criados foram: ', data : answer});
        }catch(error){
            res.status(500).json({erro: error.message})
        }
    },

    // Consult all blood histories.
    read: async(req, res)=>{
        // Pass on the message with the return of the reading service for all blood types.
        try{
            const answer = await HistBloodService.read();
            res.status(201).json({ success : 'Os dados encontrados foram: ', data : answer});
        }catch(error){
            res.status(500).json({erro: error.message})
        }
    },

    // Only check the blood type requested in the parameter.
    readtype: async(req, res)=>{
        // Parameter search constant.
        try{
            const answer = await HistBloodService.readtype(req.params.type);
            res.status(201).json({ success : 'O dado encontrado foi: ', data : answer});
        }catch(error){
            res.status(500).json({erro: error.message})
        }  
    },

    // Updates the desired blood type.
    update: async(req, res)=>{
        // Parameter search constant.
        try{
            const search = req.params.blood;
            const { sent } = req.body;
            const answer = await HistBloodService.update(search, sent);
            res.status(201).json({ 
                changed : `sent alterado: ${sent}`,
                success : 'O dado encontrado foi: ', confirm : answer});
        }catch(error){
            res.status(500).json({erro: error.message})
        }  
    },

    // Undo previous update.
    revertLast: (req, res)=>{
        // Parameter search constant.
        const search = req.params.last;

        // Calls the rollback service to the previous state.
        const show = HistBloodService.revertLast(search);

        // Show the reversal.
        res.json({ revertLast: show});
    },

    // Delete all modifications.
    delete: (req, res)=>{
        // Calls the delete service and displays the result.
        res.json({ delete: HistBloodService.delete()});
    }
}

// Exporting the controller
module.exports = histBloodController;