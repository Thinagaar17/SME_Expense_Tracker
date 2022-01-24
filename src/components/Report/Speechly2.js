import React, { useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';

const Speechly = props => {
  const { segment } = useSpeechContext();

  useEffect(
    () => {
      if (segment) {
        segment.entities.forEach(e => {
          switch (e.type) {
            case 'tagarray':
              const tag = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              props.parentCallback3(tag);
              console.log(tag);
              break;
            case 'account_name':
              const acc = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              props.parentCallback4(acc);
              break;
              case 'reporttag':
                const tag2 = `${e.value.charAt(0)}${e.value
                  .slice(1)
                  .toLowerCase()}`;
                props.parentCallback3(tag);
                console.log(tag2);
                break;
                case 'account':
                  const acc2 = `${e.value.charAt(0)}${e.value
                    .slice(1)
                    .toLowerCase()}`;
                  props.parentCallback4(acc2);
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
