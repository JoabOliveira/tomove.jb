import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const Agenda = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const db = SQLite.openDatabase('meuBancoDeDados.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, patientName TEXT);'
      );
    });

    axios.get('https://192.168.1.4/api/appointments')
      .then(response => {
        setAppointments(response.data);
        
        db.transaction(tx => {
          response.data.forEach(appointment => {
            tx.executeSql(
              'INSERT INTO appointments (date, patientName) VALUES (?, ?);',
              [appointment.date, appointment.patientName],
              () => console.log('Appointment inserted successfully'),
              (tx, error) => console.error('Error inserting appointment:', error)
            );
          });
        });
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Move</Text>

      <Button
        title="Cadastrar Cliente"
        onPress={() => navigation.navigate('CadastroCliente')}
      />
      <Button
        title="Cadastrar Funcionário"
        onPress={() => navigation.navigate('CadastroFuncionario')}
      />

      <FlatList
        data={appointments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.patientName}>{item.patientName}</Text>

            <Button
              title="Detalhes do Atendimento"
              onPress={() => navigation.navigate('DetalhesAtendimento', { id: item.id })}
            />
            <Button
              title="Perfil do Cliente"
              onPress={() => navigation.navigate('PerfilCliente', { id: item.id })}
            />
            <Button
              title="Perfil do Funcionário"
              onPress={() => navigation.navigate('PerfilFuncionario', { id: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  patientName: {
    fontSize: 16,
  },
});

export default Agenda;
