import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions} from 'react-native';

export default OnboardingItem = ({ item }) => {
        // Getting the width of the device
    const { width } = useWindowDimensions();

    return (
                // View containing the onboarding item, setting its width dynamically based on device width above
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />

            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};
// Styles for the OnboardingItem component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.65,
        justifyContent: 'center',
        marginRight:10,
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center',
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
});