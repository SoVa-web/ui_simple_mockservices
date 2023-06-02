import React, { useEffect, useState } from 'react'
import './styles/main.css'
import port_server from '../port_server'

interface Props{
    log_file:string
}

const LogConteiner:React.FC<Props> = ({log_file})=>{
    const [log, set_log] = useState('')
    const [log_is, set_get] = useState(false)

    async function get_log(){
        let data:string = ''
        const url = new URL(`http://localhost:${port_server}/log?name_project=${log_file}`);
          const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
          
        try{
            data = await response.json();
            console.log("Logs are got");
        }catch(error){
            console.log("Error reading log")
            console.log(data)
        }
        return data
    }

    useEffect(() => {
        get_log().then((data) => {
          set_log(data);
          set_get(true);
        });
    }, []);


    if (!log_is) {
        return (
            <textarea className='content textarea'
                readOnly 
                value={"Data is loadding. Please wait."}>
            </textarea>
        )
    } else {
        return (
            <textarea className='content textarea'
                readOnly 
                value={log}>
            </textarea>
        )
    }
}

export default LogConteiner