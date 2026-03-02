export function dmsToDecimal(dms) {
    const regex = /(\d+)°(\d+)'([\d.]+)"?([NSEW])/;
    const [, graus, minutos, segundos, direcao] = dms.match(regex);

    let decimal = Number(graus) + Number(minutos) / 60 + Number(segundos) / 3600;

    if (direcao === "S" || direcao === "W") {
        decimal *= -1;
    };

    return decimal;
};
