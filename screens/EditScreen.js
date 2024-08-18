import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from './HomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  Ionicons } from '@expo/vector-icons';
import { dataContext } from '../context/dataContext';


export default function EditScreen() {
    const route = useRoute();
    const item = route.params;
    const [note, setNote] = useState(item.note);
    const {noteArray, setNoteArray} = useContext(dataContext);

    const navigation = useNavigation();


    const handleSave = (note)=>{
        db.runSync("UPDATE notes SET note = ? WHERE id = ?",[ note, item.id ]);

        // get all notes and add to notearray
      const getNotes = db.prepareSync(
        "SELECT * FROM notes"
      );
      try{
        const result = getNotes.executeSync()
        const allNotes = result.getAllSync();
        setNoteArray(allNotes);
      }finally{
        getNotes.finalizeSync()
      }
    }
  return (
    <SafeAreaView style={{flex:1}}>
     <View className="flex-1 p-5">
        <TextInput
        onChangeText={setNote}
        value={note}
        onBlur={()=>handleSave(note)}
        placeholder='Start writing here...'
        />
    </View>
    </SafeAreaView>
    
  )
}