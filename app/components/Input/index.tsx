'use client';

import React, { InputHTMLAttributes, useRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | FieldError;
  htmlFor?: string;
}

function PreRefInput({ ...props }: InputProps, ref: any) {
  return (
    <input
      ref={ref}
      {...props}
      className={`border-2 rounded-lg p-2 px-3 w-full focus:outline-none focus:ring focus:ring-primary-300 ${
        props.error ? 'border-pink-800 focus:ring-red-300' : 'border-stone-200'
      } ${props.className}`}
    />
  );
}

const Input = React.forwardRef(PreRefInput);

export default Input;
