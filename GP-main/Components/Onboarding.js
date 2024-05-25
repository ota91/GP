import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, Animated, TouchableOpacity, Text } from 'react-native';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import slides from '../slides';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const buttonOpacity = useRef(new Animated.Value(0)).current; // Use useRef here to persist the animated value
    const navigation = useNavigation(); // Using useNavigation to get navigation prop

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
        if (viewableItems[0].index === slides.length - 1) {
            // Fade in the continue button
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 1000, // Animate over 1 second
                useNativeDriver: true, // Enable native driver for better performance
            }).start();
        } else {
            buttonOpacity.setValue(0); // Immediately hide the button if we're not on the last slide
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
      {/* FlatList to render onboarding screens */}
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            {/* Paginator component to indicate current slide */}
            <Paginator data={slides} scrollX={scrollX} />

                         {/* Continue button */}

            <Animated.View style={{ width: '100%', opacity: buttonOpacity, position: 'absolute', bottom: 100, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signin')}
                    style={{
                        backgroundColor: "#7e73b8",
                        paddingHorizontal: 32,
                        paddingVertical: 10,
                        borderRadius: 55,
                    }}
                >
                    <Text style={{
                        color: "#fff",
                        fontSize: 16,
                        textAlign: 'center',
                        fontWeight: "600",
                    }}>Continue</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
