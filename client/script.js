const fullQuery = document.getElementById("allquery")
const singleQuery = document.getElementById("singlequery")
const addPin = document.getElementById("addNew")
const pid = document.getElementById("pinid")
const rmpin = document.getElementById("removepin")
const updt = document.getElementById("update")

fullQuery.addEventListener("click",()=>{
  withFetch("all")
})
singleQuery.addEventListener("click",()=>{
  withFetch("single",pid.value.trim())
})
addPin.addEventListener("click",()=>{
  withFetch("add")
})
rmpin.addEventListener("click",()=>{
  withFetch("delete",pid.value.trim())
})

updt.addEventListener("click",()=>{
  withFetch("update",pid.value.trim())
})

  function withFetch(queryType,id){
    //can also provide options to fetch 
    let graphQuery
    if(queryType==='single'){
      graphQuery = `
      query{ 
        singlePin(id: "${id}") {
            id
            imgDescription 
            timeStamp
          } 
      }
    `
    }
    else if(queryType==='all'){
      graphQuery = `
      query{ 
        allPins{
          id
          imgDescription
          savedBy
          timeStamp
        }
      }
    `
    }
    else if(queryType==='add'){
      graphQuery=`
      mutation{
        addPin(owner:"GraphQL",imgDescription:"GraphQL",imgLink:"https://cdn-images-1.medium.com/max/1000/1*MsIHB2ZBXbzRq-9DfriRHg.png"){
          owner
          imgDescription
          imgLink
          timeStamp
          savedBy
          id
        }
      }
    `
    }
    else if(queryType==='delete'){
      graphQuery=`
      mutation{
        deletePin(id:"${id}")
      }
     `
    }
    else if(queryType==='update'){
      graphQuery=`
      mutation{
        updatePin(id:"${id}", savedBy:[]){
          imgDescription
          savedBy
          id
        }
      }
      `
    }
    else{
      return null
    }
    fetch('/graphql',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: graphQuery }),
      })
    .then((response)=>{
      if(!response.ok){
        throw Error(response.status)
      }
      return response.json()
    })
    .then((jresponse)=>{//can chain up top too but this is cleaner
      console.log(jresponse)
    })
    .catch((err)=>{
      console.log(err)
    })
  }