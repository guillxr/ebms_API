// Importing histBlood.
const data = require('@utils/histBlood');
const { A_NEGATIVO } = require('../utils/histBlood');

// HistBloodService Services.
const HistBloodService = {
    // Reading of blood histories.
    read : ()=>{
        // Return of all blood histories.
        return [data.A_POSITIVO, data.A_NEGATIVO, data.B_POSITIVO, data.B_NEGATIVO, data.AB_POSITIVO, data.AB_NEGATIVO, data.O_POSITIVO, data.O_NEGATIVO];
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
        // Search for the requested blood type and update the quantity received, average number of days until sending, create a backup of the last change and return of the changed object.
        switch (search.toLowerCase()){
            case "a+":
                securityCopy(data.A_POSITIVO);
                updateData(data.A_POSITIVO, sent);
                return data.A_POSITIVO;
            case "a-":
                securityCopy(data.A_NEGATIVO);
                updateData(data.A_NEGATIVO, sent);
                return data.A_NEGATIVO;
            case "b+":
                securityCopy(data.B_POSITIVO);
                updateData(data.B_POSITIVO, sent);
                return data.B_POSITIVO;
            case "b-":
                securityCopy(data.B_NEGATIVO);
                updateData(data.B_NEGATIVO, sent);
                return data.B_NEGATIVO;
            case "ab+":
                securityCopy(data.AB_POSITIVO);
                updateData(data.AB_POSITIVO, sent);
                return data.AB_POSITIVO;
            case "ab-":
                securityCopy(data.AB_NEGATIVO);
                updateData(data.AB_NEGATIVO, sent);
                return data.AB_NEGATIVO;
            case "o+":
                securityCopy(data.O_POSITIVO);
                updateData(data.O_POSITIVO, sent);
                return data.O_POSITIVO;
            case "o-":
                securityCopy(data.O_NEGATIVO);
                updateData(data.O_NEGATIVO, sent);
                return data.O_NEGATIVO;
            default :
                return 'Informação não encontrada. Tipos sanguíneos para consulta: A+, A-, B+, B-, AB+, AB-, O+ e O-.';
        }
    },

    // Undo previous change.
    revertLast : (search)=>{
        // Search for the requested blood type and update of the quantity received, average number of days until sending and return of the changed object.
        switch (search.toLowerCase()){
            case "a+":
                revertLast(data.A_POSITIVO);
                return data.A_POSITIVO;
            case "a-":
                revertLast(data.A_NEGATIVO);
                return data.A_NEGATIVO;
            case "b+":
                revertLast(data.B_POSITIVO);
                return data.B_POSITIVO;
            case "b-":
                revertLast(data.B_NEGATIVO);
                return data.B_NEGATIVO;
            case "ab+":
                revertLast(data.AB_POSITIVO);
                return data.AB_POSITIVO;
            case "ab-":
                revertLast(data.AB_NEGATIVO);
                return data.AB_NEGATIVO;
            case "o+":
                revertLast(data.O_POSITIVO);
                return data.O_POSITIVO;
            case "o-":
                revertLast(data.O_NEGATIVO);
                return data.O_NEGATIVO;
            default :
                return 'Informação não encontrada. Tipos sanguíneos para consulta: A+, A-, B+, B-, AB+, AB-, O+ e O-.';
        }
    },

    // Erases all changes to the data by resetting everything.
    delete: ()=>{
        // List of all blood types.
        const types = [data.A_POSITIVO, data.A_NEGATIVO, data.B_POSITIVO, data.B_NEGATIVO, data.AB_POSITIVO, data.AB_NEGATIVO, data.O_POSITIVO, data.O_NEGATIVO];

        // Erase all changes to the data using the deleteALL function. 
        for (let i = 0; i < types.length; i++) {
            deleteAll(types[i])
        }
        
        // Return of all blood histories.
        return [data.A_POSITIVO, data.A_NEGATIVO, data.B_POSITIVO, data.B_NEGATIVO, data.AB_POSITIVO, data.AB_NEGATIVO, data.O_POSITIVO, data.O_NEGATIVO];
    }
}

// Function called during object update, check this function updates the shortTime.
function compareShort(stime, atual) {
    // Returns the result.
    return atual < stime ? atual : stime;
}

// Function that checks and updates the longtime, called during object update.
function compareLong(ltime, atual) {
    // Returns the result.
    return atual > ltime ? atual : ltime;
}

// Function that updates blood type data.
function updateData(blood, days){
    blood.received += 1 
    blood.sent = (blood.sent + days) / blood.received;
    blood.shortTime = compareShort(blood.shortTime, days);
    blood.longTime = compareLong(blood.longTime, days);
    return blood;
}

// Function that makes the backup during the update.
function securityCopy(blood){
    data.security.received = blood.received;
    data.security.sent = blood.sent;
    data.security.shortTime = blood.shortTime;
    data.security.longTime = blood.longTime;
}

// Function that reverts the last change.
function revertLast(blood){
    blood.received = data.security.received;
    blood.sent = data.security.sent;
    blood.shortTime = data.security.shortTime;
    blood.longTime = data.security.longTime;
}

// Function responsible for deleting all changes to the data.
function deleteAll(blood){
    blood.received = 0;
    blood.sent = 0;
    blood.shortTime = 20;
    blood.longTime = 0;
}

// Exporting HistBloodService.
module.exports = HistBloodService;