import React from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox } from 'semantic-ui-react';
import { getAccountGroupOptions, formTostate } from 'entities/Account';
import BalanceTable from './BalanceTable';
import './index.css';
import Speechly from '../Speechly2';

class AccountForm extends React.Component {
  state = { amount: '', type: '', name: ''};

  constructor(props) {
    super(props);

    this.groups = getAccountGroupOptions();
  }

  callbackFunction = childData => {
    this.setState({ name: childData });
    this.props.form.name = childData;
    console.log('name: ' + childData);
    
  };

  callbackFunction2 = childData => {
    this.setState({ type: childData });
    console.log('group: ' + childData);
    if (childData === 'cash') {
      this.props.form.group = childData;
    } else if (childData === 'bank'){
      this.props.form.group = childData;
    }else if (childData === 'deposit'){
      this.props.form.group = childData;
    }else if (childData === 'credit'){
      this.props.form.group = childData;
    }else if (childData === 'asset'){
      this.props.form.group = childData;
    }else{
      return null;
    }
  };

  callbackFunction3 = childData => {
    const getCurrency = this.props.form.currencies;
    this.setState({ amount: childData });
    this.props.form.balance[getCurrency] = childData;
    console.log('currency: '+ getCurrency +' , balanceIndex: ' + childData);
  };

  handleNameChange = (event, { value }) => this.props.changeName(value);
  handleGroupChange = (event, { value }) => this.props.changeGroup(value);

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveAccount(formTostate(this.props.form));
  };

  handleSubmitFromSpeechly = event => {
    console.log("her2");
    if (this.props.form.balance[this.props.form.currencies] !== '0' && this.props.form.name !== '') {
      console.log("here");
      this.props.saveAccount(formTostate(this.props.form));
      this.setState({ amount: 0 , name: ''});
      this.props.form.balance[this.props.form.currencies] = '0';
      this.props.form.name = '';
      setTimeout(function() { 
        window.location.reload();; 
      }, 1000);
      // window.location.reload();
    }
  };

  render() {
    return (
      <Form className="account-form" onSubmit={this.handleSubmit}>
        <div elevation={3} style={{ textAlign: 'center', padding: '0 10%' }}>
          Try saying: <br /> 
          Set account 'name' with group 'type of group' for amount 'amount' <br />
        </div>
        {/* Initialize Speechly component with respectuve callback funtion */}
        <Speechly
          parentCallback1={this.callbackFunction}
          parentCallback2={this.callbackFunction2}
          parentCallback3={this.callbackFunction3}
          parentCallback4={this.handleSubmitFromSpeechly}
        />
        <Form.Group>
          <Form.Input
            width={9}
            required
            label="Name"
            placeholder="Account name"
            value={this.props.form.name}
            onChange={this.handleNameChange}
          />
          <Form.Select
            width={7}
            label="Group"
            value={this.props.form.group}
            options={this.groups}
            onChange={this.handleGroupChange}
          />
        </Form.Group>
        <BalanceTable {...this.props} />
        <Form.Group unstackable>
          <Form.Field width={9} style={{ paddingTop: '0.5em' }}>
            <Checkbox
              label="Show on Dashboard"
              checked={this.props.form.on_dashboard}
              onChange={this.props.toggleOnDashboard}
            />
          </Form.Field>
          <Form.Button width={7} primary fluid content="Save Account" />
        </Form.Group>
      </Form>
    );
  }
}

AccountForm.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    group: PropTypes.string,
    balance: PropTypes.objectOf(PropTypes.string),
    currencies: PropTypes.arrayOf(PropTypes.string),
    on_dashboard: PropTypes.bool
  }),
  base: PropTypes.string.isRequired,
  secondary: PropTypes.arrayOf(PropTypes.string),
  changeName: PropTypes.func,
  changeGroup: PropTypes.func,
  toggleOnDashboard: PropTypes.func,
  toggleCurrency: PropTypes.func.isRequired,
  changeBalance: PropTypes.func.isRequired,
  saveAccount: PropTypes.func
};

export default AccountForm;
