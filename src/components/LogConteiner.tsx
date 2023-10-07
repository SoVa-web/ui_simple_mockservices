import React, { useEffect, useState } from 'react'
import './styles/main.css'
import port_server from '../port_server'
import socketIOClient from 'socket.io-client'

interface Props{
    log_file:string
}

const LogConteiner:React.FC<Props> = ({log_file})=>{
    const [log, set_log] = useState('')
    const [log_is, set_get] = useState(false)
    const socket = socketIOClient(`http://localhost:5003/`, {
        query:{
            username:"ui"
        }
    })


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

    useEffect(() => {
        socket.on('log',  (data) => {
            console.log(data)
            if(data.name_service === log_file){
                 set_log(log + data.content)
            }  
        })

        return () => {
            socket.close();
        }
    }, [log])


    if (!log_is) {
        return (
            <textarea className='textarea'
                readOnly 
                value={`Data is loadding. Please wait`}>
            </textarea>
        )
    } else {
        return (
            <textarea className='textarea'
                readOnly 
                value={log}>
            </textarea>
        )
    }
}

export default LogConteiner