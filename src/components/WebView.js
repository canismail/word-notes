import React, { Component } from 'react';
import { WebView } from 'react-native';

const MyWeb = () => {

    return (
        <WebView
            source={{
                uri: 'https://github.com/facebook/react-native'
            }}
            style={{ marginTop: 20 }}
        />
    );

}
export default MyWeb;