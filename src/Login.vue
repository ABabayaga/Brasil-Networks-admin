<template v-else>
    <v-app id="inspire">
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4"> 
              <v-card class="elevation-12">
                <v-toolbar color="amber" flat>
                  <v-toolbar-title>Login Market</v-toolbar-title>
                  <div class = "flex-grow-1"></div>
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
                  <v-btn color="amber" @click="autenticar" >Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </v-app>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    username: "",
    password: ""
  }),
  methods: {
    autenticar() {
      let usuario = {}
        usuario.username = this.username
        usuario.senha = this.password
        usuario.tipo = "ADMIN"
      
      HttpRequestUtil.autenticar(usuario).then(usuario => {
        if(usuario == "Usuário ou senha inválidos!"){
          alert("usuário invalido")
        }else {
          localStorage.setItem("Logado", JSON.stringify(usuario[0]))
          alert("Usuário Logado com sucesso!")
          this.$router.push("/")
        }
      })
    }  
  }
};
</script>