import React, { Component } from 'react';
import {
  View,
  Platform
} from 'react-native';
import AddNewScreenHeader from '../../Components/AddEditTodoHeader'; //import the path of Header.js
import AddNewInputBar from '../../Components/AddEditTodoInput'; //import the path of AddNewInputBar.js
import DatePicker from '../../Components/DatePicker';
import styles from './styles';

import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions/actions';

const mapStateToProps = (state) => ({ state: state.todos.data });

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (listId, title, currentDate) => dispatch(addTodo(listId, title, currentDate))
  }
}

class AddNewTodoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }


  save() {
    let listId = this.state.listId;
    let todoInput = this.state.todoInput;
    let currentDate = this.state.currentDate;

    if (todoInput != '') {
      this.props.addTodo(listId, todoInput, currentDate);
      this.props.navigation.goBack();
    } else {
      alert("Please enter todo");
    }
  }

  dateChange(date) {
    let state = this.state;
    let currentDate = date;



    this.setState({ currentDate });
  }


  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>; //platform-specific for the status bar on top
    return (



      <LinearGradient
        colors={['#D1C2C2', '#fff']}
        style={styles.container}>
        {/*display status bar on top*/}
        {statusbar}

        {/*render the Header here to pass this string to Header class */}
        <AddNewScreenHeader
          title={
            this.state.lists.map((todoList) => {
              if (todoList.id == this.state.listId) {
                return 'New Todo for ' + todoList.title;
              }
            })}
          save={() => this.save()}
          cancel={() => this.props.navigation.goBack()}
        />
        <View style={styles.listContainer}>

          <AddNewInputBar
            textChange={todoInput => this.setState({ todoInput })}

          />

          <DatePicker
            currentDate={this.state.currentDate}
            dateChange={date => this.dateChange(date)}
          />

        </View>

      </LinearGradient>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTodoScreen)


