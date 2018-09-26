import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import LocationTile from './LocationTile'

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfLocations: 1,
    };
    this.renderLocationSquares = this.renderLocationSquares.bind(this)
    this.addLocation = this.addLocation.bind(this)
  }

  renderLocationSquares () {
    return (
      <LocationTile
      />
    )
  }

  addLocation () {
    const {numberOfLocations} = this.state
    this.setState({ numberOfLocations: numberOfLocations + 1 })
  }

  render() {
    return (
      <div>
        <button onClick={this.addLocation}>"Add Location"</button>
          <div>
            {this.renderLocationSquares()}
          </div>
      </div>
    );
  }
}

DashboardContainer.propTypes = {
  example: PropTypes.string.isRequired
};

export default DashboardContainer;
