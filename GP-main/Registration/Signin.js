import React, { useState } from 'react';
import { SafeAreaView,View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Signin() {
    const navigation = useNavigation();
    
    return (
    <SafeAreaView style = {{flex:1,justifyContent:"center", backgroundColor:"#fff",padding:20}}>
        {/* Background Image for the page */}
    <Image 
    // setting the height, width and the path for the image
    style ={{width:345,height:300}}
    source={require("./assets/login.png")}></Image>   
         {/* Title styling */}
    <Text style={{
        color:"#7e73b8",
        fontWeight:"bold",
        fontSize:25,
        marginBottom:20
        }}>Login</Text>
{/* User name field */}
    <View style = {{
        flexDirection:"row",
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        paddingBottom:8,
        marginBottom:20}}>
      <MaterialCommunityIcons 
      name='account'
      size={20}
      color={"#ccc"}
      style={{marginRight:5,marginTop:4}}/>  
      <TextInput placeholder='Username' style = {{flex:1,paddingVertical:0}}
     ></TextInput>
    </View>
    <View style = {{
        flexDirection:"row",
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        paddingBottom:8,
        marginBottom:20}}>
      <MaterialCommunityIcons 
      name='email'
      size={20}
      color={"#ccc"}
      style={{marginRight:5,marginTop:4}}/>  
      <TextInput placeholder='Email Address' style = {{flex:1,paddingVertical:0}}
     ></TextInput>
    </View>
{/* Password field */}
    <View style = {{
        flexDirection:"row",
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        paddingBottom:8,
        marginBottom:20}}>
      <MaterialCommunityIcons 
      name='lock'
      size={20}
      color={"#ccc"}
      style={{marginRight:5,marginTop:4}}/>  
      <TextInput secureTextEntry={true} placeholder='Password' style = {{flex:1,paddingVertical:0}}
     />
    </View>
    {/* Confirm Password */}
    <View style = {{
        flexDirection:"row",
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        paddingBottom:8,
        marginBottom:30}}>
      <MaterialCommunityIcons 
      name='lock'
      size={20}
      color={"#ccc"}
      style={{marginRight:5,marginTop:4}}/>  
      <TextInput secureTextEntry={true} placeholder='Confirm Password' style = {{flex:1,paddingVertical:0}}
     />
    </View>
     
{/* Login button */}
      <TouchableOpacity on onPress={() =>{}} style = {{
        backgroundColor:"#7e73b8",
        padding:20,
        marginBottom:30,
        borderRadius:55
      }}>
        <Text style = {{
            textAlign:"center",
            color:"#fff",
            fontSize:16,
            fontWeight:"400"
        }}>Login</Text>
      </TouchableOpacity>
      {/* log in with social media field */}
      
           
            <View style={{flexDirection:'row',justifyContent:"center"}}>
                <Text>Already have an account?
                     <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{color:"#493d8a"}}> log in</Text>
                        </TouchableOpacity>
                </Text>
            </View>
    </SafeAreaView>
    
        )
}