import { songsList } from '../repositories/recommendationRepository';

async function giveRandomSong() {

    const list = await songsList();
    
    let filteredList:string[];

    if (list.length === 0) return null;

    else if (Math.random() <= 0.7) {
        filteredList = list.filter(item => item.score > 10);
    }

    else {
        filteredList = list.filter(item => item.score <= 10);
    }

    if(filteredList.length === 0) return list[Math.random() * (list.length - 1)];

    return filteredList[Math.random() * (filteredList.length -1)];
}

export { giveRandomSong };