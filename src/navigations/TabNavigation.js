import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ApiScreen from '../screens/ApiScreen';
import StaticScreen from '../screens/StaticScreen';
import BrideScreen from '../screens/BrideScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Api" component={ApiScreen} />
        <Tab.Screen name="Static" component={StaticScreen} />
        <Tab.Screen name="bridge" component={BrideScreen} />
      </Tab.Navigator>
    </>
  );
}
