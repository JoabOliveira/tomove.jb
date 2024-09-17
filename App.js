import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Agenda from './src/components/Agenda';
import CadastroCliente from './src/components/CadastroCliente';
import CadastroFuncionario from './src/components/CadastroFuncionario';
import DetalhesAtendimento from './src/components/DetalhesAtendimento';
import PerfilCliente from './src/components/PerfilCliente';
import PerfilFuncionario from './src/components/PerfilFuncionario';

const Stack = createStackNavigator();

function App() {
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
