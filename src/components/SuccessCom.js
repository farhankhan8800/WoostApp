import React from "react";
import { View, Text, StyleSheet} from "react-native";

const SucessLbl = ({message}) => {
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
        color: '#1AA253',
        marginTop: 7,
    },

})

export default SucessLbl;
