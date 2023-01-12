import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import { Feather } from '@expo/vector-icons'

export default function AuthMenu(props) {
    const {
        authPage,
        setAuthPage,
        detailsPage,
        setDetailsPage
    } = props;
    return (
        <View style={styles.container}>
            <View style={styles.containerBody}>
                <Text style={styles.headerText}>{authPage ? "Log in to TikTok" : "Sign up"}</Text>
                <Text style={styles.descriptionText}>Manage your account, check notifications, comment on vides, and more.</Text>
                <TouchableOpacity
                    style={styles.providerButton}
                    onPress={() => setDetailsPage(true)}
                >
                    <Feather style={styles.providerButtonIcon} name='user' size={24} color='black' />
                    <Text style={styles.providerButtonText}>Use Email</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerFooter}>
                <TouchableOpacity onPress={() => setAuthPage(prev => !prev)}>
                    {authPage ?
                        <Text>Don't have an account? <Text style={styles.bottomButtonText}>Sign up</Text></Text>
                        :
                        <Text>Already have an account? <Text style={styles.bottomButtonText}>Log in</Text></Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}