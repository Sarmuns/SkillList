/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface skillData {
  id : string;
  name : string;
}

export function Home(){
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<skillData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddNewSkill(){
    const data = {
      id : String(new Date().getTime()),
      name : newSkill
    }
    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string){
    Alert.alert(
      "Do you want to delete this skill?",
      "",
      [
        {
          text: "No",
        },
        { text: "Yes", onPress: () => setMySkills(oldState => oldState.filter(
          skill => skill.id !== id
        )) }
      ]
    );
    
  }


  useEffect(()=>{
    const currentHour = new Date().getHours();
    if (currentHour < 12){
      setGreetings('Good morning');
    }
    else if (currentHour >= 12 && currentHour < 18){
      setGreetings('Good afternoon');
    }
    else {
      setGreetings('Good evening');
    }
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Samuel Rocha
      </Text>

      <Text style={styles.greetings}>
        {greetings}
      </Text>



      <TextInput
      style = {styles.input}
      placeholder="New Skill"
      placeholderTextColor="#555"
      onChangeText={setNewSkill}
      value={newSkill}
      />

      <Button 
      title="Add"
      onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, {marginVertical: 30}]}>
        My skills
      </Text>

    <FlatList
      data={mySkills}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <SkillCard
         skill={item.name}
         onPress={() => handleRemoveSkill(item.id)}
         />
      )}
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#fff',
  },
});
