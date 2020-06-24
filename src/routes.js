/* eslint-disable no-nested-ternary */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import PhoneVerify from '~/Pages/PhoneVerify';
import PhoneCheck from '~/Pages/PhoneVerify/verificationCode';
import SignUp from '~/Pages/SignUp';
import SignIn from '~/Pages/SignIn';

import Profile from '~/Pages/Profile';
import Nearby from '~/Pages/Nearby';
import Map from '~/Pages/Map';
import Settings from '~/Pages/Settings';

const Stack = createStackNavigator();
export default function Routes() {
    const { signed, phone, verified } = useSelector((state) => state.auth);

    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                screenOptions={{
                    animationEnabled: false,
                }}
            >
                {signed ? (
                    <>
                        <Stack.Screen name="Map" component={Map} />
                        <Stack.Screen name="Nearby" component={Nearby} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="Settings" component={Settings} />
                    </>
                ) : verified ? (
                    <>
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="Recovery" component={SignIn} />
                    </>
                ) : (
                    <>
                        {phone === '' && (
                            <Stack.Screen
                                name="PhoneVerify"
                                component={PhoneVerify}
                            />
                        )}
                        <Stack.Screen
                            name="PhoneCheck"
                            component={PhoneCheck}
                        />
                        <Stack.Screen name="Recovery" component={SignIn} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
