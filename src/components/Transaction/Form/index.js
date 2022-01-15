import React from 'react';
//import { useSelector } from 'react-redux';
//import { deleteTransactionTharvin } from '../../../actions/ui/form/transaction';
import Accounts from '../../../../src/util/storage/accounts';
import PropTypes from 'prop-types';
import {
  PushToTalkButton,
  PushToTalkButtonContainer
} from '@speechly/react-ui';
import { Form, Button, Dropdown, Input, Segment } from 'semantic-ui-react';
import {
  TransationKindT,
  getKindLabel,
  formToState
} from 'entities/Transaction';
import { DropdownOption } from 'components/types';
import Header from './Header';
import Account from './Account';
import './index.css';
import Speechly from './Speechly';
const { Expense, Transfer, Income } = TransationKindT;
const NoAccounts = () => (
  <div className="transactions-form__empty">You don't have any accounts.</div>
);

class TransactionForm extends React.Component {
  state = {
    searchQuery: '',
    amount: '',
    type: '',
    date: '',
    acc: '',
    tag: '',
    rec: '',
    accounts: []
  };

  //fetch all accounts from the db
  async componentDidMount() {
    const account = await Accounts.loadAll();
    this.setState({ accounts: account });
  }

  // TODO: use callback function to get data from Speechly.js
  // TODO: set childData (data from account.js) to the respective varible (ex: this.props.form.amount )
  callbackFunction = childData => {
    this.setState({ amount: childData });
    this.props.form.amount = childData;
    this.props.form.linkedAmount = childData;
  };

  callbackFunction2 = childData => {
    this.setState({ type: childData });
    console.log('type: ' + childData);
    if (childData === 'Income') {
      this.props.form.kind = Income;
    } else if (childData === 'Expense') {
      this.props.form.kind = Expense;
    } else if (childData === 'Trasfer') {
      this.props.form.kind = Transfer;
    } else {
      return null;
    }
  };

  callbackFunction3 = childData => {
    this.setState({ date: childData });
    this.props.form.date = childData;
  };

  callbackFunction4 = childData => {
    let ACC = this.state.accounts;
    const newArray = ACC.filter(element => element.name === childData);
    if (newArray === []) {
      return null;
    } else {
      let accountId = newArray[0].id;
      this.setState({ acc: accountId });
      this.props.form.accountId = accountId;
    }
    // A1640612184826 Adam
    // A1640604653660 Alex
    // A1640612275930 John
    // console.log('Acc ' + childData);
    // if (childData === 'Adam') {
    //   //setstate (re render the componenet)
    //   this.setState({ acc: 'A1640612184826' });
    //   //global variable
    //   this.props.form.accountId = 'A1640612184826';
    // } else if (childData === 'Alex') {
    //   this.setState({ acc: 'A1640604653660' });
    //   this.props.form.accountId = 'A1640604653660';
    // } else if (childData === 'John') {
    //   this.setState({ acc: 'A1640612275930' });
    //   this.props.form.accountId = 'A1640612275930';
    // }
  };

  callbackFunction5 = childData => {
    //  this.props.addTag({ kind: Income, tag: childData });
    if (this.props.form.kind === Income) {
      this.props.addTag({ kind: Income, tag: childData });
      this.props.form.tags = {
        0: [],
        2: [childData]
      };
      this.setState({ tag: childData });
    } else {
      this.props.addTag({ kind: Expense, tag: childData });
      this.props.form.tags = {
        0: [childData],
        2: []
      };
      this.setState({ tag: childData });
    }
  };

