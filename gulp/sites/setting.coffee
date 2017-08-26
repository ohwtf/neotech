
module.exports =
  stylus:
    src: "./app/src/stylus/*"
    src_watch: "./app/src/stylus/**/*"
    dest: "./public/css/"

  images:
    src: "./app/src/assets/**/**"
    dest: "./public/assets/"
    
  typescript:
    src: "./app/src/javascript/**/*.ts"
    dest: "./public/javascript/"

  html:
    src: "./app/src/javascript/**/*.ejs"
    dest: "./public/javascript/"

  assets:
    src: "./app/src/assets/**/**"
    dest: "./public/"