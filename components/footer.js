import {Text, StyleSheet} from 'react-native'

const Footer = () => {
    return(
        <Text style={styles.text}>
            © 2023 Sincopeças App
        </Text>
    )
}

export default Footer

const styles = StyleSheet.create ({
    text:{
        fontSize: 15,
        alignSelf: 'center',
        marginTop:30,
    }
})
