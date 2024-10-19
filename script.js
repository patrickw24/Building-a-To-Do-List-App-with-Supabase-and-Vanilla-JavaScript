let api=`https://jhtgnvxxtcyogorozive.supabase.co/rest/v1/todos`

let token=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodGdudnh4dGN5b2dvcm96aXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzU4NjIsImV4cCI6MjA0NDAxMTg2Mn0.O8nw_GS332iP89quZbi0YZkbEdRrnBYkHd2E4gLy3D8`



const getTasks= async ()=>{
    

    let response= await fetch(api, {
        method: 'GET',
        headers: {
            'apikey': token,
            'Authorization': token,
        }
    });

    let data = await response.json();

    renderTable(data)

}




const renderTable = (data)=>{

    let tableLayout=`<tr>
                    <th>Task</th>
                    <th>Completed</th>
                    <th> Change Status</th>
                    <th>Delete</th>
                    </tr>`

    const statusWord={
        true: "Completed",
        false: "Not Completed"
    }   

    for(let i=0; i < data.length; i++){
        tableLayout+=`<tr>
            <td>${data[i].task}</td>    
            <td>${statusWord[data[i].completed.toString()]}</td> 
            <td> <button onclick="patchCompletion(${data[i].id})" class="btn btn-warning">Task Completed</button> </td>
            <td> <button onclick="deletePost(${data[i].id})" class="btn btn-danger">Delete</button> </td>     
            </tr>`

    }
    toDoTable.innerHTML= tableLayout
}

const addTask = async ()=>{

    event.preventDefault()

    let task= inputTask.value
    let completed= inputComplete.value

    let jsonBody= {
        task,
        completed,
    }

    let response = await fetch(api,{
        method : 'POST',
        headers : {
            'apikey' : token,
            'Authorization' : token,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(jsonBody),
    })
console.log(response)
    if(response.ok){
        getTasks()
        inputTask.value = ""
        inputComplete.value = ""
    }else{
        console.log("Task was not added")
        let body= await response.json()
        console.log(body)
    }

}

const deletePost = async (id)=>{

    let url = `${api}?id=eq.${id}`;
console.log(id)
    let response = await fetch(url,{
        method: 'DELETE',
        headers: {
            'apikey': token, 
            'Authorization': token,
        }
    })

    if(response.ok){
        getTasks()
    }else{
        let responseStatus= await response.json()
        console.log(responseStatus)
    }
}

const patchCompletion = async (id)=>{

    let url = `${api}?id=eq.${id}`;

    

    let patchData= {
        completed : true
    }
    
        let response = await fetch(url,{
            method: 'PATCH',
            headers: {
                'apikey': token, 
                'Authorization': token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patchData)
        })

        if(response.ok){
            
            getTasks()

        }else{
            let responseBody = await response.json();
            console.log(responseBody)
        }

        

}