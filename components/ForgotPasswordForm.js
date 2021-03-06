import React, { Component } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from "react-native";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  render() {
    const { authenticating, handleSubmit, navigation } = this.props;
    const { email } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>
          Enter your email and we'll send you a link to reset your password.
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={value => this.setState({ email: value })}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.passwordButton}
            onPress={() => handleSubmit(email)}
          >
            {authenticating ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.text}>Send Link</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ForgotPasswordForm.propTypes = {
  authenticating: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    elevation: 10
  },
  infoText: {
    textAlign: "center",
    fontSize: 16
  },
  textInput: {
    height: 50,
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: "row"
  },
  passwordButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue,
    flex: 1,
    marginRight: 5,
    borderRadius: 10
  },
  cancelButton: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1,
    marginLeft: 5,
    borderRadius: 10
  },
  text: {
    color: "white",
    fontSize: 16
  }
});
