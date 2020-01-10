<template>
  <div>
    <div>
      <!-- Alert -->
      <v-snackbar
        type="info"
        v-model="salvo"
        close-text="Close Alert"
        color="info"
        :top="y === 'top'"
      >
        USUÁRIO CADASTRADO COM SUCESSO
        <v-btn dark text @click="salvo = false">Fechar</v-btn>
      </v-snackbar>
    </div>
    <div>
      <v-snackbar
        type="info"
        v-model="naoCadastrado"
        close-text="Close Alert"
        color="red"
        :top="y === 'top'"
      >
        NÃO FOI POSSÍVEL CADASTRAR O USUÁRIO, PREENCHA O(S) CAMPO(S) VAZIOS!
        <v-btn dark text @click="naoCadastrado = false">Fechar</v-btn>
      </v-snackbar>
    </div>

    <!-- Cadastro -->
    <div class="ma-6 elevation-1">
      <div class="text-center pt-4">
        <h1>Cadastro de Usuários</h1>
      </div>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <!-- Coluna Username -->
            <v-col cols="12" md="4">
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                :counter="10"
                label="Username"
                required
              ></v-text-field>
            </v-col>

            <!-- Coluna Password -->
            <v-col cols="12" md="4">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :counter="10"
                label="Senha"
                required
                type="password"
              ></v-text-field>
            </v-col>

            <!-- Coluna Tipo -->
            <v-col cols="12" md="4">
              <v-select :items="items" label="Tipo" v-model="tipo"></v-select>
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn color="red" class="white--text" @click="limpaCampos">Cancelar</v-btn>
            <v-btn color="info" class="my-5 ml-5" @click="salvar">Salvar</v-btn>
          </div>
        </v-container>
      </v-form>
    </div>

    <!--Lista de Usuarios-->
    <div class="ma-6 elevation-1">
      <v-card>
        <div class="text-center pt-4">
          <h1>Usuários</h1>
        </div>
        <v-simple-table light>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">NOME</th>
                <th class="text-center">TIPO</th>
                <th class="text-center">ATIVAR/INATIVAR</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarios" :key="usuario._id">
                <td class="text-center">{{ usuario.username }}</td>
                <td class="text-center">{{ usuario.tipo }}</td>
                <td class="text-center">
                  <v-btn icon @click="mostrarDialog(usuario)">
                    <v-icon v-if="usuario.ativo" color="green">{{ativado}}</v-icon>
                    <v-icon v-else color="grey">{{desativado}}</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <template>
          <v-row justify="center">
            
            <!-- Dialog de ativação e inativação-->
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-title class="headline">Olá Admin!</v-card-title>

                <v-card-text>Deseja realmente alterar status do usuário?</v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>

                  <v-btn color="green darken-1" text @click="statusUsuario()">Aceitar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";
import { ftruncate } from "fs";

export default {
  data: () => ({
    valid: false,
    naoCadastrado: false,
    usuarioStatus: null,
    salvo: false,
    dialog: false,

    //Icones
    ativado: "mdi-check-bold",
    desativado: "mdi-cancel",

    //Variáveis do Usuario
    id: 0,
    ativo: true,
    username: "",
    password: "",
    tipo: "",
    items: ["ADMIN", "CLIENTE"],

    //Array de usuarios
    usuarios: [],
    y: "top",
    passwordRules: [
      v => !!v || "Senha é obrigatória",
      v => v.length <= 10 || "Senha deve ter no máximo 10 caracteres"
    ],
    usernameRules: [
      v => !!v || "Username é obrigatório",
      v => v.length <= 10 || "Username deve ter no máximo 10 caracteres"
    ]
  }),
  methods: {
    salvar() {
      let valido = this.validar();

      if (valido) {
        let usuario = {};
        usuario.ativo = this.ativo;
        usuario.username = this.username;
        usuario.senha = this.password;
        usuario.tipo = this.tipo;

        HttpRequestUtil.salvarUsuario(usuario).then(response => {
          this.usuarios.push(response);
          this.salvo = true;
          this.limpaCampos();
        });
      } else {
        this.naoCadastrado = true;
      }
    },

    validar() {
      if (this.username == "" || this.password == "" || this.tipo == "") {
        return false;
      } else {
        return true;
      }
    },

    limpaCampos() {
      this.username = "";
      this.password = "";
      this.tipo = "";
    },

    buscarTodos() {
      HttpRequestUtil.buscarUsuarios().then(usuarios => {
        this.usuarios = usuarios;
      });
    },

    mostrarDialog(usuario) {
      this.usuarioStatus = usuario;
      this.dialog = true;
    },

    statusUsuario() {
      if (this.usuarioStatus != null) {
        this.usuarioStatus.ativo = !this.usuarioStatus.ativo;

        HttpRequestUtil.mudarStatus(this.usuarioStatus).then(usuario => {
          this.usuarioStatus = null;
          this.buscarTodos();
        });
      }

      this.dialog = false;
    }
  },

  mounted() {
    this.buscarTodos();
  }
};
</script>

<style>
</style>