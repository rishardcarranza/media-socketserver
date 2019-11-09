import { Usuario } from './usuario';
export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor() {}

    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario
    }

    public actualizarNombre(id: string, data: any) {
        for(let usuario of this.lista) {
            if(usuario.id === id) {
                usuario.nombre = `${data.first_name} ${data.last_name}`;
                usuario.username = data.username;
                usuario.email = data.email;
                break;
            }
        }

        console.log('***** Actualizar Usuario *****');
        console.log(this.lista);
    }

    public getListaUsuarios() {
        return this.lista.filter(usuario => usuario.username !== 'dashboard');
    }

    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id);
    }

    // Obtener usuarios de sala en particular
    public getUsuariosPorSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    // Borrar Usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter(usuario => usuario.id !== id);

        return tempUsuario;
    }
}