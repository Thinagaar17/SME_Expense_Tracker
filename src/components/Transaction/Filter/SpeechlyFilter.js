import React, { useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';
// just copy the code from the exsisting codebase...for more info on this code refer to the youtube video
const SpeechlyFilter = props => {
  const { segment } = useSpeechContext();

  useEffect(
    () => {
      if (segment) {
        if (segment.intent.intent === 'new_transaction') {
          props.parentCallback();
        } else if (segment.intent.intent === 'filter_transaction') {
          props.parentCallback3();
        }

        segment.entities.forEach(e => {
          const filterdate = `${e.value.charAt(0)}${e.value
            .slice(1)
            .toLowerCase()}`;
          switch (e.type) {
            case 'filterdate':
              props.parentCallback2(filterdate);
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

export default SpeechlyFilter;
