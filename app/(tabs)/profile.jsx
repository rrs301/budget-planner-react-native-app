import { View, Text, Button } from 'react-native'
import React from 'react'
import {client} from './../../utils/KindeConfig'
import {useRouter} from 'expo-router'
export default function Profile() {

  const router=useRouter();
  const logout=async()=>{
    const loggedOut = await client.logout();
    if (loggedOut) {
      router.replace('/login')
        // User was logged out
    }
  }
  return (
    <View style={{padding:50}}>
      <Button title='Logout' onPress={logout} />
    </View>
  )
}