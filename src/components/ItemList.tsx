import React from "react";
import './styles/main.css'


interface Props{
    name: string,
    port: number,
    on_change:any
}

const ItemList:React.FC<Props> = ({name, port, on_change})=>{
    async function view_log(event: React.MouseEvent<HTMLButtonElement>){
        on_change(false, false, true, name, port)
    }

    return(
        <div id={`${name}_${port}`} className='item-list'>
            <p>Name mock-service: {name}</p>
            <p>Port: {port}</p>
            <button className="item-button" onClick={view_log}>View details</button>
        </div>
    )
}

export default ItemList