import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Card from './Card'
import { useDispatch, useSelector } from "react-redux";
import { setCategorySelected } from "../features/Shop/shopSlice";
import { useTheme } from "../hooks/useTheme";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch()
  const { theme } = useTheme();

  const handleNavigate = () => {
    dispatch(setCategorySelected(category))
    navigation.navigate("ItemListCategory", { category })
  }

  return (
    <Card style={[styles.card, { backgroundColor: theme.buttonBackground}]} >
      <Pressable 
        onPress={handleNavigate}
        style={({ pressed }) => [
          styles.pressable,
          { backgroundColor: theme.buttonBackground },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.text, { color: theme.buttonText }]}>{category}</Text>
      </Pressable>
    </Card>
  );
};

export default CategoryItem

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  pressable: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});