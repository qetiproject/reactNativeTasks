import React, { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [number, setNumber] = useState([])
  const [error, setError] = useState('')

  const storeData = async (value) => {
    number.map((n) => {
      if(value === n){
        setError('ასეთი ციფრი უკვე არსებობს')
      } else {
        setNumber(number => [...number, value])
      }
    })
    
    await AsyncStorage.setItem('@input', JSON.stringify(number))
  }

  const fetchData =  (value) => {
    value > 100 ? setError('შეიყვანეთ 1-დან 100-მდე ციფრი') : setError(''); setNumber(value);
  }

  const deleteData = async () => {
    await AsyncStorage.removeItem( '@input')
    setNumber('')
  }

  useEffect( async () => {
    const value = await AsyncStorage.getItem('@input')
    if(number !==null) {
      setNumber( value)
    }
  }, [])

  
  return (
      <View style={
        {
          margin: 100
        }
      }>
        <Text>{JSON.stringify(number)}</Text>
        <Text>{error}</Text>
        <TextInput onChangeText={ (n)=> fetchData(n)}/>
        <Button 
          title="store data"
          onPress={() => storeData(number)}
        />
        <Button 
          color = "red"
          title="delete data"
          onPress={() => deleteData(number)}
        />
      </View>
  );
  
}