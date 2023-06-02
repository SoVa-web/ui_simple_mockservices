import { ChangeEvent, useState } from 'react';
import './styles/main.css';

interface Props {
    label: string;
    type: string;
    on_change: any
  }

const InputChoosePath: React.FC<Props> = ({ label, type, on_change }) => {
    const [value, set_file] = useState('');
  
    function handle_change(event:ChangeEvent<HTMLInputElement>){
      if(event.target.value != null){
        const path:RegExp = /^[A-Za-z]:[/](?:[^/]+[/])*[^/]+$/;
        path.test(event.target.value)
        if (path.test(event.target.value) && event.target.value.endsWith('.yaml')) {
          set_file(event.target.value.replace('/\\/g', '/'));
        } else {
          set_file('');
        }
        on_change(event.target.value);
      }
    };

    function check_length(path:string){
      if(path.length > 50){
        let first_part:string = path.slice(0, 20);
        let second_part:string = path.slice(-20)
        return first_part + "..." + second_part
      }
      if(path.length === 0){
        return "incorrect path"
      }
      return path
    }
  
    return (
      <div className='Input-custom'>
        <label>{label}</label>
        <p>Choosed file: {check_length(value)}</p>
        <input
          type={type}
          onChange={handle_change}
          
        />
      </div>
    );
};
  
export default InputChoosePath;