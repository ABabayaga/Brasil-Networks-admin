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
              v-model="plano.planoname"
              :rules="usernameRules"
              :counter="100"
              label="Plano"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="plano.descricao"
              :rules="usernameRules"
              :counter="100"
              label="Descrição do plano"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="plano.valor"
              :rules="usernameRules"
              :counter="10"
              label="Valor"
              required
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="plano.taxa"
              :rules="usernameRules"
              label="Taxa"
              required
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn color="info" class="my-5" @click="incluir()">Salvar</v-btn>
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


          <v-list-item v-for="index in planos" :key="index.title" class="text-start">
            <v-col md="2">
              <v-list-item-title v-text="index.planoname"></v-list-item-title>​
            </v-col>

            <v-col md="2">
              <v-list-item-title v-text="index.descricao"></v-list-item-title>​
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
              <v-list-item-title v-text="index.taxa"></v-list-item-title>​
            </v-col>
            <v-col md="1">
              <v-list-item-title v-text="index.taxa"></v-list-item-title>​
            </v-col>

            <!-- <v-col md="1">
              <v-list-item-title v-text="produto.quantidade"></v-list-item-title>​
            </v-col>-->

            <!-- <v-col md="1">
              <v-btn icon @click="statusProduto(produto)">
                <v-icon v-if="produto.produtoDisponivel">{{produtoDisponivel}}</v-icon>
                <v-icon v-else>{{produtoIndisponvel}}</v-icon>                
              </v-btn>
            </v-col>-->
            <v-col md="1">
              <v-btn icon @click="editarProdutos(plano)">
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
// import HttpRequestUtil from "@/util/HttpRequestUtil";
export default {
  data: () => ({
    indiceTop: 0,
    planoDisponivel: "mdi-cart",
    planoIndisponvel: "mdi-cart-off",
    plano: {
      planoname: "",
      descricao: "",
      valor: "",
      taxa: ""
    },
    planos: [],
    planoEditado: null,
    disponivel: true,
    salvo: false,
    editado: false,
    naoCadastrado: false,
    usernameRules: [v => !!v || "Campo preenchido é obrigatório"]
  }),

  methods: {
    incluir() {
      console.log(this.plano);
      this.planos[this.indiceTop] = this.plano;
      console.log(this.planos);
      this.indiceTop++;
      this.plano = {};
    },
    salvar() {
      let ehvalido = this.validar();
      if (ehvalido) {
        if (this.planoEditado == null) {
          let plano = {};

          this.planos[this.indiceTop].planoname = this.planoname;
          this.planos[this.indiceTop].descricao = this.descricao;
          this.planos[this.indiceTop].valor = parseFloat(this.valor);
          this.planos[this.indiceTop].taxa = this.taxa;
          this.indiceTop++;
          // produto.setor = this.setor;
          // produto.quantidade = parseFloat(this.quantidade);
          // produto.status = this.disponivel
          // HttpRequestUtil.adicionarProduto(produto).then(produto => {
          //   this.produtos.push(produto);
          // });
          this.salvo = true;
          this.limparCampos();
        } else {
          this.planoEditado.planoname = this.planoname;
          this.planoEditado.descricao = this.descricao;
          this.planoEditado.valor = parseFloat(this.valor);
          // this.planoEditado.quantidade = parseFloat(this.quantidade);
          this.planoEditado.taxa = this.taxa;
          // this.produtoEditado.setor = this.setor;
          // HttpRequestUtil.editarProduto(this.produtoEditado).then(
          //   produtos => {}
          // );
          this.editado = true;
          this.planoEditado = null;
        }
      }
      console.log(this.planos);
    },
    limparCampos() {
      this.planoname = "";
      this.descricao = "";
      this.valor = "";
      this.taxa = "";
      // this.imagem = ""
      // this.marca = ""
      // this.setor = this.setor;
    },
    // buscarProdutos() {
    //   HttpRequestUtil.buscarProdutos().then(produtos => {
    //     this.produtos = produtos;
    //   });
    // },
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
    editarProduto(plano) {
      this.planoEditado = plano;
      this.valor = parseFloat(plano.valor);
      this.descricao = plano.descricao;
      // this.quantidade = parseFloat(plano.quantidade);
      this.taxa = plano.taxa;
    }

    // statusProduto(produto) {

    // produto.produtoDisponivel = !produto.produtoDisponivel
    //  HttpRequestUtil.editarProduto(produto).then(produtos => {

    //   });
    // }
  }
  // mounted() {
  //   this.buscarProdutos();
  // }
};
</script>