'use client';

import React from 'react';

interface LoginValidationErrorProps {
  message: string | undefined;
}

export default function PreFormError({ message }: LoginValidationErrorProps) {
  return (
    message && (
      <small className="block font-medium p-1 px-0 text-danger-700">
        {message}
      </small>
    )
  );
}
