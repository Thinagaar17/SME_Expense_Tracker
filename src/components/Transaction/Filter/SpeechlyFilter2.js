import React, { useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';
// just copy the code from the exsisting codebase...for more info on this code refer to the youtube video
const SpeechlyFilter2 = props => {
  const { segment } = useSpeechContext();

  useEffect(
    () => {
      if (segment) {
        if (segment.intent.intent === 'reset_changes') {
          props.parentCallback6();
        } else if (segment.intent.intent === 'apply_changes') {
          props.parentCallback7();
        } else if (segment.intent.intent === 'close_model') {
          props.parentCallback8();
        }

        segment.entities.forEach(e => {
          switch (e.type) {
            case 'account':
              const acc = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              props.parentCallback4(acc);
              break;
            case 'tagarray':
              const tag = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              console.log('speechly' + tag);
              props.parentCallback5(tag);
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

export default SpeechlyFilter2;
