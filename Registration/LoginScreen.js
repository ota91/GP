import React, { useState } from 'react';
import { SafeAreaView,View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

    return (
      
    <SafeAreaView style = {{flex:1,justifyContent:"center",backgroundColor:"#fff",padding:20}}>
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
        marginBottom:30
        }}>Login</Text>
{/* Email field */}
    <View style = {{
        flexDirection:"row",
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        paddingBottom:8,
        marginBottom:25}}>
      <MaterialCommunityIcons 
      name='email'
      size={20}
      color={"#ccc"}
      style={{marginRight:5,marginTop:4}}/>  
      <TextInput placeholder='Email ID' style = {{flex:1,paddingVertical:0}}
     ></TextInput>
    </View>
{/* Password field */}
    <View style = {{
        flexDirection:"row",
        borderBottomColor:"#ccc",
        borderBottomWidth:1,
        paddingBottom:8,
        marginBottom:25}}>
      <MaterialCommunityIcons 
      name='lock'
      size={20}
      color={"#ccc"}
      style={{marginRight:5,marginTop:4}}/>  
      <TextInput secureTextEntry={true} placeholder='Password' style = {{flex:1,paddingVertical:0}}
     />
      {/* Handeling forgot password */}
      <TouchableOpacity onPress={() =>{}}>
        <Text style={{
            color:"#6d63a1",
            fontWeight:"600",
            marginTop:5}}>Forgot Password?</Text>
      </TouchableOpacity>
{/* Login button */}
    </View>
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
      <Text style={{
        textAlign:"center",
        color:"#666",
        marginBottom:30
      }}>Or, login with </Text>
            <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:20}}>
                <FontAwesome name="google" size={24} color="#9994af" style={{marginHorizontal:20}} />
                <AntDesign name="facebook-square" size={24} color="#9994af" style={{marginHorizontal:20}} />
                <AntDesign name="twitter" size={24} color="#9994af" style={{marginHorizontal:20}} />
            </View>
            <View style={{flexDirection:'row',justifyContent:"center"}}>
            <Text>New to the app?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Text style={{color:"#493d8a"}}> Sign in</Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>
    
        )
    }
            

