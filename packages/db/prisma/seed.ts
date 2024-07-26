
import { prisma } from "../src";

async function seed() {
    await prisma.availableTrigger.create({
        data:{
            id:"webhook",
            name:"webhook",
        }
    })
    await prisma.availableAction.createMany({
        data:[
            {
                id:"email",
                name:"email",
            },
            {
                id:"sol",
                name:"send_sol",
            }
        ].map((action)=>({
            id:action.id,
            name:action.name
        }))
    })
}
(async()=>{
    await seed().then(()=>{
        console.log("seeded")
    }).catch((e)=>{
        console.log(e)
    });
})();