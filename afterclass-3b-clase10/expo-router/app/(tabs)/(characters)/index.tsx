import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CharacterCard from '@/components/CharacterCard'

interface Character {
  id: number
  name: string
  image: string
  description: string
}

const CharacterScreen = () => {
  const [characters, setCharacters] = useState <Character[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://dragonball-api.com/api/characters")
        const data = await response.json();
        console.log(data.items);
        
        setCharacters(data.items)
      } catch (error) {
        console.error('Error fetching characters:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [])

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#ff0000" />
    )
  }
  return (
    <View>
      <FlatList 
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard 
            name={item.name}
            image={item.image}
            id={item.id}
            description={item.description}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default CharacterScreen

const styles = StyleSheet.create({})