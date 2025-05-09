// Importing prisma.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

// Control variable for creating data in the table.
let already = false;

var objId;

// HistBloodService Services.
const HistBloodService = {
    // Creates data in the BlType table.
    create : async ()=>{
        // Checks if data has already been created.
        if (!already) {
            await prisma.blType.createMany({
                data: [
                    { type: 'A+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'A-', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'B+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'B-', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'AB+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'AB-', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'O+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'O-', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: '', received: 0, sent: 0, shortTime: 20, longTime: 0 }
                ],
                skipDuplicates: true // Evita erro se já existir algum registro
            });
        } else {
            return 'Os tipos sanguíneos já existem no banco.';
        }

        already = true;
        return await prisma.blType.findMany();
    },

    // Reading of blood histories.
    read : async ()=>{
        // Return of all blood histories.
        return await prisma.blType.findMany();
    },

    // Blood type reading requested.
    readtype : async (search)=>{
        // Blood type search requested in route parameter and return when found.
        async function typ(type){
            return await prisma.blType.findUnique({where: { type: type }})
        };

        // Call the function to read the requested blood type. 
        switch (search.toUpperCase()){
            case "A+":
                return typ('A+');
            case "A-":
                return typ('A-');
            case "B+":
                return typ('B+');
            case "B-":
                return typ('B-');
            case "AB+":
                return typ('AB+');
            case "AB-":
                return typ('AB-');
            case "O+":
                return typ('O+');
            case "O-":
                return typ('O-');
            default :
                return 'Informação não encontrada. Tipos sanguíneos para consulta: A+, A-, B+, B-, AB+, AB-, O+ e O-.';
            };      
        },

    // Desired blood type update.
    update: async(search, sent)=>{
        // Call the database update function.
        await updateData(search, sent);

        // Return of service.
        return 'Dado atualizado.'
    },

    // Reverts to the previous state of the data.
    revertLast: async(search)=>{
        console.log(objId)
        if (objId == undefined){
            return `${search} não foi atualizado`
        }

        // Call the database revert function.
        const obj = await prisma.blType.findUnique({where: { type: '' }});

        const { received, sent, shortTime, longTime } = obj;
        
        await prisma.blType.update({
            where: { type: search.toUpperCase() },
            // Fields that will be reverted.
            data: {
                received: received,  
                sent: sent,
                shortTime: shortTime,
                longTime: longTime
            } 
        });

        // Return of service.
        return 'Alteração revertida.'
    },

    // Erases all changes to the hb by resetting everything.
    delete: async()=>{
        await prisma.blType.deleteMany({});

        // Return of service.
        return 'Dados deletados com sucesso'
    }
};

// Function called during object update, check this function updates the shortTime.
function compareShort(stime, atual) {
    // Returns the result.
    return atual < stime ? atual : stime;
};

// Function that checks and updates the longtime, called during object update.
function compareLong(ltime, atual) {
    // Returns the result.
    return atual > ltime ? atual : ltime;
};

// Function that updates the blood type in the database.
async function updateData(blood, days){
    const obj = await prisma.blType.findUnique({where: { type: blood.toUpperCase()}});

    //  Destructuring object requested from the database.
    var { received, sent, shortTime, longTime } = obj;

    // Saves the object.
    saveLast(obj);
 
    // Updates data and calls comparison functions.
    received += 1;
    sent = ((days ?? 0) + (sent ?? 0)) / received
    shortTime = compareShort(shortTime, days);
    longTime = compareLong(longTime, days);

    const objUp = await prisma.blType.update({
        where: { type: blood.toUpperCase() },
        // Fields that will be updated.
        data: {
            received,
            sent,
            shortTime,
            longTime
        } 
    });

    // Returns the updated object.
    return objUp;

};

// Saves the current state before updating.
async function saveLast(obj){
    objId = obj.id;

    const objSave = await prisma.blType.update({
        where: { type: '' },
        // Fields that will be updated.
        data: {
            received: obj.received,  
            sent: obj.sent,
            shortTime: obj.shortTime,
            longTime: obj.longTime
        } 
    });

    // Returns the updated object.
    return objSave;
};

// Exporting HistBloodService.
module.exports = HistBloodService;