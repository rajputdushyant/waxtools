import React from 'react';
import './loader.css';

export const Loader = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="loader">
      <div className="loader-icon"></div>
    </div>
  );
}