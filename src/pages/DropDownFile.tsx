import React, {FC, useState} from "react";
import {SafeAreaView, ScrollView, View, Text} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DropDownPage: FC= ({ route, navigation }) => {
    function getItemsArray() {
        return  [{label: 'Apple', value: 'apple'},
            {label: 'Banana', value: 'banana'},
            {label: 'Cranberry', value: 'cranberr'},
            {label: 'Durian', value: 'durian'},
            {label: 'Eggplant', value: 'eggplant'},
        ]
    }
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState(getItemsArray());
        const [open2, setOpen2] = useState(false);
        const [value2, setValue2] = useState(null);
        const [items2, setItems2] = useState(getItemsArray());
        const [open3, setOpen3] = useState(false);
        const [value3, setValue3] = useState(null);
        const [items3, setItems3] = useState(getItemsArray());
        const [open4, setOpen4] = useState(false);
        const [value4, setValue4] = useState(null);
        const [items4, setItems4] = useState(getItemsArray());
        const [open5, setOpen5] = useState(false);
        const [value5, setValue5] = useState(null);
        const [items5, setItems5] = useState(getItemsArray());
        const [open6, setOpen6] = useState(false);
        const [value6, setValue6] = useState(null);
        const [items6, setItems6] = useState(getItemsArray());
        const [open7, setOpen7] = useState(false);
        const [value7, setValue7] = useState(null);
        const [items7, setItems7] = useState(getItemsArray());
        const [open8, setOpen8] = useState(false);
        const [value8, setValue8] = useState(null);
        const [items8, setItems8] = useState(getItemsArray());
        const [open9, setOpen9] = useState(false);
        const [value9, setValue9] = useState(null);
        const [items9, setItems9] = useState(getItemsArray());

        const Item = () => {
            return (
                <View style={{zIndex: open ? 1: 0 , flexDirection : "row", alignItems : "center", paddingVertical: 10, marginVertical : 10, backgroundColor : "blue"}}>
                    <Text>sample</Text>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
            )
        }

    return(
        <SafeAreaView style={{flex: 1}} >
            <ScrollView style={{flex: 1, flexGrow: 1}}
                        contentContainerStyle={{flexGrow: 1}}>
                {/*<Text style={{flex: 1, color: 'black'}}>Hi</Text>*/}
                <View
                    style={{backgroundColor : "black", padding : 20, position:"absolute"}}
                >
                    <View style={{zIndex: open ? 1: 0 , flexDirection : "row", alignItems : "center", paddingVertical: 10, marginVertical : 10, backgroundColor : "blue"}}>
                        <Text>sample</Text>
                        <DropDownPicker
                            listMode="SCROLLVIEW"
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                    </View>
                    <View style={{zIndex: open2 ? 1: 0 , flexDirection : "row", alignItems : "center", paddingVertical: 10, marginVertical : 10, backgroundColor : "blue"}}>
                        <Text>sample sas a sass a</Text>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems2}
                    /></View><View style={{zIndex: open3 ? 1: 0 }}>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        open={open3}
                        value={value3}
                        items={items3}
                        setOpen={setOpen3}
                        setValue={setValue3}
                        setItems={setItems3}
                    /></View>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default DropDownPage;
