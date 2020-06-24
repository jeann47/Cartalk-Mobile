import { ToastAndroid, Alert, Linking, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL as baseURL } from 'react-native-dotenv';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useMemo } from 'react';
import Contacts from 'react-native-contacts';
import socketIo from 'socket.io-client';
import Dialog, {
    DialogFooter,
    DialogButton,
    DialogContent,
} from 'react-native-popup-dialog';

import { getUsers } from '~/store/modules/map/actions';
import Footer from '~/components/Footer';
import {
    Settings,
    Btn,
    Call,
    EditableCall,
    CalloutContainer,
    CalloutName,
    CalloutInfo,
} from './styles';

export default function Map() {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    const [coordinate, setCoordinate] = useState();
    const [visible, setVisible] = useState(false);
    const [asking, setAsking] = useState(null);
    const [init, setInit] = useState(false);

    const loading = useSelector((state) => state.auth.loading);
    const user = useSelector((state) => state.user.profile);
    const nearUsers = useSelector((state) => state.map);
    const { range, emergencyPhone, route } = useSelector(
        (state) => state.settings
    );

    const socket = useMemo(
        () =>
            socketIo(baseURL, {
                query: { user_id: user.id },
                forceNew: true,
            }),
        [user]
    );

    const fineLocationReq = async () => {
        try {
            const allowed = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (allowed === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.watchPosition((info) => {
                    const { coords } = info;

                    setCoordinate({
                        ...coords,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    });
                });
            } else {
                Alert.alert(
                    'Não foi possivel verificar sua localização',
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

    try {
        const check = async () => {
            const res = await PermissionsAndroid.check('ACCESS_FINE_LOCATION');
            if (res) {
                Geolocation.watchPosition((info) => {
                    const { coords } = info;

                    setCoordinate({
                        ...coords,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421,
                    });
                });
            } else {
                fineLocationReq();
            }
        };
        check();
    } catch (err) {
        fineLocationReq();
    }

    const contactsReq = async (usr) => {
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
                socket.emit('getContact', {
                    target: usr.id,
                    for: user.name,
                });
                ToastAndroid.showWithGravity(
                    `Contato solicitado!`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                );
            } else {
                Alert.alert(
                    'Não foi possivel visualizar seus contatos',
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
                `Ocorreu um erro, caso persista entre em contato!`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        }
    };

    function handleEmergency() {
        if (emergencyPhone.length < 3) {
            ToastAndroid.showWithGravity(
                `Insira um número de telefone válido nas configurações!`,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        } else Linking.openURL(`tel:${emergencyPhone}`);
    }
    function handleLook() {
        socket.emit('moved', { coordinate, route });
    }
    function handlePos() {
        fineLocationReq();
        socket.emit('moved', { coordinate, route });
        socket.emit('pos', { range });
    }

    socket.on('positions', ({ near, distance, routes }) => {
        if (near) {
            dispatch(getUsers(near, distance, routes));
        }
    });

    socket.on('failed', (error) => {
        ToastAndroid.showWithGravity(
            `Ocorreu um erro: ${error}, caso persista entre em contato!`,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
    });
    socket.on('allowContact', (name, id) => {
        setAsking({ name, id });
    });
    socket.on('contactAllowed', async (phone, user_id) => {
        let name = '';
        await nearUsers.near.forEach((usr) => {
            if (usr.id === user_id) name = usr.name;
        });
        if (name) {
            const newPerson = {
                phoneNumbers: [
                    {
                        label: 'Telefone',
                        number: phone,
                    },
                ],
                familyName: 'CarTalk',
                givenName: name,
            };
            Contacts.addContact(newPerson, (err) => {
                if (err) throw err;
                ToastAndroid.showWithGravity(
                    `o contato de ${name} foi salvo!`,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            });
        }
    });

    if (!init && coordinate) {
        fineLocationReq();
        handleLook();
        setInit(true);
    }

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                region={coordinate}
                provider={PROVIDER_GOOGLE}
                followsUserLocation
                zoomEnabled
                showsUserLocation
                showsPointsOfInterest
                showsMyLocationButton
            >
                <Dialog
                    visible={!!asking}
                    onTouchOutside={() => {
                        setAsking(null);
                    }}
                    width={`${75}%`}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Não"
                                onPress={() => setAsking(null)}
                            />
                            <DialogButton
                                text="Permitir"
                                onPress={() => {
                                    socket.emit('confirmNumber', {
                                        phone: user.phone,
                                        for: asking.id,
                                    });

                                    setAsking(null);
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <CalloutName>Solicitação de contato</CalloutName>
                        <CalloutInfo>
                            Deseja permitir que {asking ? asking.name : null}{' '}
                            visualize seu número de telefone?
                        </CalloutInfo>
                    </DialogContent>
                </Dialog>
                {nearUsers.near.map((usr) =>
                    nearUsers.distance[usr.id] ? (
                        <Marker
                            key={usr.id}
                            coordinate={nearUsers.distance[usr.id]}
                            title={usr.name}
                        >
                            <Icon name="person-pin-circle" size={30} />
                            <Dialog
                                visible={visible}
                                onTouchOutside={() => {
                                    setVisible(false);
                                }}
                                width={`${75}%`}
                                footer={
                                    <DialogFooter>
                                        <DialogButton
                                            text="Agora não"
                                            onPress={() => setVisible(false)}
                                        />
                                        <DialogButton
                                            text="Confirmar"
                                            onPress={() => {
                                                contactsReq(usr);
                                                setVisible(false);
                                            }}
                                        />
                                    </DialogFooter>
                                }
                            >
                                <DialogContent>
                                    <CalloutName>
                                        Solicitação de contato
                                    </CalloutName>
                                    <CalloutInfo>
                                        Deseja solicitar o número de contato de{' '}
                                        {usr.name}?
                                    </CalloutInfo>
                                </DialogContent>
                            </Dialog>
                            <Callout onPress={() => setVisible(!visible)}>
                                <CalloutContainer>
                                    <CalloutName>{usr.name}</CalloutName>
                                    <CalloutInfo>
                                        Indo para: {nearUsers.routes[usr.id]}
                                    </CalloutInfo>
                                </CalloutContainer>
                            </Callout>
                        </Marker>
                    ) : null
                )}
            </MapView>

            <Settings onPress={() => navigate('Settings')}>
                <Icon name="settings" size={30} color="#000" />
            </Settings>

            <Btn loading={loading} onPress={handlePos}>
                <Icon name="gps-fixed" size={30} color="#000" />
            </Btn>
            <EditableCall loading={loading} onPress={handleEmergency}>
                <Icon name="priority-high" size={30} color="#000" />
            </EditableCall>
            <Call loading={loading} onPress={() => Linking.openURL('tel:190')}>
                <Icon name="local-hospital" size={30} color="#000" />
            </Call>

            <Footer />
        </>
    );
}
