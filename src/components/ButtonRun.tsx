import React from "react";
import './styles/main.css'
import port_server from "../port_server";

interface Props{
    port:number,
    path:string,
    name: string,
    delay:number,
    on_change:any
}

const ButtonRun: React.FC<Props> = ({port, path, name, delay, on_change})=>{

    async function fetch_create():Promise<any>{
        let path_replaced = path.replace(/\\/g, "/")
        const url = new URL(`http://localhost:${port_server}/create?port=${port}&path_openapi=${path_replaced}&name_project=${name}&delay=${delay}`);

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
          const stat = response.status
          return {
            status: stat,
            message: data
          }
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
            if(res.status === 200)
                await fetch_run().then(res_run=>{
                    alert(res_run);
                    on_change(false, true)
                })
            else
                alert(res.message)
        })
    }

    return(
        <button className='button-create' onClick={create_and_run}>
                Create and run
        </button>
    )
}

export default ButtonRun