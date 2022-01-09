import PropTypes from 'prop-types';
import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import { DropdownOption } from '../../types';
import DeleteStrategy from './DeleteStrategy';
import {
  PushToTalkButton,
  PushToTalkButtonContainer
} from '@speechly/react-ui';
import Speechly from './Speechly';

class ModalForm extends React.Component {
  state = { del: "" };
  reset = () => {
    if (this.props.modal.isDeleteRunning) return false;
    this.props.resetAccountForm();
  };

  callbackFunction = event => {
   
    this.props.modal.isDeleteRequest = true;
    this.setState({ del: "true" });
    
  };

  callbackFunction2 = event => {
   
    this.delete.onProceed();
    this.setState({ del: "done" });
    
  };

  callbackFunction3 = event => {
    this.props.removeAccountRequest();
    window.location.reload();
  };

 

  render() {
    return (
      <Modal
        closeIcon
        size="small"
        className="account-form"
        open={this.props.modal.isOpen}
        onClose={this.reset}
      >
        <Header
          icon="file text outline"
          content={this.props.isEdit ? 'Edit Account' : 'New Account'}
        />
        <Speechly
         parentCallback={this.callbackFunction}
         parentCallback3={this.callbackFunction3}
         parentCallback2={this.callbackFunction2}
         
         
        />
        <Modal.Content>
          {this.props.modal.isDeleteRequest ? (
            <DeleteStrategy ref={(ref) => this.delete = ref} {...this.props} />
          ) : (
            <this.props.EditForm />
          )}
        </Modal.Content>
        <Modal.Actions>{this.renderModalActions()}</Modal.Actions>
        <PushToTalkButtonContainer>
            <PushToTalkButton />
        </PushToTalkButtonContainer>
      </Modal>
    );
  }

  renderModalActions() {
    if (!this.props.isEdit) return;

    return this.props.modal.isDeleteRequest ? (
      <Button
        labelPosition="left"
        disabled={this.props.modal.isDeleteRunning}
        onClick={this.props.removeAccountRequest}
        content="Cancel"
        icon="cancel"
      />
    ) : (
      <Button
        negative
        labelPosition="right"
        onClick={this.props.removeAccountRequest}
        content="Delete"
        icon="trash"
      />
    );
  }
}

ModalForm.propTypes = {
  modal: PropTypes.shape({
    isOpen: PropTypes.bool,
    isDeleteRequest: PropTypes.bool,
    isDeleteRunning: PropTypes.bool,
    itemsToProcess: PropTypes.number,
    itemsProcessed: PropTypes.number
  }),
  isEdit: PropTypes.bool,
  resetAccountForm: PropTypes.func,
  removeAccountRequest: PropTypes.func,
  removeAccount: PropTypes.func,
  EditForm: PropTypes.func,
  accountOptions: PropTypes.arrayOf(DropdownOption).isRequired
};

export default ModalForm;
