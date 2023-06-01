import React from 'react';
import './styles/main.css';
import InputCustom from './InputCustom'

function Main(){
    return (
        <div className='App-main'>
            <button className='button-list'>
                List mock-services
            </button>
            <h2 className='name-content'>Creating mock-service</h2>
            <div className='Input-conteiner'>
            <InputCustom label={'The name of the mock service'} type={'text'}></InputCustom>
            <InputCustom label={'The value of the server response time delay'} type={'number'}></InputCustom>
            <InputCustom label={'Порт на якому буде розгорнуто mock-сервіс'} type={'number'}></InputCustom>
            </div>
            <button className='button-list'>
                Create and run
            </button>
        </div>
      );
}

export default Main