import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'semantic-ui-react';
import Speechly from './Speechly';


class Navigation extends React.Component {
  handleKindChange = (_, { value }) => {
    // console.log('sana: ' + value);
    this.props.changeReportKind(value);
  };

  handleTimespanChange = (_, { value }) => {
    console.log('sana: ' + value);
    this.props.changeReportTimespan(value);
  };

  callbackFunction1 = childData => {    
    if (childData === 'Expense and income') {
      this.props.changeReportKind('expense_income');
    } else if (childData === 'Expense by Tag') {
      this.props.changeReportKind('expense_tags');
    } else if (childData === 'Net income') {
      this.props.changeReportKind('net_income');
    } else if (childData === 'Net worth') {
      this.props.changeReportKind('net_worth');
    } else {
      return null;
    }
  };

  callbackFunction2 = childData => {    
    console.log('sini: ' + childData);
    this.props.changeReportTimespan(childData);
    if (childData === 'YEARLY') {
      this.props.changeReportTimespan('yearly');
    } else if (childData === 'MONTHLY') {
      this.props.changeReportTimespan('monthly')
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="container-header">
        <Speechly
          parentCallback1={this.callbackFunction1}
          parentCallback2={this.callbackFunction2}
        />
        <Button.Group basic>
          <Dropdown
            button
            value={this.props.kind}
            options={this.props.kindOptions}
            onChange={this.handleKindChange}
          />
          <Button
            icon="chevron left"
            onClick={this.props.moveReportDateBackwards}
          />
          <Dropdown
            basic
            button
            icon={false}
            text={this.props.timespanLabel}
            value={this.props.timespan}
            options={this.props.timespanOptions}
            onChange={this.handleTimespanChange}
          />
          <Button
            icon="chevron right"
            onClick={this.props.moveReportDateForwards}
          />
        </Button.Group>
      </div>

    );
  }
}

Navigation.propTypes = {
  kind: PropTypes.string,
  kindOptions: PropTypes.array,
  timespan: PropTypes.string,
  timespanLabel: PropTypes.string,
  timespanOptions: PropTypes.array,
  changeReportKind: PropTypes.func,
  changeReportTimespan: PropTypes.func,
  moveReportDateBackwards: PropTypes.func,
  moveReportDateForwards: PropTypes.func
};

export default Navigation;
