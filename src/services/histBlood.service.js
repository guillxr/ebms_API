// Importing histBlood.
// const hb = require('@utils/histBlood');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

let already = false;

// HistBloodService Services.
const HistBloodService = {

    create : async ()=>{
        // const alreadyExists = await prisma.blType.count(); // Verifica se já existem registros

        if (!already) {
            const created = await prisma.blType.createMany({
                data: [
                    { type: 'A+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'A-', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'B+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'B-', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'AB+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'AB-', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'O+', received: 0, sent: 0, shortTime: 20, longTime: 0 },
                    { type: 'O-', received: 0, sent: 0, shortTime: 20, longTime: 0 }
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
        switch (search.toUpperCase()){
            case "A+":
                return await prisma.blType.findUnique({where: { type: 'A+' }});
            case "A-":
                return await prisma.blType.findUnique({where: { type: 'A-' }});
            case "A+":
                return await prisma.blType.findUnique({where: { type: 'B+' }});
            case "A-":
                return await prisma.blType.findUnique({where: { type: 'B-' }});
            case "AB+":
                return await prisma.blType.findUnique({where: { type: 'AB+' }});
            case "AB-":
                return await prisma.blType.findUnique({where: { type: 'AB-' }});
            case "O+":
                return await prisma.blType.findUnique({where: { type: 'O+' }});
            case "O-":
                return await prisma.blType.findUnique({where: { type: 'O-' }});
            default :
                return 'Informação não encontrada. Tipos sanguíneos para consulta: A+, A-, B+, B-, AB+, AB-, O+ e O-.';
            }            
        },

    // Desired blood type update.
    update : async(search, sent)=>{
        // Search for the requested blood type and update the quantity received, average number of days until sending, create a backup of the last change and return of the changed object.
        const update = await updateData(search, sent);
        return 'Dado atualizado.'
    },

    // Erases all changes to the hb by resetting everything.
    delete: ()=>{
        // List of all blood types.
        const types = [hb.A_POSITIVO, hb.A_NEGATIVO, hb.B_POSITIVO, hb.B_NEGATIVO, hb.AB_POSITIVO, hb.AB_NEGATIVO, hb.O_POSITIVO, hb.O_NEGATIVO];

        // Erase all changes to the hb using the deleteALL function. 
        for (let i = 0; i < types.length; i++) {
            deleteAll(types[i])
        }
        
        // Return of all blood histories.
        return [hb.A_POSITIVO, hb.A_NEGATIVO, hb.B_POSITIVO, hb.B_NEGATIVO, hb.AB_POSITIVO, hb.AB_NEGATIVO, hb.O_POSITIVO, hb.O_NEGATIVO];
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

// Function that updates blood type hb.
async function updateData(blood, days){
    const obj = await prisma.blType.findUnique({where: { type: blood.toUpperCase()}});

    var { received, sent, shortTime, longTime } = obj;
 
    received += 1;
    sent = ((days ?? 0) + (sent ?? 0)) / received
    shortTime = compareShort(shortTime, days);
    longTime = compareLong(longTime, days);

    const objUp = prisma.blType.update({
        where: { type: blood.toUpperCase() }, // Deve ser um campo único!
        data: {
            received,
            sent,
            shortTime,
            longTime
        } // Campos que serão atualizados
    });

    return await objUp;
}

// Function responsible for deleting all changes to the hb.
function deleteAll(blood){
    blood.received = 0;
    blood.sent = 0;
    blood.shortTime = 20;
    blood.longTime = 0;
}

// Exporting HistBloodService.
module.exports = HistBloodService;