import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Linking } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../utils/Colors'
import { EvilIcons } from '@expo/vector-icons';
import { supabase } from '../../utils/SupabaseConfig';
export default function CourseItemList({categoryData,setUpdateRecord}) {
    const [explandItem,setExpandItem]=useState();

    const onDeleteItem=async(id)=>{
        const {error}=await supabase.from('CategoryItems')
        .delete()
        .eq('id',id);

        ToastAndroid.show('Item Deleted!',ToastAndroid.SHORT);
        setUpdateRecord(true)
    }

    const openURL=(url)=>{
        if(url)
        {
            Linking.openURL(url);
        }
    }
  return (
    <View style={styles.conatiner}>
      <Text style={styles.heading}>Item List</Text>

      <View style={{marginTop:15}}>
        {categoryData?.CategoryItems?.length>0?categoryData?.CategoryItems?.map((item,index)=>(
            <>
            <TouchableOpacity key={index} style={styles.itemContainer}
            onPress={()=>setExpandItem(index)}>
                <Image source={{uri:item.image}} style={styles.image} />
                <View style={{flex:1,marginLeft:10}}> 
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.url} numberOfLines={2} >{item.url}</Text>
                </View>
                <Text style={styles.cost}>${item.cost}</Text>
            </TouchableOpacity>
            {explandItem==index&&
            <View style={styles.actionItemContainer}>
                <TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
                    <EvilIcons name="trash" size={34} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openURL(item.url)}>
                    <EvilIcons name="external-link" size={34} color="blue" />
                </TouchableOpacity>
            </View>
            }
           {categoryData?.CategoryItems.length-1!=index&&
            <View style={{borderWidth:0.5,marginTop:10,borderColor:Colors.GRAY}}></View>
           }
            </>
        )):
        <Text style={styles.noItemText}>No Item Found</Text>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner:{
        marginTop:20
    },
    heading:{
        fontFamily:'outfit-bold',
        fontSize:20
    },
    image:{
        width:90,
        height:90,
        borderRadius:15
    },
    itemContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10
       
    },
    name:{
        fontSize:20,
        fontFamily:'outfit-bold'
    },
    url:{
        fontFamily:'outfit',
        color:Colors.GRAY
    },
    cost:{
        fontSize:17,
        marginLeft:10,
        fontFamily:'outfit-bold'
    },
    noItemText:{
        fontFamily:'outfit-bold',
        fontSize:25,
        color:Colors.GRAY
    },
    actionItemContainer:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        justifyContent:'flex-end'
    }
})