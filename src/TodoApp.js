import React, { Component } from 'react';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import OverdueTab from './Screens/OverdueTab';
import DueTomorrowTab from './Screens/DueTomorrowTab';
import ListScreen from './Screens/ListScreen';
import DetailScreen from './Screens/DetailScreen';
import AddNewTodoScreen from './Screens/AddTodoScreen';
import EditScreen from './Screens/EditTodoScreen';
import EditListScreen from './Screens/EditListScreen';
import ChangeUsernameScreen from './Screens/ChangeUsernameScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import CustomDrawerContent from './Components/CustomDrawerContent';

import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { connect } from "react-redux";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => ({ state: state.todos.data });

function HomeTab() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#444444",
                inactiveTintColor: "#fff",
                labelStyle: {
                    fontSize: 16,
                    fontFamily: 'Gill Sans',
                    fontWeight: "bold"
                },
                style: {
                    borderRadius: 20,
                    backgroundColor: '#d1d3db',
                    height: (Platform.OS === 'ios') ? 75 : 50
                }
            }}>
            <Tab.Screen
                name="Today"
                component={HomeScreen} />
            <Tab.Screen
                name="Overdue"
                component={OverdueTab} />
            <Tab.Screen
                name="Tomorrow"
                component={DueTomorrowTab} />
        </Tab.Navigator>
    )
}

function Home() {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#FF9636',
                inactiveTintColor: '#444444',
                itemStyle: { marginVertical: '3%' },
                labelStyle: {
                    fontFamily: 'Gill Sans',
                    fontSize: 16
                }
            }}
            drawerStyle={{
                backgroundColor: '#d1d3db'
            }}
            drawerContent={(props) => <CustomDrawerContent
                username=""
                {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={HomeTab} />
            <Drawer.Screen
                name="List"
                options={{ drawerLabel: 'My Lists' }}
                component={ListScreen} />
            <Drawer.Screen
                name="ChangeUsername"
                options={{ drawerLabel: 'Change Username' }}
                component={ChangeUsernameScreen} />
            <Drawer.Screen
                name="ChangePassword"
                options={{ drawerLabel: 'Change Password' }}
                component={ChangePasswordScreen} />
        </Drawer.Navigator >
    );
}

class TodoApp extends React.Component {
    constructor(props) { // when we have a constructor, super() must be called to initialize "this"
        super(props);
    }
    //main method
    render() {


        return (

            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}>
                    <Stack.Screen
                        name={this.props.state.isLoggedIn ? "Home" : "Login"}
                        component={this.props.state.isLoggedIn ? Home : LoginScreen} />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen} />
                    <Stack.Screen
                        name="EditList"
                        component={EditListScreen} />
                    <Stack.Screen
                        name="Detail"
                        component={DetailScreen} />
                    <Stack.Screen
                        name="AddTodo"
                        component={AddNewTodoScreen} />
                    <Stack.Screen
                        name="Edit"
                        component={EditScreen} />
                </Stack.Navigator>
            </NavigationContainer>


        );
    }
}

export default connect(mapStateToProps)(TodoApp);