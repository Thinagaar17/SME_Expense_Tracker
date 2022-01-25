import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import CollapsibleSection from '../../components/CollapsibleSection';
import NetWorth from './NetWorth';
import Accounts from './Accounts';
import TransactionForm from '../Transactions/Form';
import RecentTransactions from './RecentTransactions';
import { loadAccounts } from '../../actions/entities/accounts';
import { loadRecentTransactions } from '../../actions/entities/transactions';
import { loadTags } from '../../actions/entities/tags';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.loadTags();
    this.props.loadAccounts();
    this.props.loadRecentTransactions();
  }

  render() {
    return (
      <div className="container-full-page">
        <div
          style={{
            border: '1px solid blue',
            padding: '10px',
            marginBottom: '15px'
          }}
        >
          <p
            style={{
              marginTop: '0.4em',
              fontWeight: 'bold',
              textAlign: 'center',
              textDecoration: 'underline'
            }}
          >
            Voice Command Guideline
          </p>
          <ul>
            <li>
              To add income, say: [Add income for 'amount' Ringgit for 'date'
              with tag 'tag']
            </li>
            <p style={{ fontStyle: 'italic' }}>
              Example: Add income for 50 Ringgit for next Monday with tag Bonus
            </p>
            <li>
              To add expense, say: [Add expense for 'amount' Ringgit for 'date'
              with tag 'tag']
            </li>
            <p style={{ fontStyle: 'italic' }}>
              Example: Add expense for 50 Ringgit for next Monday with tag Bills
            </p>
            <li>
              To transfer money, say: [Transfer money from account 'account
              name' to 'account name' with 'amount' Ringgit for next 'date']
            </li>
            <p style={{ fontStyle: 'italic' }}>
              Example: Transfer money from account Alex to Ali with 50 Ringgit
              for next Tuesday
            </p>
            <li>To create transaction, say: </li>
            <p style={{ fontStyle: 'italic' }}>Example: Proceed</p>
            <li>To set date, say: [Change date to 'date'] </li>
            <p style={{ fontStyle: 'italic' }}>Example: Change date to next Monday </p>
            <li>To set amount, say: [Set amount 'amount' Ringgit] </li>
            <p style={{ fontStyle: 'italic' }}>Example: Set amount 50 Ringgit </p>
            <li>To set tag, say: [Add tag 'tag']   </li>
            <p style={{ fontStyle: 'italic' }}>Example: Add tag bonus </p>
            <li>To add note, say: [ Add note 'note'] </li>
            <p style={{ fontStyle: 'italic' }}>Example: Add note savings money</p>
            <li>To change tab, say: [Change transaction to 'tab name'] </li>
            <p style={{ fontStyle: 'italic' }}>Example: Change transaction to Income </p>
            <li>To delete transaction, say:</li>
            <p style={{ fontStyle: 'italic' }}>Example: Delete</p>
          </ul>
        </div>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16}>
              <CollapsibleSection
                name="net_worth"
                label="Net Worth"
                LabelComponent={NetWorth}
              >
                <Accounts />
              </CollapsibleSection>
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <CollapsibleSection name="add_tx" label="New Transaction">
                <TransactionForm />
              </CollapsibleSection>
              <CollapsibleSection name="recent_tx" label="Recent Transactions">
                <RecentTransactions />
              </CollapsibleSection>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  loadTags: PropTypes.func,
  loadAccounts: PropTypes.func,
  loadRecentTransactions: PropTypes.func
};

export default connect(
  undefined,
  {
    loadTags,
    loadAccounts,
    loadRecentTransactions
  }
)(Dashboard);
