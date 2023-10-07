import {useState} from 'react';
import './styles/main.css';
import InputCustom from './InputCustom'
import InputChoosePath from './InputChoosePath';
import ButtonRun from './ButtonRun';
import ListConteiner from './ListConteiner';
import port_server from '../port_server';
import ButtonList from './ButtonList';
import ButtonNew from './ButtonNew';
import LogConteiner from './LogConteiner';
import ButtonStop from './ButtonStop';

function  Main(){
    const [port, set_port] = useState(0);
    const [name, set_name] = useState('');
    const [path, set_path] = useState('')
    const [delay, set_delay] = useState(0)
    const [item_list, set_list] = useState([])
    const [show_create_page, set_show_create_page] = useState(true)
    const [show_list_page, set_show_list_page] = useState(false)
    const [show_details_page, set_show_details_page] = useState(false)
    const [current_name, set_current_name] = useState('')
    const [current_port, set_current_port] = useState(0)
    const [upd, set_upd]=useState(false)

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

    async function state_after_run(state_create:boolean, state_list:boolean, state_details:boolean){
        set_show_create_page(state_create)
        set_show_list_page(state_list)
        set_show_details_page(state_details)
        await get_list()
    }

    function state_new(state_create:boolean, state_list:boolean, state_details:boolean){
        set_show_create_page(state_create)
        set_show_list_page(state_list)
        set_show_details_page(state_details)
        set_list([])
    }

    function state_details(state_create:boolean, 
            state_list:boolean, 
            state_details:boolean,
            current_n:string,
            current_p:number
        ){
        set_show_create_page(state_create)
        set_show_list_page(state_list)
        set_show_details_page(state_details)
        set_current_name(current_n)
        set_current_port(current_p)
        set_list([])
        set_upd(true)
    }

    function update_details(event: React.MouseEvent<HTMLButtonElement>){
        set_upd(false)
        setTimeout(()=>{
            set_upd(true)
        }, 1)
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
        set_list(data)
    }



    return (
        <div className='App-main' id='App-main'>
            {
                show_create_page?(
                    <>
                    <div className='block-button-list level-block'>
                        <ButtonList on_change={state_after_run}></ButtonList>
                    </div>
                    <h2 className='name-content' id='name-content'>Creating mock-service</h2>
                    <div id='Input-conteiner' className='content'>
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
                    <div className='content-list'>
                        <div className='scroll-list'>
                            <ListConteiner list={item_list} on_change_item={state_details}></ListConteiner>
                        </div>
                    </div>
                    {
                        (item_list.length === 0)?(
                            <h2 id='empty_list'>Oh. No one running mockservice. Push "Create new"</h2>
                        ):(
                            <></>
                        )
                    }
                    <ButtonNew on_change={state_new}></ButtonNew>
                    </>
                ):(
                    <></>
                )
            }
            {
                (show_details_page && upd)?(
                    <>
                    <div className='block-button-list level-block'>
                        <ButtonList on_change={state_after_run}></ButtonList>
                    </div>
                    <div className='block-name-page level-block'>
                        <h2 className='name-content' id='name-content'>Details mock-servise {current_name} on port {current_port}</h2>
                    </div>
                    <LogConteiner log_file={current_name}></LogConteiner>    
                    <div className='bottom-button level-block'>
                        <ButtonStop on_change={state_after_run} name={current_name}></ButtonStop>
                        <ButtonNew on_change={state_new}></ButtonNew>
                        <button className='button-stop' onClick={update_details}>Update</button>
                    </div>
                    </>
                ):(
                    <></>
                )
            }
        </div>
      );
}

export default Main