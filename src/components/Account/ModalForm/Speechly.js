import React, { useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';
// just copy the code from the exsisting codebase...for more info on this code refer to the youtube video
const Speechly = props => {
  const { segment } = useSpeechContext();

  useEffect(
    () => {
      if (segment) {
        if (segment.intent.intent === 'delete_account') {
          props.parentCallback();
        }
        else if (segment.isFinal && segment.intent.intent === 'proceed') {
           
            props.parentCallback2();
            segment.isFinal = false;
            
        }
        else if (segment.intent.intent === 'not_proceed') {
            props.parentCallback3();
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
