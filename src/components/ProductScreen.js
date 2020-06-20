import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class ProductScreen extends Component {
  static navigationOptions = {
    title: 'Product List',
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Product List</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('ProductDetails')}
        />
        <Button
          title="Go to Add Product"
          onPress={() => this.props.navigation.navigate('AddProduct')}
        />
        <Button
          title="Go to Edit Product"
          onPress={() => this.props.navigation.navigate('EditProduct')}
        />
      </View>
    );
  }
}