<template>
  <v-app>
    <!-- górny panel nagłówkowy -->
    <v-app-bar
      app
      color="primary"
      dark
    >
			<v-spacer></v-spacer>
			<h1>
				Pracownia Programowania
			</h1>
			<v-spacer></v-spacer>
    </v-app-bar>
		<!-- treść strony -->
    <v-main>
      <Users />
    </v-main>
  </v-app>
</template>

<script>
import Users from './components/Users';

export default {
  name: 'App',

  components: {
    Users,
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');
h1 {
	font-family: 'Russo One', sans-serif;
	letter-spacing: 1px;
}
</style>
