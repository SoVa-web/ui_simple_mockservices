import {useState} from 'react';
import './styles/main.css';
import InputCustom from './InputCustom'
import InputChoosePath from './InputChoosePath';
import ButtonRun from './ButtonRun';

function  Main(){
    const [port, set_port] = useState(0);
    const [name, set_name] = useState('');
    const [path, set_path] = useState('')
    const [delay, set_delay] = useState(0)

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

    return (
        <div className='App-main'>
            <button className='button-list'>
                List mock-services
            </button>
            <h2 className='name-content'>Creating mock-service</h2>
            <div id='Input-conteiner'>
            <InputCustom label='The name of the mock service' type='text' on_change={read_name}></InputCustom>
            <InputCustom label='The value of the server response time delay' type='number' on_change={read_delay}></InputCustom>
            <InputCustom label='The port on which the mock service will be deployed' type='number' on_change={read_port}></InputCustom>
            <InputChoosePath label='The path where the OpenAPI documentation file is located' type='text' on_change={read_path}></InputChoosePath>
            </div>
            <ButtonRun port={port} path={path} name={name} delay={delay}></ButtonRun>
            
        </div>
      );
}

export default Main