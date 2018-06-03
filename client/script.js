document.addEventListener("DOMContentLoaded", function() {
    console.log("Document has loaded!!")
    withFetch()
  });

  function withFetch(){
    //let url="https://api.coindesk.com/v1/bpi/currentprice.json"
    let url="http://localhost:3000/graphql"
    //can also provide options to fetch 
    fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ singlePin(id: "5a81f1f66dbd9c00158f53cd") { id,imgDescription } }' }),
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