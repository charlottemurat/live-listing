import * as React from 'react';
import { useState } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen'
import CreateAccountScreen from './screens/CreateAccountScreen';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';

type ParamList = {
  Login: { userId: string };
  Tabs: { userId: string };
  CreateAccount: { userId: string };
  People: { userId: string };
  Buy: { userId: string };
  Sell: { userId: string };
};

export type LoginScreenProps = NativeStackScreenProps<ParamList, "Login">;
export type CreateAccountScreenProps = NativeStackScreenProps<ParamList, "CreateAccount">;

// const Tab = createBottomTabNavigator();

// function MyTabs({ route, navigation }: BottomTabScreenProps<ParamList>) {
//   const userId = route.params.userId;
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="People" component={PeopleScreen} initialParams={{ userId: userId }} />
//       <Tab.Screen name="Buy" component={BuyScreen} initialParams={{ userId: userId }} />
//       <Tab.Screen name="Sell" component={SellScreen} initialParams={{ userId: userId }} />
//     </Tab.Navigator>
//   );
// }

// Create the Stack Navigator
const Stack = createNativeStackNavigator<ParamList>();

function App() {
  const [userId, setUserId] = useState('');

  const [fontsLoaded, fontError] = useFonts({
    'Jersey25-Regular': require('./assets/fonts/Jersey25-Regular.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          initialParams={{ userId: userId }}
          options={{ headerShown: false }} 
        />
        {/* <Stack.Screen
          name="Tabs"
          component={MyTabs}
          initialParams={{ userId: userId }}
          options={{ headerShown: false }} // Hide the stack header if the drawer has its own
        /> */}
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
          initialParams={{ userId: userId }}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;