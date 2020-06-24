import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { signUpReq } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
    Container,
    Form,
    FormInput,
    SubmitBtn,
    SignInLink,
    SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
    const passRef = useRef();
    const dispatch = useDispatch();
    const phone = useSelector((state) => state.auth.phone);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {
        dispatch(signUpReq(phone, name, password));
    }

    return (
        <Background>
            <Container>
                <Image source="https://api.adorable.io/avatar/50/some.png" />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="words"
                        placeholder="Nome Completo"
                        value={name}
                        onChangeText={setName}
                        returnKeyType="next"
                        onSubmitEditing={() => passRef.current.focus()}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        ref={passRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitBtn onPress={handleSubmit}>Criar conta</SubmitBtn>
                </Form>

                <SignInLink>
                    <SignLinkText onPress={() => navigation.navigate('SignIn')}>
                        Já tenho Conta
                    </SignLinkText>
                </SignInLink>
            </Container>
        </Background>
    );
}

SignUp.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    navigation: PropTypes.object.isRequired,
};
