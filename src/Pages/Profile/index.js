import React, { useRef, useState, useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileReq } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import PhoneInput from '~/components/PhoneInput';
import Footer from '~/components/Footer';

import {
    Container,
    Title,
    Form,
    FormInput,
    Separator,
    SubmitBtn,
    LogOutBtn,
} from './styles';

export default function Profile() {
    const confirmPassRef = useRef();
    const oldPassRef = useRef();
    const phoneRef = useRef();
    const passRef = useRef();

    const dispatch = useDispatch();

    const [phone, setPhone] = useState(
        useSelector((state) => state.user.profile.phone || null)
    );
    const [name, setName] = useState(
        useSelector((state) => state.user.profile.name || null)
    );

    const [confirmPassword, setConfirmPassword] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, []);

    async function handleSubmit() {
        if (phone.length < 13) {
            ToastAndroid.showWithGravity(
                `Ocorreu um erro, tente novamente mais tarde!`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
        } else {
            dispatch(
                updateProfileReq({
                    name,
                    phone: `+${phone}`,
                    oldPassword,
                    password,
                    confirmPassword,
                })
            );
        }
    }
    async function handleLogOut() {
        dispatch(signOut());
    }
    return (
        <Background>
            <Container>
                <Title>Perfil</Title>
                <Form initialData={{ name, phone }}>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="words"
                        placeholder="Nome Completo"
                        value={name}
                        onChangeText={setName}
                        returnKeyType="next"
                        onSubmitEditing={() => phoneRef.current.focus()}
                    />
                    <PhoneInput
                        value={phone}
                        placeholder="Telefone"
                        onChange={setPhone}
                    />
                    <Separator />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Senha antiga"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        ref={oldPassRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passRef.current.focus()}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Nova senha"
                        value={password}
                        onChangeText={setPassword}
                        ref={passRef}
                        returnKeyType="next"
                        onSubmitEditing={() => confirmPassRef.current.focus()}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirme a nova senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        ref={confirmPassRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />
                    <SubmitBtn onPress={handleSubmit}>Atualizar</SubmitBtn>
                    <LogOutBtn onPress={handleLogOut}>Sair</LogOutBtn>
                </Form>
            </Container>
            <Footer />
        </Background>
    );
}
