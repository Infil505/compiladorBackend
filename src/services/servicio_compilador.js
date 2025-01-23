const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const {secure} = require('../middleware/restricciones');

const tempDir = path.join(__dirname, "..", "temp");

// Asegura que el directorio temporal exista
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

const compiladorCmas = (code) => {

    if(secure(code).isvalid === false){
        return new Promise((reject) => {
            reject(secure(code).message);
        });
    } else{
        return new Promise((resolve, reject) => {
            const fileName = path.join(tempDir, "temp.cpp");
            const executable = path.join(tempDir, "temp");
            // Escribe el código en un archivo temporal
            fs.writeFileSync(fileName, code);
            const dockerCommand = `docker run --rm -v "${tempDir}:/app" gcc:latest bash -c "g++ /app/temp.cpp -o /app/temp && /app/temp"`;
            // Compila y ejecuta el código
            exec(dockerCommand, (error, stdout, stderr) => {
                // Limpia los archivos temporales para evitar almacenar innecesariamente archivos y ocupar espacio que se necesita en el server
                fs.unlinkSync(fileName);
                if (fs.existsSync(executable)) fs.unlinkSync(executable);
                if (error) {
                    return reject(stderr || error.message);
                }
                resolve(stdout);
            });
        });
    }
};

module.exports = { compiladorCmas };
