import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'; 
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const db = SQLite.openDatabase('meuBancoDeDados.db');

const PerfilCliente = () => {
  const route = useRoute();
  const { id } = route.params;

  if (!id) {
    return <Text>Erro: ID não fornecido.</Text>;
  }

  const [cliente, setCliente] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, telefone TEXT);'
      );
    });

    axios.get(`https://192.168.1.4/api/clientes/${id}`) 
      .then(response => {
        setCliente(response.data);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setTelefone(response.data.telefone);
      })
      .catch(error => {
        setErro('Erro ao carregar dados do cliente.');
        console.error('Error:', error);
        Alert.alert('Erro', 'Erro ao carregar dados do cliente.');
      });
  }, [id]);

  const handleSubmit = () => {
    axios.put(`https://192.168.1.4/api/clientes/${id}`, { nome, email, telefone })
      .then(response => {
        setCliente(response.data);
        setModoEdicao(false);
        setMensagem('Perfil atualizado com sucesso!');
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      })
      .catch(error => {
        setMensagem('Erro ao atualizar perfil.');
        console.error('Error:', error);
        Alert.alert('Erro', 'Erro ao atualizar perfil.');
      });
  };

  if (erro) return <Text style={styles.error}>{erro}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Cliente</Text>
      {cliente ? (
        <View>
          {modoEdicao ? (
            <View>
              <View style={styles.formGroup}>
                <Text>Nome:</Text>
                <TextInput 
                  style={styles.input} 
                  value={nome} 
                  onChangeText={setNome} 
                  placeholder="Digite o nome"
                />
              </View>
              <View style={styles.formGroup}>
                <Text>Email:</Text>
                <TextInput 
                  style={styles.input} 
                  value={email} 
                  onChangeText={setEmail} 
                  placeholder="Digite o email"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.formGroup}>
                <Text>Telefone:</Text>
                <TextInput 
                  style={styles.input} 
                  value={telefone} 
                  onChangeText={setTelefone} 
                  placeholder="Digite o telefone"
                  keyboardType="phone-pad"
                />
              </View>
              <Button title="Salvar" onPress={handleSubmit} />
              <Button title="Cancelar" onPress={() => setModoEdicao(false)} />
            </View>
          ) : (
            <View>
              <Text><Text style={styles.bold}>Nome:</Text> {cliente.nome}</Text>
              <Text><Text style={styles.bold}>Email:</Text> {cliente.email}</Text>
              <Text><Text style={styles.bold}>Telefone:</Text> {cliente.telefone}</Text>
              <Button title="Editar" onPress={() => setModoEdicao(true)} />
            </View>
          )}
          {mensagem && <Text style={styles.message}>{mensagem}</Text>}
        </View>
      ) : (
        <Text>Cliente não encontrado.</Text>
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
  formGroup: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  message: {
    marginTop: 16,
    color: 'green',
  },
  error: {
    marginTop: 16,
    color: 'red',
  },
});

export default PerfilCliente;
