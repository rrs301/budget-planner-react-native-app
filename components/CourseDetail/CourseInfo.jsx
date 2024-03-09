import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import {supabase} from './../../utils/SupabaseConfig'
import { useRouter } from 'expo-router';
export default function CourseInfo({categoryData}) {

    const [totalCost,setTotalCost]=useState();
    const [percTotal,setPercTotal]=useState(0);
    const router=useRouter();
    useEffect(()=>{
        categoryData&&calculateTotalPerc();
    },[categoryData])
    const calculateTotalPerc=()=>{
        let total=0;
        categoryData?.CategoryItems?.forEach(item=>{
            total=total+item.cost;
        });
        setTotalCost(total);
        let perc=(total/categoryData.assigned_budget)*100;
        if(perc>100)
        {
            perc=100;
        }
        setPercTotal(perc)
    }

    const onDeleteCategory=()=>{
        Alert.alert('Are you Sure','Do you really want to Delete?',[
            {
                text:'Cancel',
                style:'cancel'
            },
            {
                text:'Yes',
                style:'destructive',
                onPress:async()=>{
                    
                    const { error } = await supabase
                    .from('CategoryItems')
                    .delete()
                    .eq('category_id', categoryData.id);

                    await supabase
                    .from('Category')
                    .delete()
                    .eq('id',categoryData.id)
                    ToastAndroid.show('Category Deleted!',ToastAndroid.SHORT)
                    router.replace('/(tabs)');
                }
            }
        ])
    }

  return (
    <View>
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={[styles.textIcon,
                    {backgroundColor:categoryData.color
                    }]} >{categoryData.icon}</Text>
            </View>
            <View style={{flex:1,marginLeft:20}}>
                <Text style={styles.categoryName}>{categoryData?.name}</Text>
                <Text style={styles.categoryItemText}>{categoryData?.CategoryItems?.length} Item</Text>
            </View>
            <TouchableOpacity onPress={()=>onDeleteCategory()}>
            <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
    </View>
    {/* Progress Bar  */}
    <View style={styles.amountContainer}>
        <Text style={{fontFamily:'outfit-bold'}}>${totalCost}</Text>
        <Text style={{fontFamily:'outfit'}}>Total Budget:{categoryData.assigned_budget}</Text>
    </View>
    <View style={styles.progressBarMainContainer}>
        <View style={[styles.progressBarSubContainer,{width:percTotal+'%'}]}></View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textIcon:{
      fontSize:35,
    padding:20,
    borderRadius:15
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'baseline'
    },
    categoryName:{
        fontFamily:'outfit-bold',
        fontSize:24,

    },
    categoryItemText:{
        fontFamily:'outfit',
        fontSize:16
    },
    amountContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:15
    },
    progressBarMainContainer:{
        width:'100%',
        height:15,
        backgroundColor:Colors.GRAY,
        borderRadius:99,
        marginTop:7
    },
    progressBarSubContainer:{
        width:'40%',
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        height:15
    }
  })