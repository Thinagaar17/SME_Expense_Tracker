import React, { useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';

const Speechly = props => {
    const { segment } = useSpeechContext();
  
    useEffect(
        () => {
          if (segment) {

            segment.entities.forEach((e) => {
              const tag2 = [];
                switch (e.type) {
                  
                    case 'reporttag':
                        const tag = `${e.value.slice(0).toLowerCase()}`;
                        props.parentCallback3(tag);
                        break;
                    case 'account_name':
                      const acc = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                      props.parentCallback4(acc);
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
