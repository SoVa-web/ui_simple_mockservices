import { ChangeEvent, useState } from 'react';
import './styles/main.css';

interface Props {
    label: string;
    type: string;
  }

const InputCustom: React.FC<Props> = ({ label, type }) => {
    const [value, setValue] = useState('');
  
    function handleChange(event: ChangeEvent<HTMLInputElement>){
      setValue(event.target.value);
    };
  
    return (
      <div className='Input-custom'>
        <label>{label}</label>
        <input
          type={type}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
};
  
export default InputCustom;