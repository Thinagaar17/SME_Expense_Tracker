import React, { useState, useContext, useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';
// just copy the code from the exsisting codebase...for more info on this code refer to the youtube video
const Speechly = props => {
  const { segment } = useSpeechContext();

  useEffect(
    () => {
      if (segment) {
        segment.entities.forEach(e => {
          const category = `${e.value.charAt(0)}${e.value
            .slice(1)
            .toLowerCase()}`;
          switch (e.type) {
            case 'amount':
              props.parentCallback(e.value);
              break;
            case 'category':
              console.log(category);
              props.parentCallback2(category);
              break;
            case 'date':
              props.parentCallback3(e.value);
              break;
            default:
              break;
          }
        });
      }
    },
    [segment]
  );

  return (
    <div>
      {segment ? (
        <div className="segment">
          {segment.words.map(w => w.value).join(' ')}
        </div>
      ) : null}
    </div>
  );
};

export default Speechly;
