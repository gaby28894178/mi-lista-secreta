import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TareaItem({
  tarea,
  onAlternar,
  onEliminar,
  modoSecreto,
}) {
  return (
    <View style={[styles.card, modoSecreto && styles.cardSecreta]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`${tarea.completada ? 'Marcar pendiente' : 'Completar'}: ${tarea.texto}`}
        onPress={() => onAlternar(tarea.id)}
        style={styles.textoContainer}
      >
        <Text
          style={[
            styles.texto,
            tarea.completada && styles.textoCompletado,
            modoSecreto && styles.textoSecreto,
          ]}
        >
          {tarea.completada ? '✅ ' : '⬜ '} {tarea.texto}
        </Text>
      </TouchableOpacity>
      <Button
        accessibilityLabel={`Eliminar tarea: ${tarea.texto}`}
        title="🗑️"
        color="red"
        onPress={() => onEliminar(tarea.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  cardSecreta: {
    backgroundColor: '#2c3e50',
    borderColor: '#f1c40f',
    borderWidth: 1,
  },
  textoContainer: {
    flex: 1,
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
  textoSecreto: {
    color: '#f1c40f',
    fontWeight: 'bold',
  },
  textoCompletado: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
