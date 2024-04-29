import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePeriod: 'Month', // Default time period
            data: {
                Month: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                    }]
                },
                Week: {
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [{
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                    }]
                },
                Day: {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                    datasets: [{
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
                    }]
                }
            }
        };
    }

    handleTimePeriodChange = (period) => {
        this.setState({ timePeriod: period });
    }

    render() {
        const { timePeriod, data } = this.state;
        const chartData = data[timePeriod];

        // تأكد من أن البيانات متوفرة قبل محاولة رسم الرسم البياني
        if (!chartData) {
            return <Text>Loading chart data...</Text>;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.header}>Sales Data - {timePeriod}</Text>
                <LineChart
                    data={chartData}
                    width={360}
                    height={320}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    chartConfig={{
                        backgroundColor: '#6666ff',
                        backgroundGradientFrom: '#6666ff',
                        backgroundGradientTo: '#6666aa',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffff"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleTimePeriodChange('Month')}>
                        <Text style={styles.buttonText}>Month</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleTimePeriodChange('Week')}>
                        <Text style={styles.buttonText}>Week</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => this.handleTimePeriodChange('Day')}>
                        <Text style={styles.buttonText}>Day</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    header: {
        fontSize: 20,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    buttonStyle: {
        backgroundColor: '#6666ff',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5
    },
    buttonText: {
        color: 'white'
    }
});

export default Statistics;
