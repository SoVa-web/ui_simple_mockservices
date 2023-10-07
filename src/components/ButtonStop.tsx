import React, { useEffect } from "react";
import './styles/main.css'
import port_server from "../port_server";

interface Props{
    on_change:any
    name:string
}


const ButtonStop: React.FC<Props> = ({on_change, name})=>{

    async function stop(){
        const url = new URL(`http://localhost:${port_server}/stop?name_project=${name}`);
          const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
          
        const data:any = await response.json();
        return data
    }

    async function del_service(){
        const url = new URL(`http://localhost:${port_server}/delete?name_project=${name}`);
          const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
          
        const data:any = await response.json();
        return data
    }

    function delete_service(event: React.MouseEvent<HTMLButtonElement>){
        stop().then((res)=>{
            del_service().then((response)=>{
                on_change(false, true, false)
            })
        })
    }

    return(
        <button className='button-stop' onClick={delete_service}>Stop and delete</button>
    )
}

export default ButtonStop