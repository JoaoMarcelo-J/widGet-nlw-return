
import React,{useState} from 'react';
import { View,TextInput,Image,TouchableOpacity,Text } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import {captureScreen} from 'react-native-view-shot'
import { styles } from './styles';
import { theme } from '../../theme';
import {feedbackTypes} from "../../utils/feedbackTypes"
import * as FileSystem from 'expo-file-system'

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

interface Props{
  feedbackType: FeedbackType
  onFeedbackCanceled: () =>void;
  onFeedbackSent: ()=> void;
}

export function Form({feedbackType,onFeedbackCanceled,onFeedbackSent}:Props) {
  const [isSendingFeedback,setIsSendingFeedback] = useState(false)
  const [screenshot,setScreenshot] = useState<string | null>(null)
  const [comment,setComment] = useState('')

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleScreenshot(){
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then( uri => setScreenshot(uri))
    .catch(error => console.log(error))
  }

  function handleScreenshotRemove(){
    setScreenshot(null)
  }

  async function handleSendFeedback(){
    if(isSendingFeedback){
      return
    }
    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot,{encoding: 'base64'})

    try{
      await api.post('/feedbacks',{
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      })

      onFeedbackSent()
    }
    catch{
      setIsSendingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={onFeedbackCanceled}>
        <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary}/>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Image source={feedbackTypeInfo.image} style={styles.image}/>
        <Text style={styles.titleText}>
        {feedbackTypeInfo.title}
        </Text>
      </View>
      </View>

      <TextInput onChangeText={setComment} autoCorrect={false} multiline placeholderTextColor={theme.colors.text_secondary} placeholder='Algo n??o est?? funcionando bem? Queremos corrigir. Conte com detalhes o que est?? acontecendo...' style={styles.input}/>
      <View style={styles.footer}>
        <ScreenshotButton onTakeShot={handleScreenshot} screenshot={screenshot} onRemoveShot={handleScreenshotRemove}/>
        <Button onPress={handleSendFeedback} isLoading={isSendingFeedback}/>
      </View>
    </View>
  );
}