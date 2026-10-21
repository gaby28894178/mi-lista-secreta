import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';

export default function FormularioTarea({ onProcesarTexto, modoSecreto }) {
  const [textoInput, setTextoInput] = useState('');

  const handlePresionar = () => {
    if (!textoInput.trim()) {
      Alert.alert('Error', 'No podés agregar una tarea vacía.');
      return;
    }

    onProcesarTexto(textoInput);
    setTextoInput('');
  };

  return (
    <View style={[styles.form, modoSecreto && styles.formSecreto]}>
      <TextInput
        style={styles.input}
        placeholder={
          modoSecreto ? 'Escribí en modo secreto...' : 'Ej: Comprar comida'
        }
        value={textoInput}
        onChangeText={setTextoInput}
        onSubmitEditing={handlePresionar}
        returnKeyType="done"
      />
      <Button
        title={modoSecreto ? 'Agregar Tarea Secreta' : 'Agregar Tarea'}
        onPress={handlePresionar}
        color={modoSecreto ? '#f1c40f' : '#2ecc71'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  formSecreto: {
    backgroundColor: '#34495e',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
