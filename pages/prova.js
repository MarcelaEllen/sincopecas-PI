
//componente RESULTADO ta lá no final do arquivo

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Card, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import questoes from '../questoes.json';
import {Botao, BotaoIcon} from '../components/button';
import Header from '../components/Header';
import Footer from '../components/footer';
import moment from 'moment';

export const QuizScreen = () => {
  const [questions] = useState(questoes.questoes);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(2400); // 40 minutos em segundos
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  //GUARDAR A DATA
  useEffect(() => {
    const saveResults = async () => {
      try {
        // Obtenha a data atual no formato desejado
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');

        // Salvar os resultados no AsyncStorage com a data
        await AsyncStorage.setItem(
          '@quizResults',
          JSON.stringify({
            correctAnswers,
            totalQuestions: questions.length,
            date: currentDate,
          })
        );
      } catch (error) {
        console.error('Error saving results to AsyncStorage:', error);
      }
    };

    saveResults();
  }, [correctAnswers, questions.length]);

  //EIIIIIIII ta guardando o resultado da prova no local Storage, mas depois acho que tem que botar no banco
  useEffect(() => {
    const saveResults = async () => {
      try {
        // Salvar os resultados no AsyncStorage ou em outro local
        await AsyncStorage.setItem('@quizResults', JSON.stringify({ correctAnswers, totalQuestions: questions.length }));
      } catch (error) {
        console.error('Error saving results to AsyncStorage:', error);
      }
    };

    saveResults();
  }, [correctAnswers, questions.length]);

  //cronometro
  useEffect(() => {
    const loadTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('@quizTime');
        if (storedTime) {
          setTimeRemaining(parseInt(storedTime, 10));
        }
      } catch (error) {
        console.error('Error loading time from AsyncStorage:', error);
      }
    };

    loadTime();
  }, []);

  useEffect(() => {
    const saveTime = async () => {
      try {
        await AsyncStorage.setItem('@quizTime', timeRemaining.toString());
      } catch (error) {
        console.error('Error saving time to AsyncStorage:', error);
      }
    };

    saveTime();
  }, [timeRemaining]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);
  const handleTimeUp = () => {
    // Quando o tempo acabar, você pode adicionar lógica adicional aqui.
    // Navegar para a tela de resultados
    navigation.navigate('Resultado', { correctAnswers, totalQuestions: questions.length });
  };

  useEffect(() => {
    const unsubscribeBeforeRemove = navigation.addListener('beforeRemove', (e) => {
      if (!isFocused) {
        // Se a tela não estiver em foco, não faz nada
        return;
      }

      // Prevenir o fechamento da tela
      e.preventDefault();

      Alert.alert(
        'Sair do Quiz?',
        'Você perderá o progresso não salvo. Tem certeza?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sair',
            style: 'destructive',
            onPress: () => {
              // Limpar o AsyncStorage
              AsyncStorage.removeItem('@quizTime');
              // Permitir a saída
              navigation.dispatch(e.data.action);
            },
          },
        ]
      );
    });

    return () => {
      unsubscribeBeforeRemove();
    };
  }, [navigation, isFocused]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswer = (answer) => {
    if (answer.correct) {
      setCorrectAnswers(correctAnswers + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  const renderQuiz = () => {
    if (currentQuestion >= questions.length) {
      return (
        <View style={styles.container}>
          <Header />
          <View style={styles.quizContainer}>
            <Text style={styles.resultText}>
              <Text style={{ fontWeight: 'bold' }}>
                {`AVALIAÇÃO FINALIZADA \n\n${correctAnswers > 12 ? 'PARABÉNS!!' : ''}`}
              </Text>
              {'\n\nVocê acertou '}
              {correctAnswers} de {questions.length} perguntas.
              {'\n\nGostaria de ir para a tela de resultados?'}
            </Text>

            <Botao cor={'#28a745'} texto={'Sim'}
              onPress={() =>
                navigation.navigate('resultado')
              } />
            <Botao cor={'#dc3545'} texto={'Não, voltar ao menu'}
              onPress={() =>
                navigation.navigate('Home')
              } />
          </View>
          <Footer footerStyle={{ marginTop: '50%' }} />
        </View>
      );
    }

    const currentQues = questions[currentQuestion];

    return (
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.quizContainer}>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
          <Text style={styles.questionCount}>{`${currentQuestion + 1}/${questions.length}`}</Text>
          <Text style={styles.questionText}>{currentQues.question}</Text>
          {currentQues.answers.map((answer) => (
            <TouchableOpacity
              key={answer.index}  // Coloque a propriedade 'key' aqui
              onPress={() => handleAnswer(answer)}
              style={styles.answerButton}
            >
              <Text style={styles.textoBotao}>{`${answer.index}. ${answer.option}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Footer />
      </View>

    );
  };

  return <View style={styles.container}>{renderQuiz()}</View>;
};


//RESULTADO
export const ResultadoScreen = () => {

  const navigation = useNavigation();

  const [results, setResults] = useState({ correctAnswers: 0, totalQuestions: 0 });

  useEffect(() => {
    const loadResults = async () => {
      try {
        // Carregar os resultados do AsyncStorage
        const storedResults = await AsyncStorage.getItem('@quizResults');
        if (storedResults) {
          setResults(JSON.parse(storedResults));
        }
      } catch (error) {
        console.error('Error loading results from AsyncStorage:', error);
      }
    };

    loadResults();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.titulo}>RESULTADOS</Text>
      <View style={styles.card}>
        <Text style={styles.resultadoText}>Avaliação</Text>
        <Text style={styles.resultadoText}>{`Realizada em: ${moment(results.date).format('DD/MM/YYYY')}`}</Text>
        <Text style={styles.resultadoText}>{`\nVocê acertou ${results.correctAnswers} de ${results.totalQuestions} perguntas.`}</Text>
        
      </View>
      <BotaoIcon iconSource={require('../assets/casa.png')} cor={'#1d568b'} texto={'Voltar ao menu'} onPress={() => navigation.navigate('Home')} />
    <Footer footerStyle={{marginTop:'95%'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  quizContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    margin: 20,
    textAlign: 'justify',
  },
  answerButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1d568b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'flex-start',
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
    textAlign: 'justify',
  },
  textoBotao: {
    color: '#1d568b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: '30%',
    textAlign: 'center',
  },
  timerText: {
    position: 'relative',
    alignSelf: 'flex-start',
    top: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d568b',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderColor: '#1d568b',
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
    alignSelf:'center',
  },
  resultadoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Roboto',
}});


