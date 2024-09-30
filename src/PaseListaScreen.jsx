import moment from 'moment'; // Utiliza moment.js para formatear fechas
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, Text, View } from 'react-native';
import { styles } from './styles/tabla';

const RegistrosScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de la tabla 'Registros' de PocketBase
  const fetchData = async () => {
    try {
      const response = await fetch('https://distribuida.pockethost.io/api/collections/Registros/records');
      const result = await response.json();

      // Ordenamos los datos por la fecha en orden descendente
      const sortedData = result.items.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));

      setData(sortedData);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la información.');
      setLoading(false);
    }
  };

  // Ejecutar la función al cargar el componente
  useEffect(() => {
    fetchData();

    // Polling cada 40 segundos (40000 ms)
    const intervalId = setInterval(() => {
      fetchData();
    }, 40000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  // Si está cargando, mostramos un indicador de carga
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#438686" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registros de Actividad</Text>

      {/* El ScrollView para la tabla */}
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.tableContainer}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Fecha</Text>
            <Text style={styles.headerText}>Hora</Text>
            <Text style={styles.headerText}>Dispositivo</Text>
            <Text style={styles.headerText}>Usuario</Text>
          </View>

          {/* Filas de la tabla */}
          {data.map((item, index) => {
            const fechaFormateada = moment(item.Fecha).format('YYYY-MM-DD'); // Formatear fecha
            const horaFormateada = moment(item.Fecha).format('HH:mm:ss'); // Formatear hora

            return (
              <View
                key={item.id}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                <Text style={styles.cellText}>{fechaFormateada}</Text>
                <Text style={styles.cellText}>{horaFormateada}</Text>
                <Text style={styles.cellText}>{item.Dispositivo}</Text>
                <Text style={styles.cellText}>{item.Usuario}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Botón fijo en la parte inferior */}
      <View style={styles.buttonContainerFixed}>
        <Button
          title="Regresar"
          onPress={() => navigation.goBack()}
          color="#438686"
        />
      </View>
    </View>
  );
};

export default RegistrosScreen;
