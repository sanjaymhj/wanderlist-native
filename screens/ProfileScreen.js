import React, { Component } from 'react';
import { ScrollView, Switch, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Map from '../components/Map';
import { authLogout } from '../actions/authActions';

export class ProfileScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      switchValue: true
    }
  }

  handleValueChange = (value) => {
    this.setState({switchValue: value});
    this.props.authLogout();
    this.props.navigation.navigate('Login')
  }

  render() {

    const listTripReports = this.props.userTripReports.results.map(tripReport => 
      <Text key={tripReport.id}>{tripReport.title}</Text>
    )
    
    return (
      <ScrollView>
        <View style={styles.container}>
          <Switch 
            style={styles.switch}
            value={this.state.switchValue}
            onValueChange={(value) => this.handleValueChange(value)}
          />
          <View style={styles.wrapper}>
            <View style={styles.flagContainer}>
            </View>
            <View style={styles.biography}>
              <Text style={styles.usernameText}>
                {this.props.user.username}
              </Text>
              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={() => this.props.navigation.navigate('EditProfile')}
              >
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <Text style={styles.biographyText}>
                {this.props.user.biography}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.map}>
            <Map {...this.props} />
          </View>
          <View style={styles.line}></View>
          <View>
            {listTripReports}
          </View>
        </View>
      </ScrollView>
    );
  }
}


const mapState = state => {
  return {
    user: state.user.user,
    userTripReports: state.tripReport.userTripReports
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogout,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(ProfileScreen);

ProfileScreen.propTypes = {
  authLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  userTripReports: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  switch: {
    alignSelf: 'flex-end'
  },
  wrapper: {
    flexDirection: 'row',
  },
  flagContainer: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 20,
  },
  biography: {
    flex: 1,
    justifyContent: 'space-around',
    textAlign: 'left',
    marginRight: 10,
  },
  usernameText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  editProfileButton: {
    width: 100,
    maxHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#808080",
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
  },
  biographyText: {
    fontSize: 16,
  },
  line: {
    height: 0,
    borderWidth: .3,
    width: '90%',
    marginTop: 20,
    marginBottom: 20
  },
  map: {
    height: 400,
    width: '95%',
    borderWidth: .5,
  }
})