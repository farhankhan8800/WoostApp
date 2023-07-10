import React from "react";
import { View, Text, StyleSheet} from "react-native";

const ErroLabel = ({message}) => {
    return (
        <View style={styles.erroCon}>
            <Text style={styles.error}>{message}</Text>
        </View>
    )

} 
const styles = StyleSheet.create({

    erroCon: {
        marginTop:10,
    },
    error: {
        fontSize: 12,
        color: '#FF0D10',
        marginTop: 7,
    },

})

export default ErroLabel;
