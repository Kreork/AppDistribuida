import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, Switch, Text, View } from 'react-native';
import { styles } from './styles/tabla';

const TableScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de PocketBase
  const fetchData = async () => {
    try {
      const response = await fetch('https://distribuida.pockethost.io/api/collections/Personas/records');
      const result = await response.json();
      setData(result.items);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la información.');
      setLoading(false);
    }
  };

  // Función para actualizar el estado en PocketBase
  const updateValidationStatus = async (id, newValidationStatus) => {
    try {
      const response = await fetch(`https://distribuida.pockethost.io/api/collections/Personas/records/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Validacion: newValidationStatus,
        }),
      });
      if (!response.ok) {
        throw new Error('No se pudo actualizar la información.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Función para manejar el cambio en el Switch
  const toggleSwitch = async (index) => {
    const newData = [...data];
    const newValidationStatus = !newData[index].Validacion;

    newData[index].Validacion = newValidationStatus;
    setData(newData);

    await updateValidationStatus(newData[index].id, newValidationStatus);
  };

  // Ejecutar la función al cargar el componente
  useEffect(() => {
    fetchData();
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
      <Text style={styles.title}>Información de Usuarios</Text>

      {/* El ScrollView para la tabla ocupa el espacio restante */}
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.tableContainer}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Tag (UID)</Text>
            <Text style={styles.headerText}>Validación</Text>
          </View>

          {/* Filas de la tabla */}
          {data.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
            >
              <Text style={styles.cellText}>{item.Nombre}</Text>
              <Text style={styles.cellText}>{item.tag}</Text>
              <View style={styles.switchCell}>
                <Switch
                  value={item.Validacion}
                  onValueChange={() => toggleSwitch(index)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Botón fijo en la parte inferior */}
      <View style={styles.buttonContainerFixed}>
        <Button
          title="Ver Pase de Lista"
          onPress={() => navigation.navigate('PaseListaScreen')} // Navegar a la nueva pantalla
          color="#438686"
        />
      </View>
    </View>
  );
};

export default TableScreen;
