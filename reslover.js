const db = require('./models/db.js')
const pins = require('./models/pins.js')
// Root resolver
const root = {
    allPins: () => {
        return pins.find({},(err,results)=>{
            return (results)
        })
    },
    singlePin: (args)=>{
        return pins.findById(args.id,(err,result)=>{
            return result
        })
    },
    addPin: (args)=>{
        const newPin ={
            owner: args.owner,
            imgDescription: args.imgDescription,
            imgLink: args.imgLink,
            timeStamp: Date.now(),
            savedBy:[]
        }
        return pins.create(newPin,(err,pin)=>{
            return pin;
        })
    },
    updatePin: (args) =>{
        const pinToUpdate = [...args.savedBy];
        const pinID = args.id;
        const update = { '$set': {savedBy: pinToUpdate}};
        const modified = {new: true};
        return pins.findByIdAndUpdate(pinID, update, modified, (err, pin)=>{
            return pin;
        })
    },
    deletePin: (args) =>{
        return pins.remove({_id:args.id},(err,result)=>{
            return result
        })
    }
 }

module.exports = root