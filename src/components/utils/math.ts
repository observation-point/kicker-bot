// tslint:disable-next-line:prefer-template
export const round = (value: number, fixed: number = 1) => +(Math.round(`${value}e+${fixed}` as any)  + `e-${fixed}`);
