import React, {useState} from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native'

import { Button, ButtonContainer } from '../components/Button'
import { Alert } from '../components/Alert'

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  }
})

const Quiz = (props) => {
  const questions = props.navigation.getParam("questions", [])
  const [correctCount, setCorrectCount] = useState(0)
  const [totalCount] = useState(questions.length)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [answerCorrect, setAnswerCorrect] = useState(false)

  const handleAnswer = (correct) => () => {
    setAnswered(true)
    if (correct) {
      setCorrectCount(currentCorrectCount => currentCorrectCount + 1)
      setAnswerCorrect(true)
      return setTimeout(() => nextQuestion(), 750)
    }

    setAnswerCorrect(false)
    setTimeout(() => nextQuestion(), 750)
  }

  const nextQuestion = () => {
    if (activeQuestionIndex + 1 >= totalCount) {
      setActiveQuestionIndex(0)
      setAnswered(false)
      return;
    }

    setActiveQuestionIndex(currectActiveQuestionIndex =>  currectActiveQuestionIndex + 1)
    setAnswered(false)
  }

  const question = questions[activeQuestionIndex]

  return (
    <View style={[styles.container, { backgroundColor: props.navigation.getParam("color")}]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safearea}>
        <View>
          <Text style={styles.text}>{question.question}</Text>
          <ButtonContainer>
            {question.answers.map(answer => (
              <Button
                key={answer.id}
                text={answer.text}
                onPress={handleAnswer(answer.correct)}
              />
            ))}
          </ButtonContainer>
        </View>
        <Text style={styles.text}>
          {`${correctCount}/${totalCount}`}
        </Text>
        <Alert
          correct={answerCorrect}
          visible={answered}
        />
      </SafeAreaView>
    </View>
  )
}

export default Quiz
