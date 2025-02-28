const { crearTablaUsuarios, agregarUsuario } = require('./usuarios');

(async () => {
    await crearTablaUsuarios();
    await agregarUsuario("Juan Pérez", "juan@example.com");
})();
