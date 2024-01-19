// App.js

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../Content/CustomDrawer'; 
import AnimTab2 from '../BottomTab/AnimTab2';

const Drawer = createDrawerNavigator();

function DrawerScreen() {
  return (
      <Drawer.Navigator screenOptions={{headerShown: false}}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
         {/* Define your  screens here */}
        <Drawer.Screen name="DrawerScreen" component={AnimTab2} />
      </Drawer.Navigator>
  );
}

export default DrawerScreen;
