import React, { Component } from "react";
import { Layout, Input, Button , List,Icon} from "antd";

import firestore from "./firebase/FireStore";

import "./Ant.css";

const { Header, Footer, Content } = Layout;

class Ant extends Component {

  constructor(props) {
    super(props);

    // Set the default state of our application
    this.state = { addingTodo: false, pendingTodo: "" };
    
    // We want event handlers to share this context
    this.addTodo = this.addTodo.bind(this);

    this.completeTodo = this.completeTodo.bind(this);

    // We listen for live changes to our todos collection in Firebase
    firestore.collection("todos").onSnapshot(snapshot => {
      let todos = [];
      snapshot.forEach(doc => {
        const todo = doc.data();
        todo.id = doc.id;
        if (!todo.completed) todos.push(todo);
      });

      // Sort our todos based on time added
      todos.sort(function(a, b) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      // Anytime the state of our database changes, we update state
      this.setState({ todos });
    });

  }

  async completeTodo(id) {
    // Mark the todo as completed
    await firestore
      .collection("todos")
      .doc(id)
      .set({
        completed: true
      });
  }

  async addTodo(evt) {
    // Set a flag to indicate loading
    this.setState({ addingTodo: true });
    // Add a new todo from the value of the input
    await firestore.collection("todos").add({
      content: this.state.pendingTodo,
      completed: false
    });
    // Remove the loading flag and clear the input
    this.setState({ addingTodo: false, pendingTodo: "" });
  }

  render() {
    return (
      <Layout className="Ant">
        <Header className="Ant-header">
          <h1>Simple Todo ( React | Ant Design | Firebase )</h1>
        </Header>
        <Content className="Ant-content">
          <Input
            ref="add-todo-input"
            className="Ant-add-todo-input"
            size="large"
            placeholder="What needs to be done?"
            disabled={this.state.addingTodo}
            onChange={evt => this.setState({ pendingTodo: evt.target.value })}
            value={this.state.pendingTodo}
            onPressEnter={this.addTodo}
          />
          <Button
            className="Ant-add-todo-button"
            size="large"
            type="primary"
            onClick={this.addTodo}
            loading={this.state.addingTodo}
          >
            Add Todo
          </Button>
          <List
            className="Ant-todos"
            size="large"
            bordered
            dataSource={this.state.todos}
            renderItem={todo => (
              <List.Item>
                {todo.content}
                <Icon
                  onClick={evt => this.completeTodo(todo.id)}
                  className="Ant-todo-complete"
                  type="check"
                />
              </List.Item>
            )}
          />
        </Content>
        <Footer className="Ant-footer">&copy; 2019 All Rights Reserved, SR Creation</Footer>
      </Layout>
    );
  }
}

export default Ant;
