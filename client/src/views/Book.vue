<template>
  <v-container>
    <v-toolbar color="white" class="elevation-1 costume-toolbar">
      <v-toolbar-title>Books</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn round color="info" @click="dialog = true">
        Add New
        <v-icon right>mdi-plus-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.author }}</td>
        <td>{{ props.item.publisher }}</td>
        <td>{{ props.item.page }}</td>
        <td>{{ props.item.isbn }}</td>
        <td>{{ props.item.date | moment }}</td>
        <td>
          <v-btn icon class="ma-0" @click="editBook(props.item)">
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-btn>
          <v-btn icon class="ma-0" @click="deleteProcess(props.item._id)">
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>

    <v-dialog
      persistent
      transition="slide-y-reverse-transition" 
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <h3 class="title">{{ modalTitle }}</h3>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                outline
                label="Book Name"
                v-model="book.name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                outline
                label="Author"
                v-model="book.author"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                outline
                label="Publisher"
                v-model="book.publisher"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                outline
                label="Total Pages"
                v-model.number="book.page"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                outline
                label="ISBN"
                v-model="book.isbn"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            flat
            color="info"
            @click="saveProcess()"
          >{{ modalBtnSave }}</v-btn>
          <v-btn
            flat
            @click="reset()"
          >Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.costume-toolbar {
  border-top: 5px solid #2196f3 !important;
  border-radius: 10px 10px 0 0;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component({
  metaInfo: {
    title: 'List of Books',
  },

  filters: {
    moment: (date: any) => moment(date).format('LL'),
  },
})

export default class Book extends Vue {
  private bookId = '';
  private isEdit = false;
  private dialog = false;
  private book = {};
  private items = [];
  private headers = [
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Author',
      value: 'author',
    },
    {
      text: 'Publisher',
      value: 'publisher',
    },
    {
      text: 'Total Pages',
      value: 'page',
    },
    {
      text: 'ISBN',
      value: 'isbn',
    },
    {
      text: 'Release',
      value: 'date',
    },
    {
      text: 'Actions',
      sortable: false,
      align: 'center',
    },
  ];

  private get modalTitle() {
    return this.isEdit ? 'Edit Book' : 'Add New Book';
  }

  private get modalBtnSave() {
    return this.isEdit ? 'Update' : 'Save';
  }

  private mounted() {
    this.fetchData();
  }

  private fetchData() {
    this.axios.get('book')
      .then((res) => {
        this.items = res.data.data;
        // console.log(this.items);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  private saveProcess() {
    const book = this.book;

    if (!this.isEdit) {
      this.axios.post('book', book)
        .then((res) => {
          console.log(res.data);
          this.reset();
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Object.assign({ _id: this.bookId }, book);

      this.axios.post('book/update', book)
        .then((res) => {
          console.log(res.data);
          this.reset();
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  private deleteProcess(id: string) {
    if (confirm('Really')) {
      this.axios.post('book/delete', { id })
        .then((res) => {
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return false;
    }
  }

  private editBook(item: any) {
    this.isEdit = true;
    this.dialog = true;
    this.bookId = item._id;
    this.book = item;
  }

  private reset() {
    this.dialog = false;
    this.bookId = '';
    this.book = {};

    setTimeout(() => {
      this.isEdit = false;
    }, 500);
  }
}
</script>
