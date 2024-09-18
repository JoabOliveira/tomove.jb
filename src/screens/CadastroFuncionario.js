// src/components/CadastroFuncionario.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CadastroFuncionario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(null);

  const handleSubmit = () => {
    // Enviar dados para o backend
    axios.post('https://your-api-endpoint/api/funcionarios', {
      nome,
      email,
      cargo
    })
    .then(response => {
      setMensagem('Funcionário cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setCargo('');
      Alert.alert('Sucesso', 'Funcionário cadastrado com sucesso!');
    })
    .catch(error => {
      const erroMsg = error.response ? error.response.data.message : 'Erro desconhecido.';
      setMensagem('Erro ao cadastrar funcionário.');
      setErro(erroMsg);
      console.error('Error:', erroMsg);
      Alert.alert('Erro', erroMsg);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Funcionário</Text>
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
      <Button title="Cadastrar" onPress={handleSubmit} />
      {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}
      {erro ? <Text style={styles.error}>{erro}</Text> : null}
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
  message: {
    marginTop: 16,
    color: 'green',
  },
  error: {
    marginTop: 16,
    color: 'red',
  },
});

export default CadastroFuncionario;