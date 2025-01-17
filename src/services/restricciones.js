const secure = (code) => {
    const prohibitedPatterns = [
        /system\s*\(/,
        /fork\s*\(/,
        /exec\s*\(/,
        /rm\s+-rf/,  
    ];

    for (const pattern of prohibitedPatterns) {
        if (pattern.test(code)) {
            throw new Error("El código presenta comandos que no estan permitidos por el administrador.");
        }
    }

    if (code.length > 5000) {
        throw new Error("El código es muy extenso, maximo 5 mil caracteres.");
    }
};

module.exports = { secure };
