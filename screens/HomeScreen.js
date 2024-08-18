import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import * as SQLite from "expo-sqlite"
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { dataContext } from '../context/dataContext';

export const db = SQLite.openDatabaseSync('notelite.db'); // si la base de données n'existe pas elle sera crée automatiquement

export default function HomeScreen() {
    const navigation =  useNavigation()
    const [note, setNote] = useState("");
    const {noteArray, setNoteArray} = useContext(dataContext);

    // DATABASE
    useEffect(()=>{
      // create table notes
      db.execSync(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT NULL )"
      )
    },[])
  
    useEffect(()=>{
      const getNotes = db.prepareSync(
        "SELECT * FROM notes"
      );
    
        const result = getNotes.executeSync()
        const allNotes = result.getAllSync();
     
        setNoteArray(allNotes);
    },[])
    // addnote
    const addNote = ()=>{
      // insert row in notes
      const insertNotes = db.prepareSync(" INSERT INTO notes (note) VALUES ($title)");
      try{
        const result = insertNotes.executeSync({$title:note})
      }finally{
        insertNotes.finalizeSync()
        setNote("")
      }
  
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
    // delete data from db.note
    const handleDeleteNote = (id)=>{
      const deleteNote = db.prepareSync(
        "DELETE FROM notes WHERE id = $id"
      )
      try{
        deleteNote.executeSync({$id: id})
        setNoteArray((previousArray)=> previousArray.filter((note)=>note.id !== id))
      }finally{
        deleteNote.finalizeSync()
      }
    }
    // rendu du flatlist
    const renderItem = ({item})=>{
    return(
    <View>
        <View className="flex-row mb-2 gap-4 items-center justify-between">
            <View className=" flex-1 border border-gray-700 rounded-xl p-[4px] ">
              <Text>{item.note}</Text>
            </View>
          <TouchableOpacity onPress={()=>handleDeleteNote(item.id)} style={{backgroundColor:"red",padding:6, borderRadius:5}}>
              <FontAwesome name="trash" color="white" size = {24}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleEdit(item)} style={{backgroundColor:"green",padding:6, borderRadius:5}}>
            <Entypo name="edit" color={"white"} size={24}/>
          </TouchableOpacity>
      </View>
      <Divider color={"white"}/>
    </View>

    )
  }
  
  const handleEdit = (item)=>{
    navigation.navigate("Edit",item);
   
  }

  const Divider = ({color})=>{
    return (
        <View className="border my-3" style={{borderColor:color}}>
        </View>
    )
  }
    return (
      <SafeAreaView style={{paddingHorizontal:10}}>
        <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"dark-content"}
        />
        <View className="flex-col items-start">
          <Text className="text-gray-800 font-extrabold text-3xl">Add Note</Text>
          <View className="flex-row items-center justify-between gap-4 mt-4">
            <TextInput
              className="border border-gray-700 p-2 rounded-xl flex-1"
              onChangeText={setNote}
              value={note}
              placeholder='Start writing here...'
            />
            <TouchableOpacity onPress={addNote} style={{backgroundColor:"#61dafb",borderRadius:5, flex:0, padding:7}}>
                <Entypo name="add-to-list" color={"white"} size={24}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text className="text-gray-800 font-extrabold text-3xl mt-5">All Notes</Text>
        <View className ="flex-row mt-3">
        <FlatList
          data={noteArray}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
        </View>
      </SafeAreaView>
      
    );
}