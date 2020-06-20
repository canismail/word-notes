import React from 'react';

import {
    View, TextInput, StyleSheet
} from 'react-native';

const MyInputText = props => {
    return (
        <View style={{ padding: 10 }}>
            <TextInput

                style={[styles.InputText, props.style]}
                color={props.customColor}
                onChangeText={props.customChangeText}
                value={props.customValue}
                placeholder={["Type here to start!", props.customPlaceHolder]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    InputText: {
        alignItems: 'center',
        backgroundColor: '#f15555',
        padding: 10,
        borderRadius: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
    }
});

export default MyInputText;
