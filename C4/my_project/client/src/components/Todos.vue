<template>
  <div class="container">
    <div class="col-sm-10">
      <h1>Задачи</h1>

      <!-- Внешний компонент -->
      <confirmation :message="confirmationMessage" v-if="showConfirmation"></confirmation>

      <!-- Кнопка вызова модального окна для управления задачами -->
      <button type="button"
              id="task-add"
              class="btn btn-success btn-sm align-left d-block"
              v-b-modal.todo-modal>
          Добавить задачу
      </button>

      <!-- Таблица вывода -->
      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Выполнена?</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.uid }}</td>
            <td>{{ todo.description }}</td>
            <td>
              <span v-if="todo.is_completed">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button type="button"
                        class="btn btn-secondary btn-sm"
                        @click="updateTodo(todo)"
                        v-b-modal.update-todo-modal>
                  Обновить
                </button>
                &nbsp;
                <button type="button" class="btn btn-danger btn-sm" @click="deleteTodo(todo)">
                  X
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Модальное окно добавления задачи-->
    <b-modal ref="addTodoModal"
             id="todo-modal"
             title="Add task"
             hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-description-group"
                      label="Description:"
                      label-for="form-description-input">
          <b-form-input id="form-description-input"
                        type="text"
                        v-model="addTodoForm.description"
                        required
                        placeholder="Add Task">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-complete-group">
          <b-form-checkbox-group v-model="addTodoForm.is_completed" id="form-checks">
            <b-form-checkbox value="true">
              Task is completed?
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Add</b-button>
        <b-button type="reset" variant="danger">Close</b-button>
      </b-form>
    </b-modal>

    <!-- Модальное окно редактирования задачи-->
    <b-modal ref="updateTodoModal"
             id="update-todo-modal"
             title="Add task"
             hide-footer>
      <b-form @submit="onUpdateSubmit" @reset="onUpdateReset" class="w-100">
        <b-form-group id="form-description-group"
                      label="Description:"
                      label-for="form-description-input">
          <b-form-input id="form-description-input"
                        type="text"
                        v-model="updateTodoForm.description"
                        required
                        placeholder="updateTodoForm.description">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-complete-group">
          <b-form-checkbox-group v-model="updateTodoForm.is_completed" id="form-checks">
            <b-form-checkbox value="true">
              Task is completed?
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
        <b-button type="reset" variant="danger">Close</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Confirmation from './Confirmation.vue';

const todoListURL = 'http://localhost:5000/api/tasks/'; // Way to tasks list
const todoAddURL = 'http://localhost:5000/api/add-task/'; // Way for add task func
const updateURL = 'http://localhost:5000/api/update/';
const deleteURL = 'http://localhost:5000/api/delete/';

export default {
  name: 'Todos',
  data() {
    return {
      todos: [],
      addTodoForm: { // add object addTodoForm with the same fields as the modal window
        description: '',
        is_completed: [],
      },
      updateTodoForm: {
        uid: 0,
        description: '',
        is_completed: [],
      },
      confirmationMessage: '',
      showConfirmation: false,
    };
  },
  methods: {

    getTodos() {
      axios.get(todoListURL)
        .then((response) => {
          this.todos = response.data.tasks;
        });
    },

    resetForm() {
      this.addTodoForm.description = '';
      this.addTodoForm.is_completed = [];
      this.updateTodoForm.description = '';
      this.updateTodoForm.is_completed = [];
    },

    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      const requestData = {
        description: this.addTodoForm.description,
        is_completed: this.addTodoForm.is_completed.length > 0,
      };
      axios.post(todoAddURL, requestData)
        .then(() => {
          this.getTodos();
          this.confirmationMessage = `Задачача "${requestData.description}" добавлена`;
          this.showConfirmation = true;
          setTimeout((() => {
            this.showConfirmation = false;
            this.confirmationMessage = '';
          }), 1500);
        });
      this.resetForm();
    },

    updateTodo(todo) {
      this.updateTodoForm.uid = todo.uid;
      this.updateTodoForm.description = todo.description;
      if (todo.is_completed) {
        this.updateTodoForm.is_completed = [true];
      }
    },

    onUpdateSubmit(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      const requestData = {
        description: this.updateTodoForm.description,
        is_completed: this.updateTodoForm.is_completed.length > 0,
      };
      axios.post(updateURL + this.updateTodoForm.uid, requestData)
        .then(() => {
          this.getTodos();
          this.confirmationMessage = `Задачача "${requestData.description}" обновлена`;
          this.showConfirmation = true;
          setTimeout((() => {
            this.showConfirmation = false;
            this.confirmationMessage = '';
          }), 1500);
        });
      this.resetForm();
    },

    onUpdateReset(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      this.resetForm();
    },

    deleteTodo(todo) {
      axios.post(deleteURL + todo.uid)
        .then(() => {
          this.getTodos();
          this.confirmationMessage = `Задачача "${todo.description}" удалена`;
          this.showConfirmation = true;
          setTimeout((() => {
            this.showConfirmation = false;
            this.confirmationMessage = '';
          }), 1500);
        });
    },

  },
  created() {
    this.getTodos();
  },

  components: {
    confirmation: Confirmation,
  },
};
</script>

<style>
button#task-add {
  margin-top: 20px;
  margin-bottom: 20px;
}
h1, td {
  text-align: left;
}
.todo-uid {
  text-align: right;
}
</style>
