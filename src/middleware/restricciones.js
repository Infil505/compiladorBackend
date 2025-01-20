const secure = (code) => {
    const comandosProhibidos = [
        /system\s*\(/,
        /fork\s*\(/,
        /exec\s*\(/,
        /rm\s+-rf/,  
    ];
    
    for (const pattern of comandosProhibidos) {
        if (pattern.test(code)) {
            return {
                isValid: false,
                message: "El código presenta comandos que no están permitidos por el administrador."
            };
        }
    }

    if (code.length > 5000) {
        return {
            isValid: false,
            message: "El código es muy extenso, máximo 5 mil caracteres."
        };
    }

    return {
        isValid: true,
        message: "El código es válido."
    };
};

module.exports = { secure };