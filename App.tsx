import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

// Define a type for the medicine object
type Medicine = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
};

const App: React.FC = () => {
  const [medicineName, setMedicineName] = useState<string>('');
  const [dosage, setDosage] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const addMedicine = () => {
    if (!medicineName || !dosage || !frequency) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }
    const newMedicine: Medicine = {
      id: Math.random().toString(),
      name: medicineName,
      dosage,
      frequency,
    };
    setMedicines([...medicines, newMedicine]);
    setMedicineName('');
    setDosage('');
    setFrequency('');
  };

  const deleteMedicine = (id: string) => {
    setMedicines(medicines.filter((medicine) => medicine.id !== id));
  };

  const renderMedicine = ({ item }: { item: Medicine }) => (
    <View style={styles.medicineItem}>
      <Text>{item.name} - {item.dosage} - {item.frequency}</Text>
      <TouchableOpacity onPress={() => deleteMedicine(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medicine Tracker</Text>

      <TextInput
        placeholder="Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
        style={styles.input}
      />
      <TextInput
        placeholder="Dosage"
        value={dosage}
        onChangeText={setDosage}
        style={styles.input}
      />
      <TextInput
        placeholder="Frequency"
        value={frequency}
        onChangeText={setFrequency}
        style={styles.input}
      />

      <Button title="Add Medicine" onPress={addMedicine} />

      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicine}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  medicineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
  },
});

export default App;
