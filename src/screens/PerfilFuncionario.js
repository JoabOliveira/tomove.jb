import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'; 
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const PerfilFuncionario = () => {
  const route = useRoute();
  const { id } = route.params; 

  if (!id) {
    return <Text>Erro: ID não fornecido.</Text>;
  }

  const db = SQLite.openDatabase('meuBancoDeDados.db');

  const [funcionario, setFuncionario] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Criar tabela se não existir
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS funcionarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, cargo TEXT);'
      );
    });

    // Obter dados do funcionário
    axios.get(`https://192.168.1.4/api/funcionarios/${id}`) 
      .then(response => {
        setFuncionario(response.data);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCargo(response.data.cargo);
      })
      .catch(error => {
        setErro('Erro ao carregar dados do funcionário.');
        console.error('Error:', error);
        Alert.alert('Erro', 'Erro ao carregar dados do funcionário.');
      });
  }, [id]);

  const handleSubmit = () => {
    axios.put(`https://192.168.1.4/api/funcionarios/${id}`, {
      nome,
      email,
      cargo
    })
    .then(response => {
      setFuncionario(response.data);
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
      <Text style={styles.title}>Perfil do Funcionário</Text>
      {funcionario ? (
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
                <Text>Cargo:</Text>
                <TextInput 
                  style={styles.input} 
                  value={cargo} 
                  onChangeText={setCargo} 
                  placeholder="Digite o cargo"
                />
              </View>
              <Button title="Salvar" onPress={handleSubmit} />
              <Button title="Cancelar" onPress={() => setModoEdicao(false)} />
            </View>
          ) : (
            <View>
              <Text><Text style={styles.bold}>Nome:</Text> {funcionario.nome}</Text>
              <Text><Text style={styles.bold}>Email:</Text> {funcionario.email}</Text>
              <Text><Text style={styles.bold}>Cargo:</Text> {funcionario.cargo}</Text>
              <Button title="Editar" onPress={() => setModoEdicao(true)} />
            </View>
          )}
          {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}
        </View>
      ) : (
        <Text>Funcionário não encontrado.</Text>
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

export default PerfilFuncionario;
