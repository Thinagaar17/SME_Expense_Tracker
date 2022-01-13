import React, { useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';
// just copy the code from the exsisting codebase...for more info on this code refer to the youtube video
const SpeechlyTransactionList = props => {
  const { segment } = useSpeechContext();

  useEffect(
    () => {
      if (segment) {
        if (segment.intent.intent === 'cancel_transaction') {
          props.parentCallback();
        }
      }
    },
    [segment]
  );

  return (
    <div>
      {/* {segment ? (
        <div className="segment">
          {segment.words.map(w => w.value).join(' ')}
        </div>
      ) : null} */}
    </div>
  );
};

export default SpeechlyTransactionList;
