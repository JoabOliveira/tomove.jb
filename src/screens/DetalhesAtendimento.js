import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'; 
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const DetalhesAtendimento = () => {
  const route = useRoute();
  const { id } = route.params;

  if (!id) {
    return <Text>Erro: ID não fornecido.</Text>;
  }

  const db = SQLite.openDatabase('meuBancoDeDados.db');

  const [atendimento, setAtendimento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Criar tabela se não existir
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS atendimentos (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT, pacienteNome TEXT, descricao TEXT);'
      );
    });

    // Obter dados do atendimento
    axios.get(`https://192.168.1.4/api/atendimentos/${id}`)
      .then(response => {
        setAtendimento(response.data);
        setLoading(false);
      })
      .catch(error => {
        setErro('Erro ao carregar detalhes do atendimento.');
        setLoading(false);
        console.error('Error:', error);
        Alert.alert('Erro', 'Erro ao carregar detalhes do atendimento.');
      });
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (erro) return <Text style={styles.error}>{erro}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Atendimento</Text>
      {atendimento ? (
        <View style={styles.details}>
          <Text><Text style={styles.bold}>Data:</Text> {atendimento.data}</Text>
          <Text><Text style={styles.bold}>Paciente:</Text> {atendimento.pacienteNome}</Text>
          <Text><Text style={styles.bold}>Descrição:</Text> {atendimento.descricao}</Text>
        </View>
      ) : (
        <Text>Atendimento não encontrado.</Text>
      )}
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
  details: {
    marginTop: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
});

export default DetalhesAtendimento;
