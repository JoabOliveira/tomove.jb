import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const CadastroCliente = () => {
  const [nome, setNome] = useState(''); 
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = () => {
    // Enviar dados para o backend
    axios.post('https://your-api-endpoint/api/clientes', {
      nome,
      email,
      telefone,
    })
    .then(response => {
      setMensagem('Cliente cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setTelefone('');
      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
    })
    .catch(error => {
      setMensagem('Erro ao cadastrar cliente.');
      console.error('Error:', error);
      Alert.alert('Erro', 'Erro ao cadastrar cliente.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Cliente</Text>
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
      <Button title="Cadastrar" onPress={handleSubmit} />
      {mensagem ? <Text style={styles.message}>{mensagem}</Text> : null}
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
    color: 'red',
  },
});

export default CadastroCliente;