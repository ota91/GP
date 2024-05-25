import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

const colors = ['#6666ff', '#7f7fff', '#9999ff', '#b2b2ff'];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    chartWrapper: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    iconButton: {
        padding: 10,
        alignItems: 'center',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10,
    },
    iconText: {
        marginTop: 5,
        color: '#6e6e6e',
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },

});

const Spending = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const data = [
        { name: 'Food', amount: 1100, color: colors[0], legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Travel', amount: 2300, color: colors[1], legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Shopping', amount: 800, color: colors[2], legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Other', amount: 200, color: colors[3], legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];


    const totalCost = data.reduce((acc, curr) => acc + curr.amount, 0);
    const filteredData = activeCategory === 'All' ? data : data.filter(item => item.name === activeCategory);

    const chartConfig = {
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.chartWrapper}>
                    <PieChart
                        data={filteredData}
                        chartConfig={chartConfig}
                        width={screenWidth}
                        height={220}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        center={[10, 0]}
                        absolute={false}
                    />
                    <Text>{`Total Cost: ${totalCost}`}</Text>
                </View>
            </ScrollView>
            <View style={styles.iconRow}>
                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setActiveCategory('Food')}>
                        <Icon name="restaurant" size={30} color={activeCategory === 'Food' ? 'black' : '#6e6e6e'} />
                        <Text style={styles.iconText}>Restaurant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setActiveCategory('Travel')}>
                        <Icon name="local-gas-station" size={30} color={activeCategory === 'Travel' ? 'black' : '#6e6e6e'} />
                        <Text style={styles.iconText}>Gas Station</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setActiveCategory('Other')}>
                        <Icon name="more-horiz" size={30} color={activeCategory === 'Other' ? 'black' : '#6e6e6e'} />
                        <Text style={styles.iconText}>Other</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setActiveCategory('All')}>
                        <Icon name="donut-large" size={30} color={activeCategory === 'All' ? 'black' : '#6e6e6e'} />
                        <Text style={styles.iconText}>All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

export default Spending;
