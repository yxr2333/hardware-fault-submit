function add0(m :number){return m<10?'0'+m:m }
export function DateTimeFormat(val :number)
{
    const time = new Date(val);
    const y = time.getFullYear();
    const m = time.getMonth()+1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}