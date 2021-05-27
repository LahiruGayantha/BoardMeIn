import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Button, Text, Alert} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Loader from '../../components/Loader';
import configdata from '../../config/config';

const Inquiry = () => {
  const [userId, setUserId] = useState('');
  const [reason, setReason] = useState('');
  const [value, setValue] = useState('');
  const [inquiryType, setInqueryType] = useState([
    {
      label: 'Regarding Accomadation Place Inquiries',
      value: 'Regarding Accomadation Place Inquiries',
    },
    {label: 'Regarding System Inquiries', value: 'Regarding System Inquiries'},
    {label: 'Other Inquiries', value: 'Other Inquiries'},
  ]);

  const submit = () => {
    if (value === '') {
      Alert.alert('Please select Inquiry type');
      return;
    }
    if (reason === '') {
      Alert.alert('You must describe your inquiry');
      return;
    }
    
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textdec}>Inquiry Type</Text>
      <RadioForm
        style={styles.radioButton}
        radio_props={inquiryType}
        initial={-1}
        buttonSize={10}
        onPress={value => setValue(inquiryType.value)}
      />

      <Text style={styles.textdec}>Reason</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Reason"
        multiline
        numberOfLines={4}
        onPress={reason => setReason(reason)}
      />
      <Button
        style={styles.buttondec}
        title="Submit"
        onPress={() => submit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: 'skyblue',
    margin: 0,
    marginTop: 20,
    marginLeft: 20,
  },
  container: {
    margin: 20,
    marginTop: 40,
  },
  radioButton: {
    margin: 20,
    marginTop: 20,
  },
  textdec: {
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  buttondec: {
    marginTop: 50,
  },
  validatetext: {
    color: 'red',
    marginLeft: 20,
  },
});

export default {component: Inquiry, name: 'Inquiry'};
