import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import Filter from './Filter';
import Pager from './Pager';
import Footer from './Footer';
import { loadAccounts } from '../../actions/entities/accounts';
import { loadTags } from '../../actions/entities/tags';
import { loadFilterTransactions } from '../../actions/entities/transactions';
import { applyFilters } from '../../actions/ui/transaction/filter';
import {
  PushToTalkButton,
  PushToTalkButtonContainer
} from '@speechly/react-ui';
class Transactions extends React.Component {
  constructor(props) {
    super(props);

    this.props.applyFilters({
      accounts: props.match.params.accountId
        ? [props.match.params.accountId]
        : []
    });
  }

  componentDidMount() {
    this.props.loadAccounts();
    this.props.loadTags();
    this.props.loadFilterTransactions();
  }

  render() {
    return (
      <div className="container-full-page flat search-page">
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
            <li>To open new transaction model, say:</li>
            <p style={{ fontStyle: 'italic' }}>Example: New transaction</p>
            <li>To filter date, say: [Change date to 'date']</li>
            <p style={{ fontStyle: 'italic' }}>
              Example: Change date to yesterday
            </p>
            <li>To open filter transaction model, say:</li>
            <p style={{ fontStyle: 'italic' }}>Example: Filter transaction</p>
            <li>To add account, say: [Add account 'account name'] </li>
            <p style={{ fontStyle: 'italic' }}>Example: Add account Adam</p>
            <li>To apply changes, say: </li>
            <p style={{ fontStyle: 'italic' }}>
              Example: Apply
            </p>
            <li>To reset modal, say: </li>
            <p style={{ fontStyle: 'italic' }}>
              Example: Reset
            </p>
            <li>To close modal, say: </li>
            <p style={{ fontStyle: 'italic' }}>Example: Close modal </p>
          </ul>
        </div>
        <Filter selectedAccount={this.props.match.params.accountId} />
        <List />
        <Pager />
        <Footer />
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
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    loadAccounts,
    loadTags,
    loadFilterTransactions,
    applyFilters
  }
)(Transactions);
