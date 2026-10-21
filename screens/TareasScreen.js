import { useState } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FormularioTarea from '../components/FormularioTarea';
import TareaItem from '../components/TareaItem';
import dbTareas from '../data/tareasIniciales.json';

export default function TareasScreen() {
  const [tareas, setTareas] = useState(dbTareas);
  const [modoSecreto, setModoSecreto] = useState(false);
  const [secretos, setSecretos] = useState([
    { id: 's1', texto: '🔑 Clave de la caja fuerte: 9943-Alfa' },
    { id: 's2', texto: '📝 Respuestas del examen final de la cursada' },
  ]);

  const procesarTextoInput = (texto) => {
    if (texto === '123456') {
      setModoSecreto((modoActual) => !modoActual);
      Alert.alert(
        modoSecreto ? '🔒 Bóveda Cerrada' : '🔓 Bóveda Desbloqueada',
        modoSecreto
          ? 'Regresando a tus tareas públicas...'
          : 'Acceso concedido. Ahora podés administrar tus secretos.',
      );
      return;
    }

    if (modoSecreto) {
      const nuevoSecreto = {
        id: Date.now().toString(),
        texto: `🕵️‍♂️ ${texto}`,
      };
      setSecretos((secretosActuales) => [...secretosActuales, nuevoSecreto]);
      return;
    }

    const nuevaTarea = {
      id: Date.now().toString(),
      texto,
      completada: false,
    };
    setTareas((tareasActuales) => [...tareasActuales, nuevaTarea]);
  };

  const alternarTarea = (id) => {
    setTareas((tareasActuales) =>
      tareasActuales.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea,
      ),
    );
  };

  const eliminarTarea = (id) => {
    setTareas((tareasActuales) =>
      tareasActuales.filter((tarea) => tarea.id !== id),
    );
  };

  const eliminarSecreto = (id) => {
    setSecretos((secretosActuales) =>
      secretosActuales.filter((secreto) => secreto.id !== id),
    );
  };

  const pendientes = tareas.filter((tarea) => !tarea.completada).length;
  const completadas = tareas.filter((tarea) => tarea.completada).length;

  return (
    <View style={[styles.container, modoSecreto && styles.containerSecreto]}>
      <Text style={[styles.titulo, modoSecreto && styles.tituloSecreto]}>
        {modoSecreto
          ? '🕵️‍♂️ PANEL CONFIDENCIAL ACTIVO'
          : '📝 Mi Lista de Tareas'}
      </Text>

      {!modoSecreto && (
        <View style={styles.contadorRow}>
          <Text style={styles.contadorTexto}>Pendientes: {pendientes}</Text>
          <Text style={styles.contadorTexto}>Completadas: {completadas}</Text>
        </View>
      )}

      <FormularioTarea
        onProcesarTexto={procesarTextoInput}
        modoSecreto={modoSecreto}
      />

      {modoSecreto ? (
        <ScrollView style={styles.lista}>
          <Text style={styles.subtituloSecreto}>
            Administrando datos ocultos ({secretos.length}):
          </Text>
          {secretos.length === 0 ? (
            <Text style={styles.vacioTextoSecreto}>
              No hay información clasificada guardada.
            </Text>
          ) : (
            secretos.map((secreto) => (
              <View key={secreto.id} style={styles.cardSecreta}>
                <Text style={styles.textoSecreto}>{secreto.texto}</Text>
                <Button
                  title="🗑️"
                  color="#e74c3c"
                  onPress={() => eliminarSecreto(secreto.id)}
                />
              </View>
            ))
          )}
        </ScrollView>
      ) : (
        <ScrollView style={styles.lista}>
          {tareas.length === 0 ? (
            <Text style={styles.vacioTexto}>
              ¡Lista limpia! No tenés tareas pendientes.
            </Text>
          ) : (
            tareas.map((tarea) => (
              <TareaItem
                key={tarea.id}
                tarea={tarea}
                onAlternar={alternarTarea}
                onEliminar={eliminarTarea}
                modoSecreto={modoSecreto}
              />
            ))
          )}
        </ScrollView>
      )}

      {!modoSecreto && tareas.length > 0 && (
        <Button
          title="Limpiar todas las tareas"
          color="#e74c3c"
          onPress={() => setTareas([])}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerSecreto: {
    backgroundColor: '#1a252f',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  tituloSecreto: {
    color: '#f1c40f',
  },
  subtituloSecreto: {
    color: '#bdc3c7',
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  contadorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e2e8f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  contadorTexto: {
    fontWeight: 'bold',
    color: '#475569',
  },
  lista: {
    flex: 1,
    marginBottom: 15,
  },
  vacioTexto: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
  vacioTextoSecreto: {
    textAlign: 'center',
    color: '#bdc3c7',
    marginTop: 20,
    fontStyle: 'italic',
  },
  cardSecreta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
    borderColor: '#f1c40f',
    borderWidth: 1,
  },
  textoSecreto: {
    color: '#f1c40f',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
});
