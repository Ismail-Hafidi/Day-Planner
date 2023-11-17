import React, { useState, useRef } from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ImageBackground,
  Modal,
  Pressable,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import TodoItem from "../components/TodoItem";
import AddButton from "../components/AddButton";
import background from "../assets/background-1.jpg";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("morning");
  const [todos, setTodos] = useState({
    morning: [
      { text: "buy coffee", key: "1" },
      // ... altri TodoItem della mattina
    ],
    afternoon: [
      { text: "create an app", key: "2" },
      // ... altri TodoItem del pomeriggio
    ],
    evening: [
      { text: "play on the switch", key: "3" },
      // ... altri TodoItem della sera
    ],
  });
  const changeHandler = (val) => {
    setText(val);
  };

  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const modalRef = useRef(null);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return {
        morning: prevTodos.morning.filter((todo) => todo.key !== key),
        afternoon: prevTodos.afternoon.filter((todo) => todo.key !== key),
        evening: prevTodos.evening.filter((todo) => todo.key !== key),
      };
    });
  };

  const onAddTodo = ({ text, time, selectedTimeOfDay }) => {
    setTodos((prevTodos) => {
      return {
        ...prevTodos,
        [selectedTimeOfDay]: [
          { text, time, key: Math.random().toString() },
          ...prevTodos[selectedTimeOfDay],
        ].filter((todo) => !!todo),
      };
    });
    setAddTodoModalVisible(false);
  };

  const openModal = () => {
    setAddTodoModalVisible(true)
  }
  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setDatePickerVisibility(Platform.OS === 'ios');
    setTime(currentDate);
  };
  
  const data = [
    { text: "Mattina", data: todos.morning },
    { text: "Pomeriggio", data: todos.afternoon },
    { text: "Sera", data: todos.evening },
  ];

  return ( 
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          
          <ImageBackground
            style={{
              flex: 1,
              resizeMode: "cover",
            }}
            source={background}
          >
              <Header />
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <>
                  <Text style={styles.listHeader}>{item.text}</Text>
                  <FlatList
                    data={item.data}
                    renderItem={({ item }) => (
                      <TodoItem
                        item={item}
                        pressHandler={() => pressHandler(item.key)}
                      />
                    )}
                    keyExtractor={(item) => item.key}
                  />
                </>
              )}
            />
              <AddButton
                setAddTodoModalVisible={() => setAddTodoModalVisible(true)}
                onAddTodo={onAddTodo}
                modalRef={modalRef}
                openModal={openModal}
              />
            <Modal
              transparent={true}
              visible={addTodoModalVisible}
              animationType="slide"
              onRequestClose={() => setAddTodoModalVisible(false)}
              ref={modalRef}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.title}>Scrivi le cose che devi fare: </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="New Todo..."
                    onChangeText={changeHandler}
                  />
                  <Text style={styles.title}>Seleziona L'ora:</Text>
                  <TouchableOpacity onPress={toggleDatePicker} style={styles.dateContainer}>
                <Text style={styles.dateText}>Pick Date</Text>
              </TouchableOpacity>
              {isDatePickerVisible && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onChange={onChange}
                />
                  )}
                  <View style={styles.titleView}>
                  <Text style={styles.title}>Seleziona il momento della giornata:</Text>
               <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                    <Picker
                      selectedValue={selectedTimeOfDay}
                      onValueChange={(itemValue) => setSelectedTimeOfDay(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label='Morning' value={"morning"} />
                      <Picker.Item label='Afternoon' value={"afternoon"} />
                      <Picker.Item label='Evening' value={"evening"} />
                    </Picker>
                    </View>
                    </View>
                  <Button
                    onPress={() => {
                      onAddTodo({
                        text: text, 
                        time: time, 
                        selectedTimeOfDay: selectedTimeOfDay, 
                      });
                    }}
                    title="Add Todo"
                    color="#EBAB70"
                  />
                  <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => setAddTodoModalVisible(false)}
                    title="Close"
                    color="#EBAB70"
                    />
                    </View>
                </View>
              </View>
              </Modal>
              
            </ImageBackground>
           
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    color: "#FF8800",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginBottom: 8,
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 5,
    textTransform:"uppercase",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10,
    fontSize:16
  },
  
  modalContent: {
    width: 300,
    backgroundColor: "coral",
    borderRadius: 20,
    padding: 20,
  },
  input: {
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "coral",
    borderRadius: 25,
    backgroundColor: "white"
  },
 
  buttonContainer: {
    marginTop:10
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
    backgroundColor:"white",
    borderWidth: 1,
    
  },
  dateText: {
    color: "white",
    fontSize: 24,
    marginBottom: 8,
    textAlign:"center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "white",
    width: "50%"
    
  },
  dateContainer: {
    justifyContent: "center",
    alignItems:"center"
  }
});
