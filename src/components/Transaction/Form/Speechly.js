import React, { useEffect } from 'react';
import { useSpeechContext } from '@speechly/react-client';
// just copy the code from the exsisting codebase...for more info on this code refer to the youtube video
const Speechly = props => {
  const { segment } = useSpeechContext();

  useEffect(
    () => {
      if (segment) {
        if (segment.intent.intent === 'create_transaction') {
          props.parentCallback6();
        } else if (segment.intent.intent === 'add_income') {
          props.parentCallback2('Income');
        } else if (segment.intent.intent === 'add_expense') {
          props.parentCallback2('Expense');
        } else if (segment.intent.intent === 'add_transaction') {
          props.parentCallback2('Trasfer');
        }else if (segment.intent.intent === 'save_transaction' ) {
          props.parentCallback8();
        }

        segment.entities.forEach(e => {
          const category = `${e.value.charAt(0)}${e.value
            .slice(1)
            .toLowerCase()}`;
          switch (e.type) {
            case 'amount':
              props.parentCallback(e.value);
              break;
            case 'category':
              props.parentCallback2(category);
              break;
            case 'date':
              props.parentCallback3(e.value);
              break;
            case 'account':
              const acc = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              console.log('From ' + acc);
              props.parentCallback4(acc);
              break;
            case 'tag':
              const tag = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              props.parentCallback5(tag);
              break;
            case 'receiver':
              const rec = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              props.parentCallback7(rec);
              console.log('To ' + rec);
              break;
            case 'trans':
              const trans = `${e.value.charAt(0)}${e.value
                .slice(1)
                .toLowerCase()}`;
              props.parentCallback2(trans);
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
