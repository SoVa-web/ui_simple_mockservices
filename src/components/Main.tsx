import {useState} from 'react';
import './styles/main.css';
import InputCustom from './InputCustom'
import InputChoosePath from './InputChoosePath';
import ButtonRun from './ButtonRun';
import ListConteiner from './ListConteiner';
import port_server from '../port_server';
import { Item } from './ListConteiner';

function  Main(){
    const [port, set_port] = useState(0);
    const [name, set_name] = useState('');
    const [path, set_path] = useState('')
    const [delay, set_delay] = useState(0)
    const [item_list, set_list] = useState([])
    const [show_create_page, set_show_create_page] = useState(true)
    const [show_list_page, set_show_list_page] = useState(false)

    function read_port(new_port:number){
        set_port(new_port)
    }

    function read_name(new_name:string){
        set_name(new_name)
    }

    function read_path(new_path:string){
        set_path(new_path)
    }

    function read_delay(new_delay:number){
        set_delay(new_delay)
    }

    async function state_after_run(state_create:boolean, state_list:boolean){
        set_show_create_page(state_create)
        set_show_list_page(state_list)
        await get_list()
    }

    async function get_list(){
        const url = new URL(`http://localhost:${port_server}/list`);
          const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
          
        const data:any = await response.json();
        console.log(data);
        set_list(data)
    }

    return (
        <div className='App-main' id='App-main'>
            {
                show_create_page?(
                    <>
                    <button className='button-list' id='button-list'>List mock-services</button>
                    <h2 className='name-content' id='name-content'>Creating mock-service</h2>
                    <div id='Input-conteiner'>
                        <InputCustom label='The name of the mock service' type='text' on_change={read_name}></InputCustom>
                        <InputCustom label='The value of the server response time delay' type='number' on_change={read_delay}></InputCustom>
                        <InputCustom label='The port on which the mock service will be deployed' type='number' on_change={read_port}></InputCustom>
                        <InputChoosePath label='The path where the OpenAPI documentation file is located' type='text' on_change={read_path}></InputChoosePath>
                    </div>
                    <ButtonRun  port={port} path={path} name={name} delay={delay} on_change={state_after_run}></ButtonRun>
                    </>
                ):(
                    <></>
                )
            }
            {
                show_list_page?(
                    <>
                    <h2 className='name-content' id='name-content'>List running mock-services</h2>
                    <ListConteiner list={item_list}></ListConteiner>
                    </>
                ):(
                    <></>
                )
            }
        </div>
      );
}

export default Main