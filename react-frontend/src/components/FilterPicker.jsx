import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FilterListIcon from 'material-ui-icons/FilterList';

class FilterPicker extends PureComponent {
  state = {
    status: 'all'
  };

  onChangeStatus = (event, index, value) => {
    this.setState({ status: value });
    this.props.onChange(value);
  };

  render() {
    const { status } = this.state;
    return (
      <div className="row">
        <FilterListIcon />
        <DropDownMenu onChange={this.onChangeStatus} value={status}>
          <MenuItem value={'all'} primaryText="all" />
          <MenuItem value={'prospective'} primaryText="prospective" />
          <MenuItem value={'current'} primaryText="current" />
          <MenuItem value={'non-active'} primaryText="non-active" />
        </DropDownMenu>
      </div>
    );
  }
}

FilterPicker.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default FilterPicker;
