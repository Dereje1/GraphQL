const db = require('./models/db.js')
const pins = require('./models/pins.js')
// Root resolver
const root = {
    allPins: async ()=>{
        const result = await getAllPins()
        return (result)
    },
    singlePin: async (args)=>{
        const pin = await getSinglePin(args)
        return pin
    },
    addPin: async (args)=>{
        const pin = await addSinglePin(args)
        return pin
    },
    updatePin: async (args) =>{
        const pin = await updateP(args)
        return pin
    },
    deletePin: async (args) =>{
        const deletedPin = await deleteP(args)
        return deletedPin
    }
 }

 getAllPins = () => {
    return new Promise((resolve,reject)=>{
        pins.find({},(err,results)=>{
            if (err){
                reject(err)
            }
            resolve(results)
        })
    })
}

getSinglePin = (args) => {
    return new Promise((resolve,reject)=>{
        pins.findById(args.id,(err,result)=>{
            if(err){
                reject(err)
            }
            resolve(result)
        })
    })
}

addSinglePin = (args) => {
    const newPin ={
        owner: args.owner,
        imgDescription: args.imgDescription,
        imgLink: args.imgLink,
        timeStamp: Date.now(),
        savedBy:[]
    }
    return new Promise((resolve,reject)=>{
        pins.create(newPin,(err,pin)=>{
            if(err){
                reject(err)
            }
            resolve(pin)
        })
    })
}

updateP = (args) => {
    const pinToUpdate = [...args.savedBy];
    const pinID = args.id;
    const update = { '$set': {savedBy: pinToUpdate}};
    const modified = {new: true};
    return new Promise((resolve,reject)=>{
        pins.findByIdAndUpdate(pinID, update, modified, (err, pin)=>{
            if(err){
                reject(err)
            }
            resolve(pin)
        })
    })
    
}

deleteP = (args) =>{
    return new Promise((resolve,reject)=>{
        pins.remove({_id:args.id},(err,result)=>{
            if(err){
                reject(err)
            }
            resolve("Deleted " + args.id + " from the database")
        })
    })
    
}

module.exports = root