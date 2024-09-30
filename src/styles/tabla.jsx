import { Dimensions, StyleSheet } from 'react-native';

// Obtenemos el ancho de la pantalla del dispositivo
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  scrollViewContainer: {
    flex: 1, // Para que el ScrollView ocupe el espacio restante
  },
  tableContainer: {
    marginHorizontal: 10, // Añadimos margen para que no esté pegado a los bordes
    paddingBottom: 60, // Espacio adicional para que el botón no tape la tabla
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#438686',
    paddingVertical: 10,
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: width * 0.28, // Ajuste basado en el ancho de la pantalla para hacerlo más pequeño
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableRowEven: {
    backgroundColor: '#f0f0f0',
  },
  tableRowOdd: {
    backgroundColor: '#e0e0e0',
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
    width: width * 0.28, // Ajuste basado en el ancho de la pantalla para hacerlo más pequeño
  },
  switchCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Ajuste del botón para que esté fijo en la parte inferior
  buttonContainerFixed: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});
