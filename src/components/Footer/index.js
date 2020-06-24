import React from 'react';
import { Alert, PermissionsAndroid, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Container, Nav, Separator } from './styles';

export default function Footer() {
    const page = useRoute().name;
    const { navigate } = useNavigation();

    const contactsReq = async () => {
        try {
            const allowed = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
            ]);
            if (
                !Object.values(allowed).includes(
                    PermissionsAndroid.RESULTS.DENIED
                )
            ) {
                navigate('Nearby');
            } else {
                Alert.alert(
                    'Não foi possivel acessar seus contatos',
                    'autorize nas configurações',
                    [
                        {
                            text: 'Configurações',
                            onPress: () => navigate('Settings'),
                            style: 'cancel',
                        },
                        { text: 'OK' },
                    ]
                );
            }
        } catch (err) {
            ToastAndroid.showWithGravity(
                `Ocorreu um erro, tente novamente mais tarde!`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    };

    return (
        <Container>
            <Nav
                onPress={() => navigate('Map')}
                style={
                    page === 'Map'
                        ? { backgroundColor: 'rgba(0,0,0,0.2)' }
                        : null
                }
            >
                <Icon
                    name="map"
                    size={25}
                    color={page === 'Map' ? 'gray' : '#fff'}
                />
            </Nav>
            <Separator />
            <Nav
                onPress={() => {
                    contactsReq();
                }}
                style={
                    page === 'Nearby'
                        ? { backgroundColor: 'rgba(0,0,0,0.2)' }
                        : null
                }
            >
                <Icon
                    name="chat"
                    size={25}
                    color={page === 'Nearby' ? 'gray' : '#fff'}
                />
            </Nav>
            <Separator />
            <Nav
                onPress={() => navigate('Profile')}
                style={
                    page === 'Profile'
                        ? { backgroundColor: 'rgba(0,0,0,0.2)' }
                        : null
                }
            >
                <Icon
                    name="person"
                    size={25}
                    color={page === 'Profile' ? 'gray' : '#fff'}
                />
            </Nav>
        </Container>
    );
}
