import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, ...rest }) {
    return (
        <Container {...rest}>
            <View accessible>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text>{children}</Text>
                )}
            </View>
        </Container>
    );
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    loading: PropTypes.bool,
};

Button.defaultProps = {
    loading: false,
};
