import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Modal,ScrollView,KeyboardAvoidingView,Alert } from 'react-native';
import firebase from'firebase';
import db from '../Config';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId:'',
            password:'',
            confirmPassword:'',
            firstName:'',
            lastName:"",
            contact:'',
            address:'',
            isModalVisible:''
        }
    }

    UserLogin = (emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
          this.props.navigation.navigate('Questionnaire')
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }

      UserSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('Users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address,
              
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }

      showModal = ()=>{
        return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalVisible}
          >
          <View>
            <ScrollView style={{width:'100%'}}>
              <KeyboardAvoidingView>
              <Text
                
                >Registration</Text>
              <TextInput
                //style={styles.formTextInput}
                placeholder ={"First Name"}
                maxLength ={10}
                onChangeText={(text)=>{
                  this.setState({
                    firstName: text
                  })
                }}
              />
              <TextInput
               // style={styles.formTextInput}
                placeholder ={"Last Name"}
                maxLength ={10}
                onChangeText={(text)=>{
                  this.setState({
                    lastName: text
                  })
                }}
              />
              <TextInput
                //style={styles.formTextInput}
                placeholder ={"Contact"}
                maxLength ={10}
                keyboardType={'numeric'}
                onChangeText={(text)=>{
                  this.setState({
                    contact: text
                  })
                }}
              />
              <TextInput
               // style={styles.formTextInput}
                placeholder ={"Address"}
                multiline = {true}
                onChangeText={(text)=>{
                  this.setState({
                    address: text
                  })
                }}
              />
              <TextInput
               // style={styles.formTextInput}
                placeholder ={"Email"}
                keyboardType ={'email-address'}
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              /><TextInput
               // style={styles.formTextInput}
                placeholder ={"Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              /><TextInput
               // style={styles.formTextInput}
                placeholder ={"Confirm Password"}
                secureTextEntry = {true}
                onChangeText={(text)=>{
                  this.setState({
                    confirmPassword: text
                  })
                }}
              />
              <View>
                <TouchableOpacity
                 // style={styles.registerButton}
                  onPress={()=>
                    this.UserSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                  }
                >
                <Text>Register</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                 // style={styles.cancelButton}
                  onPress={()=>this.setState({"isModalVisible":false})}
                >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </Modal>
      )
      }
    render(){
        return(
            <View>
                <View>
                <Text>Welcome to Time Table App</Text>
                </View>

            <View>
                <TextInput
                 placeholder = "Enter Your Email Address"
                 keyboardType = {'email-address'}
                 onChangeText = {(text)=>{
                    this.setState({
                        emailId:text
                    })
                 }}
                 
                />

                <TextInput
                 placeholder = "Enter Your Password"
                 secureTextEntry = {true}
                 onChangeText = {(text)=>{
                    this.setState({
                        password:text
                    })
                 }}
                 
                />
            </View>
            {
            this.showModal()
          }
            <View>
                <TouchableOpacity
                 onPress = {()=>{
                      this.UserLogin(this.state.emailId,this.state.password)
                 }}
                >
                    <Text>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                 onPress = {()=>{
                    this.setState({ isModalVisible:true})
                 }}
                >
                    <Text>SIGN UP</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}