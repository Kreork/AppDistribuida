import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Switch, Text, View } from 'react-native';
import { styles } from './styles/tabla';

const TableScreen = () => {
  // Estado para almacenar los datos de la tabla
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de PocketBase
  const fetchData = async () => {
    try {
      const response = await fetch('https://distribuida.pockethost.io/api/collections/Personas/records');
      const result = await response.json();
      setData(result.items); // Asume que los datos vienen en el campo 'items'
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la información.');
      setLoading(false);
    }
  };

  // Ejecutar la función al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para manejar el cambio en el Switch
  const toggleSwitch = (index: number) => {
    const newData = [...data];
    newData[index].validation = !newData[index].validation;
    setData(newData);
    // Aquí puedes enviar los datos actualizados a PocketBase si lo deseas
  };

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

      <ScrollView horizontal>
        <View>
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
    </View>
  );
};

export default TableScreen;
