import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';


const RouteCard = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
      );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: "white",
        elevation: 5,
        padding: 20,
        borderRadius: 10,
      },
});


export default RouteCard;