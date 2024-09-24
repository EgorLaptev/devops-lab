<template>
  <h1 class="title">
    {{ message }}
  </h1>
</template>

<script>

export default {
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    fetch('https://localhost/api', {
      method: 'GET'
    })
      .then(resp => resp.text())
      .then(data => {
        let text = data.split('')
        const typing = setInterval(() => {
          this.message += text.shift()
          if (text.length === 0) clearInterval(typing);
        }, 50)
      })
  },
  name: 'App',
  components: {
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;


  height: 100vh;
  width: 100vw;


  display: flex;
  justify-content: center;
  align-items: center;

  background: white;
}

body, html {
  margin: 0;
  padding: 0;
}

.title {
  margin: 0;
  padding: 3px;

  color: #222;

  font-weight: 200;
}

</style>
