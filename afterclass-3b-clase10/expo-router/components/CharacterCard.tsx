import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  description: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, image, description, id }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Link href={{ pathname: '/character/[id]', params: { id: String(id) } }}>Detail</Link>
    </View>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "contain",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
});

export default CharacterCard;