module.exports = {
    apps : [{
      name   : "v-minetrack",
      script : "./dist/main.js",
      instances: 0,
      exec_mode: "cluster"
    }]
  }
  