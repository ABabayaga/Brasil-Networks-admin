<template>
  <div>
    <v-app id="inspire" v-if="logado">
      <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

        <span class="title ml-3 mr-5">
          Brasil Networks&nbsp;
          <span class="font-weight-light">Admin</span>
        </span>

        <v-spacer></v-spacer>
        <v-btn icon left>
          <v-icon @click="logout">mdi-logout</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
        <!-- <v-icon @click="logout">mdi-exit-to-app</v-icon> -->

        <v-list dense>
          <template v-for="item in items">
            <v-row v-if="item.heading" :key="item.heading" align="center">
              <v-col cols="6">
                <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
              </v-col>
              <v-col cols="6" class="text-center"></v-col>
            </v-row>
            <v-list-group
              v-else-if="item.children"
              :key="item.title"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <v-list-item v-for="(child, i) in item.children" :key="i" link>
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ child.title}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="item.title" link router :to="item.route">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-content>
        <router-view />
      </v-content>
    </v-app>

    <!-- <template class="pt-5">
      <v-app>
        <v-card width="300px" class="pt-5 mx-auto" max-width="400">
          <v-toolbar color="blue" flat>
            <v-toolbar-title>Login Brasil Networks</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                v-model="username"
                prepend-icon="mdi-account"
                type="text"
                color="amber"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                v-model="password"
                prepend-icon="mdi-lock"
                type="password"
                color="amber"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="blue" @click="autenticar">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-app>
    </template>-->

    <template>
      <v-content>
        <v-container fill-height fluid>
          <v-layout  align-center justify-center>
            <v-flex xs12 sm6 offset-sm4>
              <v-card class="elevation-12" width="420px">
                <v-toolbar color="general">
                  <v-toolbar-title>Admin Panel</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Username"
                      v-model="username"
                      :rules="[() => !!username || 'This field is required']"
                      prepend-icon="mdi-account"
                      
                      required
                    />
                    <v-text-field
                      id="password"
                      label="Password"
                      v-model="password"
                      :rules="[() => !!password || 'This field is required']"
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="showPassword ? 'text' : 'password'"
                      prepend-icon="mdi-lock"
                      placeholder="*********"
                      counter
                      required
                      @keydown.enter="login"
                      @click:append="showPassword = !showPassword"
                    />
                  </v-form>
                </v-card-text>
                <v-divider class="mt-5" />
                <v-card-actions>
                  <v-spacer />
                  <v-btn align-center justify-center color="general" @click="autenticar">Login</v-btn>
                </v-card-actions>
                <v-snackbar v-model="snackbar" :color="color" :top="true">
                  {{ errorMessages }}
                  <v-btn dark flat @click="snackbar = false">Close</v-btn>
                </v-snackbar>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>
  </div>
</template>

  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  layout: "blank-layout",
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    username: "",
    password: "",
    logado: false,

    //  username: '',
    //   password: '',
    //   errorMessages: 'Incorrect login info',
    //   snackbar: false,
    //   color: 'general',
      showPassword: false,

    items: [
      {
        title: "Home",
        icon: "mdi-home",
        route: "/home"
      },
      {
        title: "Planos",
        icon: " mdi-file-document-box",
        route: "/planos"
      },
      {
        title: "Usuário",
        icon: "mdi-account",
        route: "/usuario"
      }
    ]
  }),
  methods: {
    autenticar() {
      let usuario = {};
      usuario.username = this.username;
      usuario.senha = this.password;
      usuario.tipo = "ADMIN";
      HttpRequestUtil.autenticar(usuario).then(usuarioAut => {
        if (JSON.stringify(usuarioAut[0]) != undefined) {
          if (
            usuarioAut[0].username == usuario.username &&
            usuarioAut[0].senha == usuario.senha &&
            usuarioAut[0].tipo == usuario.tipo
          ) {
            localStorage.setItem("logado", JSON.stringify(usuarioAut[0]));
            this.logado = true;
          }
        } else {
          alert("Usuário e/ou senha inválidos");
        }
      });
    },
    logout() {
      localStorage.removeItem("logado");
      this.logado = false;
    },
    buscarUsuarioLS() {
      let lsUsuario = null;
      lsUsuario = localStorage.getItem("logado");
      if (lsUsuario == null) {
        this.logado = false;
      } else {
        this.logado = true;
      }
    }
  },
  mounted() {
    this.buscarUsuarioLS();
  },
  login: function() {
    let username = this.username;
    let password = this.password;
    this.$store
      .dispatch("login", { username, password })
      .then(() => this.$router.push("/dashboard"))
      .catch(err => {
        console.log(err);
        this.snackbar = true;
      });
  },
  metaInfo() {
    return {
      title: "Super Secret | Login"
    };
  }
};
</script>

<style lang="scss">
@import "@/styles/index.scss";
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>