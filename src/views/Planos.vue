<template>
  <div>
    <div>
      <v-alert
        v-model="salvo"
        border="left"
        close-text="Close Alert"
        class="text-center"
        color="info"
        dark
        dismissible
        transition="scale-transition"
      >PLANO CADASTRADO COM SUCESSO!</v-alert>
    </div>
    <div>
      <v-alert
        v-model="editado"
        border="left"
        close-text="Close Alert"
        class="text-center"
        color="info"
        dark
        dismissible
        transition="scale-transition"
      >PLANO EDITADO COM SUCESSO!</v-alert>
    </div>
    <div>
      <v-alert
        v-model="naoCadastrado"
        border="left"
        close-text="Close Alert"
        class="text-center"
        color="red"
        dark
        dismissible
        transition="scale-transition"
      >NÃO FOI POSSÍVEL CADASTRAR O PLANO, PREENCHA OS CAMPOS VAZIOS!</v-alert>
    </div>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="planoname"
              :rules="usernameRules"
              :counter="100"
              label="Plano"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="descricao"
              :rules="usernameRules"
              :counter="100"
              label="Descrição do plano"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="valor"
              :rules="usernameRules"
              :counter="10"
              label="Valor"
              required
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="taxa"
              :rules="usernameRules"
              label="Taxa"
              required
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn color="info" class="my-5" @click="salvar()">Salvar</v-btn>
        </div>
      </v-container>
    </v-form>

    <v-col cols="12">
      <v-card>
        <v-list>
          <v-list-item class="text-start title">
            <v-col md="2">
              <v-list-item-title>Plano</v-list-item-title>​
            </v-col>

            <v-col md="3">
              <v-list-item-title>Descrição</v-list-item-title>​
            </v-col>

            <v-col md="1" class="mb-8">
              <v-list-item-avatar>
                <v-list-item-title>Valor</v-list-item-title>
              </v-list-item-avatar>
            </v-col>

            <v-col md="4">
              <v-list-item-title>Taxa</v-list-item-title>​
            </v-col>

            <v-col md="1">
              <v-list-item-title>Status</v-list-item-title>​
            </v-col>
            <v-col md="1" class="mb-8">
              <v-list-item-title>Editar</v-list-item-title>
            </v-col>
          </v-list-item>

          <v-list-item v-for="plano in planos" :key="plano._id" class="text-start">
            <v-col md="2">
              <v-list-item-title v-text="plano.planoname"></v-list-item-title>​
            </v-col>

            <v-col md="3">
              <v-list-item-title v-text="plano.descricao"></v-list-item-title>​
            </v-col>

            <!-- <v-col md="2">
              <v-list-item-avatar>
                <v-img :src="produto.imagem"></v-img>
              </v-list-item-avatar>
            </v-col>-->

            <!-- <v-col md="1">
              <v-list-item-title>R$ {{(index.valor).toFixed(2)}}</v-list-item-title>​
            </v-col>-->

            <v-col md="1">
              <v-list-item-title v-text="plano.valor"></v-list-item-title>​
            </v-col>
            <v-col md="4">
              <v-list-item-title v-text="plano.taxa"></v-list-item-title>​
            </v-col>

            <!-- <v-col md="1">
              <v-list-item-title v-text="produto.quantidade"></v-list-item-title>​
            </v-col>-->

            <v-col md="1">
              <v-btn icon @click="statusPlano(plano)">
                <v-icon v-if="plano.planoDisponivel">{{planoDisponivel}}</v-icon>
                <v-icon v-else>{{planoIndisponvel}}</v-icon>
              </v-btn>
            </v-col>
            <v-col md="1">
              <v-btn icon @click="editarPlanos(plano)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </div>
</template>

<script>
import HttpRequestUtil from "@/util/HttpRequestUtil";
export default {
  data: () => ({
    indiceTop: 0,
    planoDisponivel: "mdi-cart",
    planoIndisponvel: "mdi-cart-off",
    // plano: {
    //   planoname: "",
    //   descricao: "",
    //   valor: "",
    //   taxa: ""
    // },
    planoname: "",
    descricao: "",
    valor: "",
    taxa: "",

    planos: [],
    planoEditado: null,
    disponivel: true,
    salvo: false,
    editado: false,
    naoCadastrado: false,
    usernameRules: [v => !!v || "Campo preenchido é obrigatório"]
  }),

  methods: {
    // incluir() {
    //   console.log(this.plano);
    //   this.planos[this.indiceTop] = this.plano;
    //   console.log(this.planos);
    //   this.indiceTop++;
    //   this.plano = {};
    // },

    salvar() {
      let valido = this.validar();
      if (valido) {
        let plano = {};
        // usuario.ativo = this.ativo;
        plano.planoname = this.planoname;
        plano.descricao = this.descricao;
        plano.valor = this.valor;
        plano.taxa = this.taxa;

        HttpRequestUtil.adicionarPlanos(plano).then(response => {
          this.planos.push(response);
          this.salvo = true;
          this.limpaCampos();
        });
      } else {
        this.naoCadastrado = true;
      }
    },
    // salvar() {
    //   let ehvalido = this.validar();
    //   if (ehvalido) {
    //     if (this.planoEditado == null) {
    //       let plano = {};

    //       this.planos[this.indiceTop].planoname = this.planoname;
    //       this.planos[this.indiceTop].descricao = this.descricao;
    //       this.planos[this.indiceTop].valor = parseFloat(this.valor);
    //       this.planos[this.indiceTop].taxa = this.taxa;
    //        this.planos[this.indiceTop].status = this.disponivel
    //       this.indiceTop++;
    //       // produto.setor = this.setor;
    //       // produto.quantidade = parseFloat(this.quantidade);

    // HttpRequestUtil.adicionarPlanos(plano).then(plano => {
    //   this.planos.push(plano);
    // });
    //       this.salvo = true;
    //       this.limparCampos();
    //     } else {
    //       this.planoEditado.planoname = this.planoname;
    //       this.planoEditado.descricao = this.descricao;
    //       this.planoEditado.valor = parseFloat(this.valor);
    //       // this.planoEditado.quantidade = parseFloat(this.quantidade);
    //       this.planoEditado.taxa = this.taxa;
    //       // this.produtoEditado.setor = this.setor;
    //       HttpRequestUtil.editarPlanos(this.planoEditado).then(
    //         planos => {}
    //       );
    //       this.editado = true;
    //       this.planoEditado = null;
    //     }
    //   }
    //   console.log(this.planos);
    // },
    limparCampos() {
      this.planoname = "";
      this.descricao = "";
      this.valor = "";
      this.taxa = "";
      // this.imagem = ""
      // this.marca = ""
      // this.setor = this.setor;
    },
    buscarPlanos() {
      HttpRequestUtil.buscarPlanos().then(planos => {
        this.planos = planos;
      });
    },
    validar() {
      if (
        this.planoname == "" ||
        this.descricao == "" ||
        this.valor == "" ||
        this.taxa == ""
      ) {
        this.naoCadastrado = true;
        return false;
      }
      return true;
    },
    editarPlanos(plano) {
      this.planoEditado = plano;
      this.planoname = plano.planoname
      this.valor = parseFloat(plano.valor);
      this.descricao = plano.descricao;
      // this.quantidade = parseFloat(plano.quantidade);
      this.taxa = plano.taxa;
    },

    statusPlano(plano) {
      plano.planoDisponivel = !plano.planoDisponivel;
      HttpRequestUtil.editarPlanos(plano).then(planos => {});
    }
  },
  mounted() {
    this.buscarPlanos();
  }
};
</script>