import React, {FC, useEffect, useState} from 'react';
import {BleDevice} from '../../models/Ble/BleDevice';
import {Image, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
type QuestionPageItemProps = {
  height: number;
  width : number;
  question : {
      id : string;
      question : string;
      choices : string | null;
      type : QuestionType | any
  }
  callback: () => void;
};
enum QuestionType {
    Text = 'Text',
    MCQ = "MCQ"
}
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
              <View style={{flex:5}}>
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
                      flex:5,
                      paddingHorizontal : 20,
                      justifyContent : "flex-end"
                  }}>
                  <View style={{

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
                  <View style={{ flexDirection : "row", flexWrap:"wrap", alignContent:"flex-end"}}>
                      { (question.type == QuestionType.MCQ && choices.length > 0)  && choices.map((choice, index) => (
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
                      {question.type == QuestionType.Text &&
                      <View style={{
                          backgroundColor : "#232323",
                          borderRadius : 30,
                          flexDirection : "row",
                          alignItems : "center",
                          paddingHorizontal : 20,
                          marginTop : 10,
                          marginHorizontal :  10,
                          flex : 1
                      }}>
                          <TextInput
                              numberOfLines={4}
                              multiline={true}
                              style={{
                                  padding: 20,
                                  flex : 1,
                                  color : "#979797",
                                  ...styles.fontMedium
                              }}

                              placeholderTextColor="#979797"
                              textAlignVertical = "top"
                          />
                      </View>
                      }

                  </View>
              </View>
              <View style={{flex : 2, justifyContent : "center", marginHorizontal : 20}}>
                  <TouchableOpacity
                      style={{
                          width : "100%",
                          backgroundColor : "#F23847",
                          alignSelf : "center",
                          paddingVertical : 20,
                          borderRadius : 26,
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
  );
};

const styles = StyleSheet.create({
    fontLarge: {
        fontFamily : "Poppins-Regular",
        fontSize: 24,
    },
    fontMedium : {
        fontFamily : "Poppins-Regular",
        fontSize: 16,
    },
    fontSmall : {
        fontFamily : "Poppins-Regular",
        fontSize: 12,
    }
});
export default QuestionPageItem;
