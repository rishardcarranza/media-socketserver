export class Usuario {
    public id: string; // Mandatory
    public nombre: string;
    public username: string;
    public email: string;
    public sala: string;

    constructor(id: string, nombre = 'Desconocido', username = '', email = '') {
        this.id = id;
        this.nombre = nombre;
        this.username = username;
        this.email = email;
        this.sala = 'sin-sala';
    }
}
