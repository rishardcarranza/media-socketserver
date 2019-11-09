import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

    // const payload = {
    //     success: true,
    //     hostname: 'Raspberry Pi-USO Edificio C',
    //     ip: '10.10.2.48:8000'
    // };

    // io.to(cliente.id).emit('server-info', payload);
}

export const desconectar = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado')

        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.getListaUsuarios());

    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido: ', payload);

        io.emit('mensaje-nuevo', payload);
    });
}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: any, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload);

        io.emit('usuarios-activos', usuariosConectados.getListaUsuarios());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.username}, configurado.`
        });
        // io.emit('mensaje-nuevo', payload);
    });
}

// Obtener USuarios
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        
        io.emit('usuarios-activos', usuariosConectados.getListaUsuarios());

        // io.emit('mensaje-nuevo', payload);
    });
}

export const requestServerInfo = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('get-server', () => {
        
        console.log('Server info requested...');

        const payload = {
            success: true,
            hostname: 'Raspberry Pi-USO Edificio C',
            ip: '192.168.1.4:8000'
        };

        console.log('Client id: ', cliente.id);
        io.to(cliente.id).emit('server-info', payload);

        // io.emit('mensaje-nuevo', payload);
    });
}