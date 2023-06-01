import React from "react";
import './styles/main.css'
import port_server from "../port_server";


interface Props{
    name: string,
    port: number
}

const ItemList:React.FC<Props> = ({name, port})=>{
    async function get_log(){
        const url = new URL(`http://localhost:${port_server}/log?name_project=${name}`);
          const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
          
        const data = await response.json();
        console.log("Logs are got");
        return data
    }

    async function view_log(event: React.MouseEvent<HTMLButtonElement>){
        let log:string = ""
        await get_log().then(data=>{
            //тут рендеримо сторінку з логами
        })
    }

    return(
        <li key={`${name}_${port}`}>
            <p>Name mock-service: {name}</p>
            <p>Port: {port}</p>
            <button onClick={view_log}>View details</button>
        </li>
    )
}

export default ItemList