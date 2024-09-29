import { Dimensions, StyleSheet } from 'react-native';

// Obtenemos el ancho de la pantalla del dispositivo
const { width } = Dimensions.get('window');

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
    width: width * 0.3, // Ajuste basado en el ancho de la pantalla
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
    width: width * 0.3, // Ajuste basado en el ancho de la pantalla
  },
});
