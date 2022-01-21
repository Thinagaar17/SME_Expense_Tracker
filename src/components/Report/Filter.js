import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { DropdownOption } from '../types';
import Speechly2 from './Speechly2';
import Accounts from '../../../src/util/storage/accounts';

class Filter extends React.Component {
  handleAccountsChange = (_, { value }) => {
    console.log('sini: ' + value);
    this.props.changeReportAccounts(value);
  };

  handleTagsChange = (_, { value }) => {
    this.props.changeReportExcludedTags(value);
  };

  callbackFunction3 = childData => {
    this.props.changeReportExcludedTags([childData]);
  };

  //fetch all accounts from the db
  async componentDidMount() {
    const account = await Accounts.loadAll();
    this.setState({ accounts: account });
  }

  callbackFunction4 = childData => {
    let ACC = this.state.accounts;
    const newArray = ACC.filter(element => element.name === childData);
    if (newArray === []) {
      return null;
    } else {
      let accountId = newArray[0].id;
      this.props.changeReportAccounts([accountId]);
    }
  };

  render() {
    return (
      <div className="container-footer">
        <Speechly2
          parentCallback3={this.callbackFunction3}
          parentCallback4={this.callbackFunction4}
        />
        <Dropdown
          multiple
          selection
          fluid
          placeholder="Specify accounts"
          value={this.props.accounts}
          options={this.props.accountOptions}
          onChange={this.handleAccountsChange}
        />
        <Dropdown
          multiple
          selection
          fluid
          search
          placeholder="Exclude tags"
          value={this.props.excludeTags}
          options={this.props.tagsOptions}
          onChange={this.handleTagsChange}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  accounts: PropTypes.array,
  accountOptions: PropTypes.array,
  changeReportAccounts: PropTypes.func,
  excludeTags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  changeReportExcludedTags: PropTypes.func
};

export default Filter;
