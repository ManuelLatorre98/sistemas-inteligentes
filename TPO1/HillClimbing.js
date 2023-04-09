/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const factoryCount = parseInt(readline()); // the number of factories
const linkCount = parseInt(readline()); // the number of links between factories
const distances=[]

for (let i = 0; i < linkCount; i++) {
    var inputs = readline().split(' ');
    const factory1 = parseInt(inputs[0]);
    const factory2 = parseInt(inputs[1]);
    const distance = parseInt(inputs[2]);
    console.error(inputs)
    distances.push([parseInt(inputs[0]),parseInt(inputs[1]),parseInt(inputs[2])])
    if(i==linkCount-1){
        console.error(distances)
    } 
}


// game loop
while (true) {
    const entityCount = parseInt(readline()); // the number of entities (e.g. factories and troops)
    
    //Se van a actualizar por turno
    const misFabricas=[]
    const fabricasNeutrales=[]
    const fabricasEnemigas=[]
    
    for (let i = 0; i < entityCount; i++) {
        var inputs = readline().split(' ');
        const entityId = parseInt(inputs[0]);
        const entityType = inputs[1];
        const arg1 = parseInt(inputs[2]);
        const arg2 = parseInt(inputs[3]);
        const arg3 = parseInt(inputs[4]);
        const arg4 = parseInt(inputs[5]);
        const arg5 = parseInt(inputs[6]);
        
        //console.error(inputs)
        if(entityType=='FACTORY'){
            if(arg1==1){  
                console.error("GUARDA: ",entityId)      
                misFabricas.push(entityId)
            }else if(arg1==-1){
                fabricasEnemigas.push(entityId)
            }else{
                fabricasNeutrales.push(entityId)
            }
        }
    }
    let victima=-1;
    for (let i = 0; i < misFabricas.length; i++) {//Por cada fabrica que tengo hago algo
        victima=elegirVictima(misFabricas[i], fabricasNeutrales, fabricasEnemigas)
        console.log("MOVE "+misFabricas[i]+" "+victima+" 1")
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    

    // Any valid action, such as "WAIT" or "MOVE source destination cyborgs"}
    //ELEGIMOS EURISTICA DE ATACAR A LAS FABRICAS NO PROPIAS MAS CERCANAS, 
    //LAS NEUTRALES TIENEN PRIORIDAD

}

function elegirVictima(miFabrica, fabricasNeutrales, fabricasEnemigas){
    //let minDistance=9999999
    let victima=-1

    let minDistanceEnem=9999999
    let victimaEnemiga=-1
    

    let minDistanceNeut=9999999
    let victimaNeutral=-1

    for (let i = 0; i < distances.length; i++) {
        if(distances[i][0]==miFabrica){
            if(fabricasNeutrales.includes(distances[i][1]) && distances[i][2]<minDistanceNeut){//Si el enemigo es neutral
                minDistanceNeut=distances[i][2]
                victimaNeutral= distances[i][1]
            }else if(fabricasEnemigas.includes(distances[i][1]) && distances[i][2]<minDistanceEnem){
                minDistanceEnem=distances[i][2]
                victimaEnemiga= distances[i][1]
            }
        }else if(distances[i][1] == miFabrica){
            if(fabricasNeutrales.includes(distances[i][0]) && distances[i][2]<minDistanceNeut){//Si el enemigo es neutral
                minDistanceNeut=distances[i][2]
                victimaNeutral= distances[i][0]
            }else if(fabricasEnemigas.includes(distances[i][0]) && distances[i][2]<minDistanceEnem){
                minDistanceEnem=distances[i][2]
                victimaEnemiga= distances[i][0]
            }
        }
    }

    victima = victimaNeutral!=-1 ? victimaNeutral : victimaEnemiga //Se queda con la neutral mas cercana, si no hay neutrales con la enemiga mas cercana
    console.error("Mi fabrica nro ",miFabrica, "ataca a ", victima)
    console.error("fabricasNeutrales: ",fabricasNeutrales)
    console.error("fabricasEnemigas: ",fabricasEnemigas) 
    return victima
}