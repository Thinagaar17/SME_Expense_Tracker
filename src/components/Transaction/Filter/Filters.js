import React from 'react';
import Accounts from '../../../../src/util/storage/accounts';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Dropdown } from 'semantic-ui-react';
import { DropdownOption } from '../../types';
import {
  PushToTalkButton,
  PushToTalkButtonContainer
} from '@speechly/react-ui';
import SpeechlyFilter2 from './SpeechlyFilter2';

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: this.props.appliedAccounts,
      tags: this.props.appliedTags,
      newAcc: []
    };
  }

  async componentDidMount() {
    const account = await Accounts.loadAll();
    this.setState({ newAcc: account });
  }

  componentWillReceiveProps({ appliedAccounts, appliedTags }) {
    this.setState({
      accounts: appliedAccounts,
      tags: appliedTags
    });
  }

  handleAccountChange = (event, { value }) =>
    this.setState({ accounts: value });
  handleTagsChange = (event, { value }) => this.setState({ tags: value });

  handleResetClick = () => {
    this.setState({
      accounts: [],
      tags: []
    });
  };

  handleApplyClick = () => {
    this.props.applyFilters(this.state);
    this.props.toggleFilterModal();
  };

  callbackFunction4 = childData => {
    let ACC = this.state.newAcc;
    const newArray = ACC.filter(element => element.name === childData);
    console.log('newArray' + newArray);
    if (newArray.length === 0) {
      console.log('No acc');
      return null;
    } else {
      let accountId = newArray[0].id;
      let array = [];
      array.push(accountId.toString());
      // this.state.accounts = array;
      this.setState({ accounts: array });
      array = [];
    }
  };

  callbackFunction5 = childData => {
    console.log(childData);
    let array = [];
    array.push(childData);
    // this.state.tags = array;
    this.setState({ tags: array });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          open={this.props.isFilterModalOpen}
          onClose={this.props.toggleFilterModal}
          closeIcon
          size="tiny"
        >
          <SpeechlyFilter2
            parentCallback4={this.callbackFunction4}
            parentCallback5={this.callbackFunction5}
            parentCallback6={this.handleResetClick}
            parentCallback7={this.handleApplyClick}
            parentCallback8={this.props.toggleFilterModal}
          />
          <Modal.Header>Filter transactions</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Account</label>
                  <Dropdown
                    multiple
                    selection
                    search
                    closeOnChange
                    onChange={this.handleAccountChange}
                    options={this.props.accountOptions}
                    value={this.state.accounts}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Tags</label>
                  <Dropdown
                    multiple
                    selection
                    search
                    closeOnChange
                    onChange={this.handleTagsChange}
                    options={this.props.tagsOptions}
                    value={this.state.tags}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button content="Reset" onClick={this.handleResetClick} />
            <Button content="Apply" onClick={this.handleApplyClick} positive />
          </Modal.Actions>
          <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop:140
          }}
        >
          <PushToTalkButtonContainer>
            <PushToTalkButton />
          </PushToTalkButtonContainer>
        </div>
        </Modal>
      </React.Fragment>
    );
  }
}

Filters.propTypes = {
  isFilterModalOpen: PropTypes.bool,
  appliedAccounts: PropTypes.arrayOf(PropTypes.string),
  accountOptions: PropTypes.arrayOf(DropdownOption),
  appliedTags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  toggleFilterModal: PropTypes.func,
  applyFilters: PropTypes.func
};

export default Filters;
