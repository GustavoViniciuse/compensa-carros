import type { InputHTMLAttributes } from 'react';
import './styles.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
}

export function InputGroup({ label, prefix, ...props }: Props) {
  return (
    <div className={'wrapper'}>
      <label className={'label'}>
        {label}
      </label>
      
      <div className={'inputContainer'}>
        {prefix && <span className={'prefix'}>{prefix}</span>}
        
        <input 
          className={'input'} 
          {...props} 
        />
      </div>
    </div>
  );
}