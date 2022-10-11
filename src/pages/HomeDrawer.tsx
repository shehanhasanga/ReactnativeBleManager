import React, {FC, useEffect, useState} from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginPage from "./LoginPage";
import StartView from "./StartView";
import UserImportantThingsPage from "./UserImportantThingsPage";
const HomeDrawerPage: FC= ({ theme,navigation}) => {
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={StartView} />
            <Drawer.Screen name="Article" component={UserImportantThingsPage} />
        </Drawer.Navigator>
    );
}

export default HomeDrawerPage;
