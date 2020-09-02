// eslint-disable-next-line
const URL_REGEXP = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
export const linkRegex = new RegExp(URL_REGEXP);

//from: https://jsbin.com/leqifey/edit?html,output 
export const javaHashCode = (data) => {
    for(var i = 0, h = 0xdeadbeef; i < data.length; i++)
       h = Math.imul(h ^ data[i], 2654435761);
   return (h ^ h >>> 16) >>> 0;
}

const API_URL = '/api/save'

export const saveLinkOnBackend = (data) => {
    return fetch(API_URL, {
        type: 'POST',
        body: data
    })
}

export const copyText = (el) => {
    el.select();
    document.execCommand("copy");
}

