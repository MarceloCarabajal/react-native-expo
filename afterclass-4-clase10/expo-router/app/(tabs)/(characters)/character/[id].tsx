import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

interface Character {
    name: string;
    image: string;
    description: string;
    planet: string;
}

const CharacterDetail = () => {
    const {id} = useLocalSearchParams()
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        const fetchCharacter = async () => {
          try {
            const response = await fetch(
                `https://dragonball-api.com/api/characters/${id}`)
            const data = await response.json();
            //console.log(data);
            setCharacter(data)
          } catch (error) {
            console.error('Error fetching characters:', error)
          } finally {
            setLoading(false)
          }
        }
        fetchCharacter()
      }, [id])

      if (loading) {
          return <ActivityIndicator size="large" color="#ff0000" />
    }

    if (!character) {
        return (
          <View style={styles.container}>
            <Text>No character found.</Text>
          </View>
        );
      }    

  return (
    <View style={styles.container}>
          <Text style={styles.name}>{character.name}</Text>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.description}>{character.description}</Text>
          <Text style={styles.planet}>Planet: {character.planet}</Text>
          <Text style={styles.back} onPress={() => router.back()}>
            Go Back
          </Text>
        </View>
  )
}

export default CharacterDetail

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
    },
    image: {
      width: 200,
      height: 200,
      marginVertical: 20,
      resizeMode: "contain",
    },
    description: {
      fontSize: 16,
      textAlign: "center",
    },
    planet: {
      fontSize: 16,
      marginTop: 10,
    },
    back: {
      marginTop: 20,
      color: "blue",
      textDecorationLine: "underline",
    },
  });