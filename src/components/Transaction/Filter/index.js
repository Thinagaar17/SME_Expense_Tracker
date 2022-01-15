import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'semantic-ui-react';
import Calendar from './Calendar';
import Filters from './Filters';
import AppliedFilters from './AppliedFilters';
import {
  DateFilterRangeT,
  getDateRangeFilterOptions,
  defaultDateFilterRange,
  getDateFilterRangeStart,
  getDateFilterRangeEnd
} from 'entities/Transaction/DateFilterRange';
import { DropdownOption } from 'components/types';
import './index.css';
import SpeechlyFilter from './SpeechlyFilter';

class Filter extends React.Component {
  options = getDateRangeFilterOptions();
  lastValue = defaultDateFilterRange;
  state = {
    type: ''
  };

  handleDateRange = (_, { value }) => {
    if (value === this.lastValue) return;
    if (value === DateFilterRangeT.custom) {
      this.props.toggleFilterCalendar();
    } else {
      this.props.changeFilterDate({
        dateStart: getDateFilterRangeStart(value),
        dateEnd: getDateFilterRangeEnd(value)
      });
      this.lastValue = value;
    }
  };

  callbackFunction = childData => {
    this.props.openTransactionInModal({
      ...(this.props.selectedAccount
        ? { accountId: this.props.selectedAccount }
        : {})
    });
  };

  callbackFunction2 = childData => {
    console.log('type: ' + childData);
    let value = 0;
    if (childData === 'Today') {
      value = 0;
    } else if (childData === 'Yesterday') {
      value = 1;
    } else if (childData === 'Seven') {
      value = 2;
    } else if (childData === 'Thirty') {
      value = 3;
    } else if (childData === 'Month') {
      value = 4;
    } else if (childData === 'Custom') {
      value = 5;
    } else {
      return null;
    }

    if (value === this.lastValue) return;
    if (value === DateFilterRangeT.custom) {
      this.props.toggleFilterCalendar();
    } else {
      this.props.changeFilterDate({
        dateStart: getDateFilterRangeStart(value),
        dateEnd: getDateFilterRangeEnd(value)
      });
      this.lastValue = value;
    }

    this.setState({ type: childData });
  };

  callbackFunction3 = childData => {
    this.props.toggleFilterModal();
  };

  render() {
    return (
      <React.Fragment>
        <div className="container-header">
          <SpeechlyFilter
            parentCallback={this.callbackFunction}
            parentCallback2={this.callbackFunction2}
            parentCallback3={this.callbackFunction3}
          />
          <Button.Group basic fluid>
            <Button
              icon="plus"
              labelPosition="left"
              content="New"
              onClick={() =>
                this.props.openTransactionInModal({
                  ...(this.props.selectedAccount
                    ? { accountId: this.props.selectedAccount }
                    : {})
                })
              }
            />
            <Dropdown
              button
              className="icon"
              options={this.options}
              defaultValue={defaultDateFilterRange}
              onChange={this.handleDateRange}
              text={this.props.dateRangeLabel}
              labeled
              icon="calendar"
            />
            <Button icon="filter" onClick={this.props.toggleFilterModal} />
          </Button.Group>
          <Calendar {...this.props} />
          <Filters {...this.props} />
        </div>
        <AppliedFilters {...this.props} />
      </React.Fragment>
    );
  }
}

Filter.propTypes = {
  isMobile: PropTypes.bool,
  dateRangeLabel: PropTypes.string,
  isCalendarOpen: PropTypes.bool,
  isFilterModalOpen: PropTypes.bool,
  selectedAccount: PropTypes.string,
  appliedAccounts: PropTypes.arrayOf(PropTypes.string),
  accountOptions: PropTypes.arrayOf(DropdownOption),
  accountNameMap: PropTypes.object,
  appliedTags: PropTypes.arrayOf(PropTypes.string),
  tagsOptions: PropTypes.arrayOf(DropdownOption),
  changeFilterDate: PropTypes.func,
  toggleFilterCalendar: PropTypes.func,
  toggleFilterModal: PropTypes.func,
  applyFilters: PropTypes.func,
  openTransactionInModal: PropTypes.func
};

export default Filter;
