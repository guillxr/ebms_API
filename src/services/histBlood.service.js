// Importing histBlood.
const data = require('@utils/histBlood');

// HistBloodService Services.
const HistBloodService = {
    // Reading of blood histories.
    read : ()=>{
        // Return of all blood histories.
        return [data.A_POSITIVO, data.A_NEGATIVO, data.B_POSITIVO, data.B_NEGATIVO, data.AB_POSITIVO, data.AB_NEGATIVO, data.O_POSITIVO, data.O_NEGATIVO]
    },

    // Blood type reading requested.
    readtype : (search)=>{
        // Blood type search requested in route parameter and return when found.
        switch (search.toLowerCase()){
            case "a+":
                return  data.A_POSITIVO;
            case "a-":
                return data.A_NEGATIVO;
            case "b+":
                return data.B_POSITIVO;
            case "b-":
                return data.B_NEGATIVO;
            case "ab+":
                return data.AB_POSITIVO;
            case "ab-":
                return data.AB_NEGATIVO;
            case "o+":
                return data.O_POSITIVO;
            case "o-":
                return data.O_NEGATIVO;
            default :
                return 'Informação não encontrada. Tipos sanguíneos para consulta: A+, A-, B+, B-, AB+, AB-, O+ e O-.';
            }            
        },

    // Desired blood type update.
    update : (search, sent)=>{
        // Search for the requested blood type and update of the quantity received, average number of days until sending and return of the changed object.
        switch (search.toLowerCase()){
            case "a+":
                data.A_POSITIVO.received += 1 
                data.A_POSITIVO.sent = (data.A_POSITIVO.sent + sent) / data.A_POSITIVO.received;
                data.A_POSITIVO.shortTime = compareShort(data.A_POSITIVO.shortTime, sent);
                data.A_POSITIVO.longTime = compareLong(data.A_POSITIVO.longTime, sent);
                return data.A_POSITIVO;
            break;
            case "a-":
                data.A_NEGATIVO.received += 1
                data.A_NEGATIVO.sent = (data.A_NEGATIVO.sent + sent) / data.A_NEGATIVO.received;
                data.A_NEGATIVO.shortTime = compareShort(data.A_NEGATIVO.shortTime, sent);
                data.A_NEGATIVO.longTime = compareLong(data.A_NEGATIVO.longTime, sent);
                return data.A_NEGATIVO;
            break;
            case "b+":
                data.B_POSITIVO.received += 1 
                data.B_POSITIVO.sent = (data.B_POSITIVO.sent + sent) / data.B_POSITIVO.received;
                data.B_POSITIVO.shortTime = compareShort(data.B_POSITIVO.shortTime, sent);
                data.B_POSITIVO.longTime = compareLong(data.B_POSITIVO.longTime, sent);
                return data.B_POSITIVO;
            break;
            case "b-":
                data.B_NEGATIVO.received += 1
                data.B_NEGATIVO.sent = (data.B_NEGATIVO.sent + sent) / data.B_NEGATIVO.received;
                data.B_NEGATIVO.shortTime = compareShort(data.B_NEGATIVO.shortTime, sent);
                data.B_NEGATIVO.longTime = compareLong(data.B_NEGATIVO.longTime, sent);
                return data.B_NEGATIVO;
            break;
            case "ab+":
                data.AB_POSITIVO.received += 1 
                data.AB_POSITIVO.sent = (data.AB_POSITIVO.sent + sent) / data.AB_POSITIVO.received;
                data.AB_POSITIVO.shortTime = compareShort(data.AB_POSITIVO.shortTime, sent);
                data.AB_POSITIVO.longTime = compareLong(data.AB_POSITIVO.longTime, sent);
                return data.AB_POSITIVO;
            break;
            case "ab-":
                data.AB_NEGATIVO.received += 1
                data.AB_NEGATIVO.sent = (data.AB_NEGATIVO.sent + sent) / data.AB_NEGATIVO.received;
                data.AB_NEGATIVO.shortTime = compareShort(data.AB_NEGATIVO.shortTime, sent);
                data.AB_NEGATIVO.longTime = compareLong(data.AB_NEGATIVO.longTime, sent);
                res.json({message: data.AB_NEGATIVO});
            break;
            case "o+":
                data.O_POSITIVO.received += 1 
                data.O_POSITIVO.sent = (data.O_POSITIVO.sent + sent) / data.O_POSITIVO.received;
                data.O_POSITIVO.shortTime = compareShort(data.O_POSITIVO.shortTime, sent);
                data.O_POSITIVO.longTime = compareLong(data.O_POSITIVO.longTime, sent);
                return data.O_POSITIVO;
            break;
            case "o-":
                data.O_NEGATIVO.received += 1
                data.O_NEGATIVO.sent = (data.O_NEGATIVO.sent + sent) / data.O_NEGATIVO.received;
                data.O_NEGATIVO.shortTime = compareShort(data.O_NEGATIVO.shortTime, sent);
                data.O_NEGATIVO.longTime = compareLong(data.O_NEGATIVO.longTime, sent);
                return data.O_NEGATIVO;
            break;
            default :
                return 'Informação não encontrada. Tipos sanguíneos para consulta: A+, A-, B+, B-, AB+, AB-, O+ e O-.';
        }

    }
}

// Function called during object update, check this function updates the shortTime.
function compareShort(stime, atual) {
    return atual < stime ? atual : stime;
}
// Function that checks and updates the longtime, called during object update.
function compareLong(ltime, atual) {
    return atual > ltime ? atual : ltime;
}

// Exporting HistBloodService.
module.exports = HistBloodService;