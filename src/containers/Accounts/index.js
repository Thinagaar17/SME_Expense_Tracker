import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import {
  loadAccounts,
  removeAccountRequest,
  removeAccount
} from '../../actions/entities/accounts';
import {
  openAccountInModal,
  resetAccountForm
} from '../../actions/ui/form/account';
import { getForm, getModal } from '../../selectors/ui/form/account';
import ModalForm from '../../components/Account/ModalForm';
import AccountsList from './List';
import AccountForm from './Form';
import { getAccountsAsOptions } from '../../selectors/entities/accounts';

class Accounts extends React.Component {
  componentWillMount() {
    this.props.loadAccounts();
  }

  render() {
    return (
      <div className="container-full-page flat">
        <div className="container-header">
          <div style={{ border: '1px solid blue', padding: '10px', marginBottom: '15px'}}>
            <p style={{ marginTop: '0.4em', fontWeight: 'bold', textAlign: 'center', textDecoration: 'underline'}}>Voice Command Guideline</p>
            <p>To save account, confirm delete or cancel delete:</p>
            <ul>
              <li>Stop pressing the microphone button after add account details or after delete account</li>
              <li>Press the button again and say respective command</li>
            </ul>
          </div>
          <Button.Group basic>
            <Button
              icon="plus"
              labelPosition="left"
              content="New"
              onClick={this.props.openAccountInModal}
            />
          </Button.Group>
        </div>
        <div className="accounts-list-wrapper">
          <AccountsList />
        </div>
        <ModalForm {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: getForm(state),
  modal: getModal(state),
  isEdit: getForm(state).id !== undefined,
  accountOptions: getAccountsAsOptions(state).filter(
    option => option.key !== getForm(state).id
  ),
  EditForm: AccountForm
});

export default connect(
  mapStateToProps,
  {
    loadAccounts,
    openAccountInModal,
    resetAccountForm,
    removeAccountRequest,
    removeAccount
  }
)(Accounts);
