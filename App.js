import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Agenda from './src/screens/Agenda';
import CadastroCliente from './src/screens/CadastroCliente';
import CadastroFuncionario from './src/screens/CadastroFuncionario';
import DetalhesAtendimento from './src/screens/DetalhesAtendimento';
import PerfilCliente from './src/screens/PerfilCliente';
import PerfilFuncionario from './src/screens/PerfilFuncionario';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Agenda" component={Agenda} />
        <Stack.Screen name="CadastroCliente" component={CadastroCliente} />
        <Stack.Screen name="CadastroFuncionario" component={CadastroFuncionario} />
        <Stack.Screen name="DetalhesAtendimento" component={DetalhesAtendimento} />
        <Stack.Screen name="PerfilCliente" component={PerfilCliente} />
        <Stack.Screen name="PerfilFuncionario" component={PerfilFuncionario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
