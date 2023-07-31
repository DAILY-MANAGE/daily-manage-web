import React, { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FormInputProps extends LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
}

export default function FormLabel({ ...props }: FormInputProps) {
  return (
    <label
      htmlFor={props.htmlFor}
      className={twMerge(
        'inline-block font-semibold text-medium mt-4 mb-1',
        props.className
      )}
    >
      {props.label}
    </label>
  );
}
