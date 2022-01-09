import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { DropdownOption } from '../types';
import Speechly2 from './Speechly2';

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

  callbackFunction4 = childData => {
    console.log('sana ' + childData);
    if (childData === 'Adam') {
      this.props.changeReportAccounts(['A1641729573400']);
    } else if (childData === 'Alex') {
      this.props.changeReportAccounts(['A1641729521974']);
    } else if (childData === 'John') {
      this.props.changeReportAccounts(['A1641729583593']);
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
