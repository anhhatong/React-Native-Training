import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  FlatList // list in react native
} from 'react-native';
import TodoItem from '../Components/TodoItem.js';
import Header from '../Components/Header.js'; //import the path of Header.js
import InputBar from '../Components/InputBar.js'; //import the path of InputBar.js
import SearchBar from '../Components/SearchBar.js';
import AddNewTodoBtn from '../Components/AddNewTodoBtn.js';

import LinearGradient from 'react-native-linear-gradient';
import DraggableFlatList from "react-native-draggable-flatlist";
import { withNavigationFocus } from 'react-navigation';


export default class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.route.params;
    //console.log(this.props.route.params);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props !== prevProps) {
      this.setState(this.props.route.params);
    }
  }

  backToHome() {
    let state = this.state;
    this.searchTodo('');
    console.log(state);
    this.props.navigation.navigate('Home', state);
  }

  toAddNewTodoScreen() {
    let state = this.state;
    this.searchTodo('');
    this.props.navigation.navigate('AddTodo', state);
  }

  toEditScreen(item) {
    let state = this.state;
    let todos = this.state.todos;
    let todoId = this.state.todoId;

    this.searchTodo('');
    this.setState({ todoId: item.id, todoInput: item.title, currentDate: item.date },
      function () {
        state = this.state;
        this.props.navigation.navigate('Edit', state);
      });
  }

  //method to change 'done' state of each todo item
  toggleDone(item) {
    if (!this.state.isReordering) {
      let todos = this.state.todos;

      //map() creates a new array then run the code block with every item in the array
      todos = todos.map((todo) => {
        if (todo.id == item.id) {
          todo.done = !todo.done;
        }
        return todo;
      })

      this.setState({ todos });
    }
  }

  //method to edit todos
  editTodo(item, todoEdit) {
    let todos = this.state.todos;

    //map() creates a new array then run the code block with every item in the array
    todos = todos.map((todo) => {
      if (todo.id == item.id) {
        todo.title = todoEdit;
      }
      return todo;
    })

    this.setState({ todos });
  }

  toggleIsSearching() {
    let isSearching = !this.state.isSearching;
    this.setState({ isSearching });
  }

  //method to search for todo items
  searchTodo(str) {
    let lists = this.state.lists;
    let listId = this.state.listId;
    let todos = this.state.todos; //array of matched items from the last search
    let todosUnmatched = this.state.todosUnmatched; //array of unmatched items from the last search
    todos = todos.concat(todosUnmatched);

    function swap(items, leftIndex, rightIndex) {
      var tempId = items[leftIndex].id;
      var tempTitle = items[leftIndex].title;
      var tempDone = items[leftIndex].done;

      items[leftIndex].id = items[rightIndex].id;
      items[leftIndex].title = items[rightIndex].title;
      items[leftIndex].done = items[rightIndex].done;

      items[rightIndex].id = tempId;
      items[rightIndex].title = tempTitle;
      items[rightIndex].done = tempDone;
    };

    function partition(items, left, right) {
      var pivot = items[Math.floor((right + left) / 2)].id,
        i = left, //left pointer
        j = right; //right pointer
      while (i <= j) {
        while (items[i].id > pivot) {
          i++;
        }
        while (items[j].id < pivot) {
          j--;
        }
        if (i <= j) {
          swap(items, i, j); //sawpping two elements
          i++;
          j--;
        }
      }
      return i;
    };

    //quick sort descending order for todo array to maintain items order during and after search
    function quickSort(items, left, right) {
      var index;
      if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
          quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
          quickSort(items, index, right);
        }
      }
      return items;
    };

    // first call to quick sort
    todos = quickSort(todos, 0, todos.length - 1);

    todosUnmatched = []; //re-initialize todosUnmatched

    //filter unmatched items
    todosUnmatched = todos.filter((todo) => { return (!(todo.title.toLowerCase().includes(str.toLowerCase()))) });
    this.setState({ todosUnmatched });

    //filter matched items
    todos = todos.filter((todo) => { return (todo.title.toLowerCase().includes(str.toLowerCase())) });
    this.setState({ todos });

    lists = lists.map((todoList) => {
      if (todoList.id == listId) {
        todoList.list = todos;
      }
      return todoList;
    });
  }




  //method to remove a todo item
  removeTodo(item) {
    let todos = this.state.todos;
    let lists = this.state.lists;
    let listId = this.state.listId;
    console.log(listId);

    //filter() creates a new array and remove the item passed in
    todos = todos.filter((todo) => { return todo.id !== item.id });

    let i = todos.length - 1;
    todos = todos.map((todo) => {
      todo.id = i;
      i--;
      return todo;
    });

    lists = lists.map((todoList) => {
      if (todoList.id == listId) {
        todoList.list = todos;
      }
      return todoList;
    })

    this.setState({ todos });
    console.log({ todos });
    this.setState({ lists });
    console.log({ lists });
  }

  relabelIds() {
    let todos = this.state.todos;

    let i = todos.length - 1;
    todos = todos.map((todo) => {
      todo.id = i;
      i--;
      return todo;
    });

    this.setState({ todos });
    console.log(this.state);
  }

  allowReordering() {
    let isReordering = !this.state.isReordering;
    this.setState({ isReordering });
  }


  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>; //platform-specific for the status bar on top

    return (

      <LinearGradient
        colors={['#FF9636', '#fff', '#D1C2C2', '#fff']}
        style={styles.container}>
        {/*display status bar on top*/}
        {statusbar}

        {/*render the Header here to pass this string to Header class */}
        <Header
          isReordering={this.state.isReordering}
          listTitle={
            this.state.lists.map((todoList) => {
              if (todoList.id == this.state.listId) {
                return todoList.title;
              }
            })}
          isSearching={this.state.isSearching}
          isBackVisible={true}
          toggleIsSearching={() => this.toggleIsSearching()}
          backToHome={() => this.backToHome()}
          allowReordering={() => this.allowReordering()} />

        {(this.state.isSearching) ?
          (
            <SearchBar
              isReordering={this.state.isReordering}
              searchTodo={(str) => this.searchTodo(str)}
              allowReordering={() => this.allowReordering()}
            />) : (

            <AddNewTodoBtn
              toAddNewTodoScreen={() => this.toAddNewTodoScreen()}
            />)
        }

        <View style={styles.listContainer}>

          {this.state.isReordering ?

            <DraggableFlatList
              data={this.state.todos} // get the todos array
              keyExtractor={(item, index) => index.toString()} // provide key index as a string; have to specify it due to no default key value
              onDragEnd={({ data }) => {
                todos = this.state.todos;
                this.setState({ todos: data });
                this.relabelIds();
              }}
              renderItem={({ item, index, drag }) => { // render an item from data
                return (
                  <TodoItem
                    todoItem={item}
                    drag={drag}
                    isReordering={this.state.isReordering}
                    toggleDone={() => this.toggleDone(item)}
                    removeTodo={() => this.removeTodo(item)}
                    editTodo={todoEdit => this.editTodo(item, todoEdit)}
                  />
                )
              }
              }
            /> :

            <FlatList
              data={this.state.todos} // get the todos array
              keyExtractor={(item, index) => index.toString()} // provide key index as a string; have to specify it due to no default key value
              renderItem={({ item, index }) => { // render an item from data
                return (
                  <TodoItem
                    todoItem={item}
                    isReordering={this.state.isReordering}
                    toggleDone={() => this.toggleDone(item)}
                    removeTodo={() => this.removeTodo(item)}
                    editTodo={todoEdit => this.editTodo(item, todoEdit)}
                    toEditScreen={() => this.toEditScreen(item)}
                  />
                )
              }
              }
            />
          }
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: { //fill
    flex: 1, //how much an item occupies available space on screen
    backgroundColor: '#D1C2C2',
  },
  statusbar: {//status bar on top
    backgroundColor: '#FFCD58',
    height: 40
  },
  listContainer: {
    flex: 1,
    borderTopLeftRadius: 130,
    backgroundColor: "#fff",
    paddingBottom: '5%'
  }
});
