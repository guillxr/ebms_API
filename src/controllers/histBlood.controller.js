// Importing blood history services.
// const data = require('@utils/histBlood');
const HistBloodService = require('../services/histBlood.service.js');

// Blood history controller.
const histBloodController = {

    // Consult all blood histories.
    read:(req, res)=>{
        // Pass on the message with the return of the reading service for all blood types.
        res.json({ message : ['Aqui estão as médias em dias de tempo de saida da bolsa de sangue em dias, received = recebido, sent = enviado, shortTime = menor tempo e longTime = maior tempo', HistBloodService.read()]});
    },

    // Only check the blood type requested in the parameter.
    readtype:(req, res)=>{
        // Parameter search constant.
        const search = req.params.type;

        // Call the desired blood type reading service.
        res.json({ result: HistBloodService.readtype(search)});        
    },

    // Updates the desired blood type.
    update:(req, res)=>{
        // Parameter search constant.
        // Days from receipt to shipment of blood.
        const search = req.params.blood
        const { sent } = req.body

        // Call the update service.
        res.json({ update: HistBloodService.update(search, sent)})

    }
}

// Exporting the controller
module.exports = histBloodController;