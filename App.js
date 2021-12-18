import React, { useEffect, useState } from 'react';
import {Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native'

export default function App() {
  const [number, setNumber] = useState([])
  const [error, setError] = useState('')

  const TextInput = styled.TextInput`
    maxWidth: 90%,
    borderBottomColor: blue;
    borderBottomWidth: 3
  `

  const ButtonText = styled.Button`
    borderBottomColor: blue;
  `

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
        <TextInput  
          color="#000" 
          placeholder="შეიყვანეთ ციფრი 1-დან 100-მდე" 
          onChangeText={ (n)=> fetchData(n)}
        />
        <ButtonText 
          title="store data"
          onPress={() => storeData(number)}
        />
      </View>
  );
  
}