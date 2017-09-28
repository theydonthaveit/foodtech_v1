module.exports = function (wallaby) {
    return {
      files: [
        'src/**/*.ts',
        'dist/**/*.js'
      ],
  
      tests: [
        'test/**/*Spec.js'
      ]
    };
  };