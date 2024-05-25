import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function Screen1({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Image source={require("./assets/savings.png")} /> */}
      <Text style={styles.title}>
        Welcome to
      </Text>
      <Text style={styles.subtitle}>
        Mudakher.
      </Text>
      <Text style={styles.description}>
        Your best financial partner
      </Text>
      <View style={{ width: "35%", margin: 30 }}>
        <Pressable style={styles.Button} onPress={() => console.log('good')}>
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    color: 'black',
  },
  subtitle: {
    fontSize: 25,
    padding: 2,
    color: '#6666ff',
  },
  description: {
    fontSize: 10,
    padding: 5,
    color: 'black',
  },
  Button: {
    backgroundColor: '#6666ff',
    borderRadius: 15,
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
