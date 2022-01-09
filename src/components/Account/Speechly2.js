import React, { useState, useContext, useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';

const Speechly = props => {
  const { segment } = useSpeechContext();

  useEffect(() => {
      if (segment) {
        segment.entities.forEach(e => {
          const category = `${e.value.charAt(0).toLowerCase()}${e.value.slice(1).toLowerCase()}`;
          switch (e.type) {
            case 'account':
                console.log(e.value);
                props.parentCallback1(e.value.toLocaleLowerCase());
                break;
            case 'group':
                props.parentCallback2(category);
                break;
            case 'amount':
                props.parentCallback3(e.value);
                break;
            default:
              break;
          }
        });
        if(segment.intent.intent === 'create_account'){
            props.parentCallback4();
        }
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