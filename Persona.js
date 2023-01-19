const fs = require('fs')


fs.writeFileSync('./ejemplo.txt', "Hola Buenas tardes soy")

console.log(fs.existsSync('./ejemplo.txt'))


if(fs.existsSync("./ejemplo.txt")){
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
    console.log(contenido)
    fs.appendFileSync('./ejemplo.txt', "\n Agregar nuevo texto")
    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')

    console.log(contenido)
}

// fs.unlinkSync('./ejemplo.txt')


/**
 * fs.promises
 * 
 * 
 */


const consultasTEXT = async () => {
    await fs.promises.writeFile('./ejemplo2.txt', "HOla segundo texto")

    let resultado = await fs.promises.readFile('./ejemplo2.txt', 'utf-8')
    console.log(resultado)

    await fs.promises.appendFile('./ejemplo2.txt', JSON.stringify(mypersona.nombre))
    resultado = await fs.promises.readFile('./ejemplo2.txt', ('utf-8'))
    console.log(resultado)

    await fs.promises.unlink('./ejemplo2.txt')
}


consultasTEXT();


const mypersona = {
    nombre:"Daniel",
    apellido: "Lugo"
}



class Persona {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.id = Persona.incrementID()
    }

    static incrementID(){
        if(this.idIncrement){
            this.idIncrement++
        } else {
           this.idIncrement = 1
        }
        return this.idIncrement
    }

}

const persona1 = new Persona("Fran", "Rod")
const persona2 = new Persona("Pedro", "Rod")
const persona3 = new Persona("Ana", "alv")
const persona4 = new Persona("Juan", "alv")



// console.log(persona1, persona2, persona3, persona4)

