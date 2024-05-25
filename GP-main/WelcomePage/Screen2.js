import * as react from 'react';
import { View, Text } from 'react-native';

export default function Screen2({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')} style={{ fontSize: 26, fontWeight: 'bold' }}>
                Screen2
            </Text>
        </View>
    )
}