  callbackFunction6 = childData => {
    let ACC = this.state.accounts;
    const newArray = ACC.filter(element => element.name === childData);
    if (newArray === []) {
      return null;
    } else {
      let accountId = newArray[0].id;
      this.setState({ rec: accountId });
      this.props.form.linkedAccountId = accountId;
    }
    // if (childData === 'Adam') {
    //   //setstate (re render the componenet)
    //   this.setState({ rec: 'A1640612184826' });
    //   //global variable
    //   this.props.form.linkedAccountId = 'A1640612184826';
    // } else if (childData === 'Alex') {
    //   this.setState({ rec: 'A1640604653660' });
    //   this.props.form.linkedAccountId = 'A1640604653660';
    // } else if (childData === 'John') {
    //   this.setState({ rec: 'A1640612275930' });
    //   this.props.form.linkedAccountId = 'A1640612275930';
    // }
  };

  // callbackFunction7 = childData => {
  //   console.log(childData);
  //   this.props.deleteTransactionTharvin = childData;
  // };
  // end of callback function

  onSubmit = event => {
    event.preventDefault();
    this.props.saveTransaction(formToState(this.props.form));
  };

  onSubmitFromSpeechly = event => {
    console.log('transaction masuk');
    if (this.props.form.amount !== '' && this.state.amount !== '0') {
      this.props.saveTransaction(formToState(this.props.form));
      this.setState({ amount: 0 });
      console.log('not edit');
    }
  };

  onSubmitFromSpeechlyEditedForm = () => {
    if (parseInt(this.props.form.amount) > 0) {
      this.props.saveTransaction(formToState(this.props.form));
      this.props.form.amount = '0';
    }
    console.log(typeof this.props.form.amount);
    console.log('amount ' + this.props.form.amount);
    console.log('amount ' + this.props.form.amount === 'String');
    console.log('edit');
  };

  onChange = handler => (_, { value }) => handler(value);

  onAccountChange = handler => (_, { value }) => {
    console.log(' in change acc func ' + value);
    handler({
      accountId: value,
      currency: this.props.accountCurrency[value]
    });
  };

  onTagAdd = (_, { value }) => {
    this.props.addTag({ kind: this.props.form.kind, tag: value });
  };
  onTagSearchChange = (_, { searchQuery }) => this.setState({ searchQuery });
  onTagClose = () => this.setState({ searchQuery: '' });

  getCurrencyOptions = accountId => {
    return this.props.accountCurrency[accountId].map(code => ({
      key: code,
      value: code,
      text: code
    }));
  };

  getGridClassName = () =>
    this.props.form.kind === Transfer
      ? 'transaction-form-grid single-line'
      : 'transaction-form-grid';

