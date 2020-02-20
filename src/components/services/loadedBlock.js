import React from 'react';

export default function LoadedBlock({title='Loaded...', errors}) {
  return (
    <div className="photogalery">
      {errors.length?errors.map((el, count)=><div className="errors" key={count}>{el}</div>):<div className="loaded">{title}</div>}
    </div>
  );
}