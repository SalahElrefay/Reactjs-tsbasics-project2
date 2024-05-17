export function txtSlicer(txt:string , max: number =50){
if(txt.length >= max) return `${txt.slice(0 , max)} ...`; return txt;
}

export function numberWithComma(x: string): string {
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}