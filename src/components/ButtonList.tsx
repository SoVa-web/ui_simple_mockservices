import React from "react";
import './styles/main.css'

interface Props{
    on_change:any
}


const ButtonList: React.FC<Props> = ({on_change})=>{

    async function get_list(event: React.MouseEvent<HTMLButtonElement>){
        on_change(false, true, false)
    }

    return(
        <button className='button-list' onClick={get_list}>List mock-services</button>
    )
}

export default ButtonList