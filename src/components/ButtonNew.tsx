import React from "react";
import './styles/main.css'

interface Props{
    on_change:any
}


const ButtonNew: React.FC<Props> = ({on_change})=>{

    async function get_list(event: React.MouseEvent<HTMLButtonElement>){
        on_change(true, false, false)
    }

    return(
        <button className='button-new' onClick={get_list}>Create new</button>
    )
}

export default ButtonNew