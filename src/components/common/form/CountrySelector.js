import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import countryList from 'react-select-country-list';

const lists = countryList().getData();

/**
 * A select form component with list of countries.
 *
 * @component
 * @example
 * return (
 *  <CountrySelector
 *   selected = the selected item from the list
 *   onChange = method invoked on selecting the item from the list.
 *  />
 * )
 *
 * @param  props
 */
const CountrySelector = props => {
  return <Select options={lists} value={props.selected} onChange={props.onChange} />;
};

CountrySelector.propTypes = {
  /**
   * The selected item from the list of items.
   */
  selected: PropTypes.object,
  /**
   * The handler method invoked when selecting the item from the list of items.
   */
  onChange: PropTypes.func,
};

export default CountrySelector;
