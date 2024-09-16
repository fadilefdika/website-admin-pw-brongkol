import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingSpinnerProps {
  message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => (
  <div className="flex items-center justify-center h-screen">
    <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
    <p className="ml-2">{message}</p>
  </div>
);

export default LoadingSpinner;