  render() {
    if (!this.props.form.accountId) return <NoAccounts />;

    return (
      <React.Fragment>
        <Header
          withTransfer={!!this.props.form.linkedAccountId}
          activeKind={this.props.form.kind}
          changeKind={this.props.changeKind}
        />
        {/* <label>{deleteTransactionTharvin}</label> */}
        {/* Initialize Speechly component with respectuve callback funtion */}
        <Speechly
          parentCallback={this.callbackFunction}
          parentCallback2={this.callbackFunction2}
          parentCallback3={this.callbackFunction3}
          parentCallback4={this.callbackFunction4}
          parentCallback5={this.callbackFunction5}
          parentCallback6={this.onSubmitFromSpeechly}
          parentCallback7={this.callbackFunction6}
          parentCallback8={this.onSubmitFromSpeechlyEditedForm}
          // parentCallback8={this.callbackFunction7}
        />
        <Segment attached="bottom">
          <Form onSubmit={this.onSubmit} className="transaction-form">
            <Account
              label={this.props.form.kind === Income ? 'To' : 'From'}
              accountId={this.props.form.accountId}
              amount={this.props.form.amount}
              currency={this.props.form.currency}
              accountOptions={this.props.accountOptions}
              currencyOptions={this.getCurrencyOptions(
                this.props.form.accountId
              )}
              onAccountChange={this.onAccountChange(this.props.changeAccount)}
              onAmountChange={this.onChange(this.props.changeAmount)}
              onCurrencyChange={this.onChange(this.props.changeCurrency)}
            />
            {this.props.form.kind === Transfer && (
              <Account
                label="To"
                accountId={this.props.form.linkedAccountId}
                amount={this.props.form.linkedAmount}
                currency={this.props.form.linkedCurrency}
                accountOptions={this.props.accountOptions}
                currencyOptions={this.getCurrencyOptions(
                  this.props.form.linkedAccountId
                )}
                onAccountChange={this.onAccountChange(
                  this.props.changeLinkedAccount
                )}
                onAmountChange={this.onChange(this.props.changeLinkedAmount)}
                onCurrencyChange={this.onChange(
                  this.props.changeLinkedCurrency
                )}
              />
            )}
            <div className={this.getGridClassName()}>
              <div className="transaction-form-grid__column-wide">
                {this.props.form.kind !== Transfer && (
                  <div className="transaction-form-grid__field">
                    <Form.Field>
                      <label>Tags</label>
                      <Dropdown
                        multiple
                        selection
                        search
                        allowAdditions
                        closeOnChange
                        placeholder="Choose existing tags or add new"
                        value={this.props.form.tags[this.props.form.kind]}
                        options={this.props.tagsOptions}
                        onChange={this.onChange(this.props.changeTags)}
                        onAddItem={this.onTagAdd}
                        onClose={this.onTagClose}
                        onSearchChange={this.onTagSearchChange}
                        searchQuery={this.state.searchQuery}
                      />
                    </Form.Field>
                  </div>
                )}
                <div className="transaction-form-grid__field">
                  <Form.Field>
                    <Input
                      placeholder="Note"
                      value={this.props.form.note}
                      onChange={this.onChange(this.props.changeNote)}
                    />
                  </Form.Field>
                </div>
              </div>
              <div className="transaction-form-grid__column-narrow">
                <div className="transaction-form-grid__field">
                  <Form.Field>
                    <Input
                      required
                      fluid
                      type="date"
                      value={this.props.form.date}
                      onChange={this.onChange(this.props.changeDate)}
                    />
                  </Form.Field>
                </div>
                <div className="transaction-form-grid__field">
                  <Button
                    primary
                    fluid
                    disabled={parseFloat(this.props.form.amount) === 0}
                  >
                    {this.props.form.id ? 'Save' : 'Add'}{' '}
                    {getKindLabel(this.props.form.kind)}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Segment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <PushToTalkButtonContainer>
            <PushToTalkButton />
          </PushToTalkButtonContainer>
        </div>
      </React.Fragment>
    );
  }
}

TransactionForm.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string,
    kind: PropTypes.oneOf([Expense, Transfer, Income]),
    accountId: PropTypes.string,
    amount: PropTypes.string,
    currency: PropTypes.string,
    linkedAccountId: PropTypes.string,
    linkedAmount: PropTypes.string,
    linkedCurrency: PropTypes.string,
    tags: PropTypes.shape({
      [Expense]: PropTypes.arrayOf(PropTypes.string),
      [Income]: PropTypes.arrayOf(PropTypes.string)
    }),
    date: PropTypes.string,
    note: PropTypes.string
  }),
  accountCurrency: PropTypes.object.isRequired,
  accountOptions: PropTypes.arrayOf(DropdownOption).isRequired,
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  changeKind: PropTypes.func.isRequired,
  changeAccount: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changeCurrency: PropTypes.func.isRequired,
  changeLinkedAccount: PropTypes.func,
  changeLinkedAmount: PropTypes.func,
  changeLinkedCurrency: PropTypes.func,
  addTag: PropTypes.func,
  deleteTransactionTharvin: PropTypes.func,
  changeTags: PropTypes.func,
  changeDate: PropTypes.func.isRequired,
  changeNote: PropTypes.func.isRequired,
  loadTags: PropTypes.func,
  saveTransaction: PropTypes.func.isRequired
};

export default TransactionForm;
