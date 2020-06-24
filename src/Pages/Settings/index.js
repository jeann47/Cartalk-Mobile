import { ToastAndroid, PermissionsAndroid, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { GOOGLE_API_KEY } from 'react-native-dotenv';
import React, { useState } from 'react';
import axios from 'axios';
import Dialog, {
    DialogFooter,
    DialogButton,
    DialogContent,
} from 'react-native-popup-dialog';

import Background from '~/components/Background';
import { deleteProfile } from '~/store/modules/user/actions';
import {
    Text,
    Form,
    Header,
    Field,
    Use,
    Label,
    Section,
    Container,
    Main,
    AccountContainer,
    QuitBtn,
    HelpBtn,
    UpdateBtn,
    DialogField,
    PermissionBtn,
} from './styles';
import {
    setRange,
    setEmergencialPhone,
    setRoute,
} from '~/store/modules/Settings/actions';

export default function Settings() {
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    const { range, emergencyPhone, route } = useSelector(
        (state) => state.settings
    );

    const [deleting, setDeleting] = useState(false);
    const [password, setPassword] = useState('');
    const [adr, setAdr] = useState(route);

    async function lookRoute() {
        const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${adr}&key=${GOOGLE_API_KEY}`
        );
        const result = res.data.results;
        if (
            result[0].address_components[1].short_name !==
            result[0].address_components[1].long_name
        ) {
            setAdr(
                `${result[0].address_components[0].long_name} - ${result[0].address_components[1].short_name}`
            );
        } else {
            setAdr(
                `${result[0].address_components[0].long_name} - ${result[0].address_components[2].short_name}`
            );
        }
        dispatch(setRoute(adr));
    }

    function updateRange(newRange) {
        dispatch(setRange(newRange));
    }

    function updateEmergency(emergency) {
        dispatch(setEmergencialPhone(emergency));
    }

    const fineLocationReq = async () => {
        try {
            const allowed = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (allowed === PermissionsAndroid.RESULTS.GRANTED) {
                ToastAndroid.showWithGravity(
                    `Garantido!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            } else {
                ToastAndroid.showWithGravity(
                    `Negado!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
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

    const contactsReq = async () => {
        try {
            const allowed = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
            ]);
            if (
                Object.values(allowed).includes(
                    PermissionsAndroid.RESULTS.DENIED
                )
            ) {
                ToastAndroid.showWithGravity(
                    `Negado!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            } else {
                ToastAndroid.showWithGravity(
                    `Garantido!`,
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
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
            <Background>
                <Header>
                    <Use onPress={() => navigate('Map')}>
                        <Icon
                            name="keyboard-arrow-left"
                            size={25}
                            color="#fff"
                        />
                    </Use>
                    <Text>Configurações</Text>
                </Header>
                <Main>
                    <Section>Rota</Section>
                    <Label>Destino</Label>
                    <Form>
                        <Field
                            style={{ width: `${80}%` }}
                            placeholder="Endereço destino"
                            autoCapitalize="words"
                            value={adr}
                            onChangeText={setAdr}
                        />
                        <Use onPress={() => lookRoute()}>
                            <Icon
                                name="keyboard-arrow-right"
                                size={25}
                                color="#fff"
                            />
                        </Use>
                    </Form>
                    <Label>Raio de busca (km)</Label>
                    <Form>
                        <Field
                            keyboardType="numeric"
                            defaultValue={String(range / 1000) || 'Carregando'}
                            onChangeText={updateRange}
                            placeholder="Ex: 100"
                        />
                    </Form>
                    <Section>Permissões</Section>
                    <AccountContainer>
                        <PermissionBtn onPress={fineLocationReq}>
                            Localização
                        </PermissionBtn>
                        <PermissionBtn onPress={contactsReq}>
                            Contatos
                        </PermissionBtn>
                    </AccountContainer>

                    <Section>Segurança</Section>
                    <Label>Contato de Emergência</Label>
                    <Form>
                        <Field
                            keyboardType="phone-pad"
                            defaultValue={String(emergencyPhone)}
                            onChangeText={updateEmergency}
                            placeholder="Contato de Emergência"
                        />
                    </Form>
                    <Label>Conta</Label>
                    <AccountContainer>
                        <QuitBtn
                            onPress={() => {
                                setDeleting(true);
                                setPassword('');
                            }}
                        >
                            Deletar
                        </QuitBtn>

                        <UpdateBtn onPress={() => navigate('Profile')}>
                            Atualizar
                        </UpdateBtn>
                        <HelpBtn
                            onPress={() => {
                                Linking.openURL(
                                    'whatsapp://send?phone=+12054311082'
                                );
                            }}
                        >
                            Ajuda
                        </HelpBtn>
                    </AccountContainer>
                </Main>
            </Background>
            <Dialog
                visible={deleting}
                onTouchOutside={() => {
                    setDeleting(true);
                }}
                width={`${75}%`}
                footer={
                    <DialogFooter>
                        <DialogButton
                            text="Cancelar"
                            onPress={() => setDeleting(false)}
                        />
                        <DialogButton
                            text="Deletar"
                            onPress={() => {
                                dispatch(deleteProfile(password));
                                setDeleting(false);
                            }}
                        />
                    </DialogFooter>
                }
            >
                <DialogContent style={{ flexDirection: 'column' }}>
                    <Form>
                        <DialogField
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Form>
                </DialogContent>
            </Dialog>
        </Container>
    );
}
