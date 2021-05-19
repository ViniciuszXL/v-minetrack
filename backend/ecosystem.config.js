module.exports = {
    apps : [{
      name   : "dust-api",
      script : "./dist/main.js",
      instances: 0,
      exec_mode: "cluster"
    }]
  }
  