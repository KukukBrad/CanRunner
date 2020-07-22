import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

const InputField = props => {
    let bool = false

    if(props.secure === 'true'){
        bool = true;
    }
    
    
    return (
        <TextInput
            style={styles.inputStyle}
            placeholder={props.title}
            secureTextEntry={bool}
            autoCapitalize={'none'}
        />
    );
};

const styles = StyleSheet.create({
    
    inputStyle: {
        backgroundColor: '#ffffff',
        height: 50,
        borderRadius: 10,
        margin: 10,
        paddingVertical: 10,
        padding: 10,
        borderColor: 'grey',
        borderWidth: 2,
        
    },
});

export default InputField;