import React from "react";
import './styles/main.css'
import port_server from "../port_server";

interface Props{
    port:number,
    path:string,
    name: string,
    delay:number
}

const ButtonRun: React.FC<Props> = ({port, path, name, delay})=>{

    async function fetch_create():Promise<any>{
        const url = new URL(`http://localhost:${port_server}/create?port=${port}&path_openapi=${path}&name_project=${name}&delay=${delay}`);

        try {
          const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
          
          const data = await response.json();
          return data
        } catch (error) {
          console.log(error);
          return error
        }
    }

    async function fetch_run():Promise<any>{
        const url = new URL(`http://localhost:${port_server}/run?port=${port}&name_project=${name}`);
          const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
          
          const data = await response.json();
          console.log(data);
          return data
    }
    
    async function create_and_run(event: React.MouseEvent<HTMLButtonElement>){
        if(!port||port <= 0) {
            alert("Port is invalid");
            return
        }
        if(!name||name === ''){
            alert("Name mock-service is invalid");
            return
        }
        if(!path||path === ''){
            alert("Path to file OpenAPI .yaml is invalid")
            return
        }
        if(!delay||delay < 0){
            alert("Delay is invalid")
            return
        }
        await fetch_create().then(async res=>{
            console.log(res)
            await fetch_run().then(res_run=>{
                console.log(res_run)
                alert(res_run);
            })
        })

        console.log(port, name, path, delay)
    }

    return(
        <button className='button-create' onClick={create_and_run}>
                Create and run
        </button>
    )
}

export default ButtonRun