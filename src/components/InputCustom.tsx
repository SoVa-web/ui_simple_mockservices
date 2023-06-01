import { ChangeEvent, useState } from 'react';
import './styles/main.css';

interface Props {
    label: string;
    type: string;
    on_change: any
  }

const InputCustom: React.FC<Props> = ({ label, type, on_change}) => {
    const [value, set_value] = useState('');
  
    function handle_change(event: ChangeEvent<HTMLInputElement>){
      set_value(event.target.value);
      on_change(event.target.value);
    };
  
    return (
      <div className='Input-custom'>
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={handle_change}
        />
      </div>
    );
};
  
export default InputCustom;