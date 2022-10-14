import React, {FC, useEffect, useState} from 'react';
import {BleDevice} from '../../models/Ble/BleDevice';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type QuestionPageItemProps = {
  height: number;
  width : number;
  question : {
      id : string;
      question : string;
      choices : string | null;
  }
  callback: () => void;
};

const QuestionPageItem: FC<QuestionPageItemProps> = props => {
  const {height, width, callback, question} = props;
  // const name: string = device.name ? device.name : 'UnKnown'
    const [choices, setChoises] = useState([]);
    useEffect(() => {
        let choiceArray : any = []
        if(question.choices != null || question.choices != ''){
             choiceArray = question.choices?.split(',')
            setChoises(choiceArray)
        }
    } , [])
  return (
      <View  style={{
          height : height,
          width : width,
      }}>

          <View style={{
              height : height,
              backgroundColor : "black",
              width : width,
              position : "absolute",
              display : "flex",
              flexDirection:"column",

          }}>
              <View style={{flex:6,}}>
                  <Image
                      style={{
                          height : "100%",
                          width : '100%',
                      }}
                      source={require("../../assets/images/questionshead.jpg")}
                  />
              </View>
              <View
                  style={{
                      flex:4,
                      paddingHorizontal : 20
                  }}>
                  <View style={{
                      flex : 1,
                      justifyContent : "flex-end"
                  }}>
                      <Text style={{
                          color: "rgba(255,255,255,0.5)",
                          fontFamily : "Poppins-Regular",
                          fontWeight : "600",
                          fontSize : 16,
                          marginLeft :  10,
                      }}>{question.question}</Text>
                  </View>
                  <View style={{flex : 3, flexDirection : "row", flexWrap:"wrap"}}>
                      {choices.length > 0 && choices.map((choice, index) => (
                          <View key={index} style={{
                              paddingHorizontal : 20,
                              paddingVertical : 10,
                              borderColor : "#4C4C4C",
                              borderWidth : 2,
                              borderRadius : 10,
                              marginLeft :  10,
                              marginTop : 10

                          }}>
                              <Text style={{
                                  fontSize : 14,
                                  fontFamily : "Poppins-Regular",
                                  color:"white"
                              }}>{choice} </Text>
                          </View>
                      ))}

                  </View>
                  <View style={{flex : 1}}>
                      <TouchableOpacity
                          style={{
                              width : "90%",
                              backgroundColor : "#F23847",
                              alignSelf : "center",
                              paddingVertical : 20,
                              borderRadius : 26
                          }}
                          onPress={callback}
                      >
                          <Text
                              style={{
                                  fontSize : 16,
                                  color:"white",
                                  fontWeight : "bold",
                                  textAlign : "center"
                              }}
                          >Next </Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
      </View>
  );
};
export default QuestionPageItem;
