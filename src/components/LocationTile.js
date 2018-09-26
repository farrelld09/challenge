import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Select from 'react-select';

class LocationTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      memberCheckins: [],
      memberAgreements: [],
      selectedLocation: null
    };
    this.handleChange = this.handleChange.bind(this)
    this.calculateMostPopularMembership = this.calculateMostPopularMembership.bind(this)
  }

  getLocations () {
    axios.get('https://code-challenge-api.club-os.com/api/locations')
    .then((response) => {
      const locations = response.data.data.map(location => {
        return {
          value: location.id,
          label: location.name
        }
      })
      this.setState({ locations })
  })
  }

  getMemberCheckins (locatinId) {
    axios.get(`https://code-challenge-api.club-os.com/api/locations/${locatinId}/member-checkins`)
    .then(response => this.setState({memberCheckins: response.data.data}))
  }

  getMemberAgreements (locatinId) {
    axios.get(`https://code-challenge-api.club-os.com/api/locations/${locatinId}/member-agreements`)
    .then(response => this.setState({memberAgreements: response.data.data}))
  }

  componentDidMount () {
    this.getLocations()
  }

  handleChange (selectedLocation) {
    this.setState({selectedLocation});
    const locationId = selectedLocation.value
    this.getMemberCheckins(locationId)
    this.getMemberAgreements(locationId)
    this.calculateMostPopularMembership()
  }

  calculateBusiestWeekday () {
    const days = {
      'Mon': 0, 'Tues': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0
    }
    this.state.memberCheckins.forEach((check) => {
      let date = new Date(check.date)
      date = date.split(' ').[0]
      if (days.date) {
        days.date +=1
      }
    }
    return days
  }

  calculateMostPopularMembership () {
    const types = {
      1 : {
        name: "BASIC",
        count: 0
      },
      2 : {
        name: "PLATINUM",
        count: 0
      },
      3 : {
        name: "VIP",
        count: 0
      }
    }

    this.state.memberAgreements.forEach((type) => {
        types[type.agreement].count += 1
    })

    let mostPopular

    if (types[1].count > types[2].count) {
      if (types[1].count > types[3].count) {
        mostPopular = types[1].name
      } else {
        mostPopular = types[3].name
      }
    } else {
      mostPopular = types[2].count > types[3].count ? types[2].name : types[3].name
    }
    this.setState({ mostPopular })
    console.log('state', this.state, 'types', types)
  }

  render () {
    const {locations, selectedLocation, mostPopular} = this.state
      return (
        <div className='location-square'>
          <Select
            value={selectedLocation}
            onChange={this.handleChange}
            options={locations}
            isClearable={true}
            autosize={false}
          />
          <span className='stat-line'>Busiest Weekday: </span><br/>
          <span className='stat-line'>Most Popular Agreement: {mostPopular} </span><br/>
          <span className='stat-line'>Most Popular Agreement on Busiest Weekday: </span><br/>
        </div>
      );
  }
}

export default LocationTile
