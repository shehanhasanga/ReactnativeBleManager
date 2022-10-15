import React, {FC, useRef, useState} from "react";
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    Text,
    Animated,
    TouchableHighlightComponent, TouchableOpacity, TouchableOpacityComponent,
    View, StyleSheet
} from "react-native";
import QuestionPageItem from "../components/listItems/QuestionPageItem";

const OnboardingQuestionsScreen: FC= ({ theme,navigation}) => {
    const { width, height } = Dimensions.get('window');
    const MAX_WIDTH = Dimensions.get('screen').width;
    const animation = useRef(new Animated.Value(0));
    const questions =  [
        {
            "id": "723a714c-aaca-4c73-836b-3c92186b1589",
            "question": "What are your daily activities ?",
            "choices":  "Working,Travel,Play,Perform,Meditate,earning,Teaching,other",
            "type": "MCQ"
        },
        {
            "id": "d2f6a614-e719-4541-8181-0db68667fe8e",
            "question": "Do you have any hereditary conditions/diseases?",
            "choices": "High blood pressure,Diabetes,Hemophilia,Other",
            "type": "MCQ"
        },
        {
            "id": "d2f6a614-e719-4541-8181-0db6866dd7fe8e",
            "question": "How do you feel today ?",
            "choices": null,
            "type": "Text"
        }
        ]
    const [currentPage, setCurrentPage] = useState(0);
    const handleAnimation = () => {
        console.log()
        let newcurrentPage = currentPage + 1;

        if (newcurrentPage >= questions.length) {
            newcurrentPage = 0;
        }

        Animated.spring(animation.current, {
            toValue: -(MAX_WIDTH * newcurrentPage),
            useNativeDriver: true,
        }).start();

        setCurrentPage(newcurrentPage);
    };
    return(
        <>
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <ScrollView>
                        <Animated.View
                            style={{
                                flexDirection:"row",
                                transform: [{translateX: animation.current}]
                            }}
                           >
                            {questions.map((question) => (
                                <QuestionPageItem  question={question} key={question.id} callback={() => {handleAnimation()}} height={height} width={width}/>
                            ))}


                        </Animated.View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        display : "flex",
        flexDirection: 'row',
    },
});
export default OnboardingQuestionsScreen;
