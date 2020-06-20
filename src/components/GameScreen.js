import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class ProductEditScreen extends Component {
  static navigationOptions = {
    title: 'Edit Product',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Add Product</Text>
        <Button
          title="Go to Edit Product... again"
          onPress={() => this.props.navigation.push('GameStart')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Product')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}