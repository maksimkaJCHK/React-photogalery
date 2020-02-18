import React from 'react';

export default function LoadedBlock({title='Loaded...'}) {
  return (
    <div className="photogalery">
      <div className="loaded">{title}</div>
    </div>
  );
}