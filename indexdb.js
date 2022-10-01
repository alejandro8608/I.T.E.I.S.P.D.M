const dbConnection = window.indexedDB.open('veterinaria', 2);                                   // version 1
let db;
//on success = El successevent se dispara cuando un IDBRequesttiene éxito.
dbConnection.onsuccess = () => {
    db = dbConnection.result;
    console.log("Base de datos abierta", db);
}
// El upgradeneededevento se activa cuando se intentó abrir una base de datos 
// con un número de versión superior a su versión actual.
dbConnection.onupgradeneeded = (e) => {
    db = e.target.result;//elemento que nos devuelve
    console.log("Crear objetos de DB", db);
    const coleccionObjetos = db.createObjectStore('persona', {
        keyPath: 'idPersona'
    });
    coleccionObjetos.createIndex("idPersona", "idPersona", { unique: false });
    coleccionObjetos.createIndex("nombre", "nombre", { unique: false });
    coleccionObjetos.createIndex("apellido", "apellido", { unique: false });

    const objetoVenta = db.createObjectStore('venta', {
        keyPath: 'idVenta'
    });
    objetoVenta.createIndex("idVenta", "idVenta", { unique: false });
    objetoVenta.createIndex("descripcion", "descripcion", { unique: false });
    objetoVenta.createIndex("idPersona", "idPersona", { unique: false });

}
// El errorevento se activa IDBTransactioncuando una solicitud devuelve un error 
// y el evento aparece en el objeto de la transacción.
dbConnection.onerror = (error) =>{
    console.log(error);
}