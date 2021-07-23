import { songsList } from '../repositories/recommendationRepository';

async function giveRandomSong() {

    function refference() { 
        return Math.random() - 0.5; 
    };

    const list = await songsList();
 
    let filteredList:string[];

    if (list.length === 0) return null;

    else if (Math.random() <= 0.7) {
        filteredList = list.filter(item => item.score > 10);
    }

    else {
        filteredList = list.filter(item => item.score <= 10);
    }
    
    if(filteredList.length === 0) return list.sort(refference)[0];

    return filteredList.sort(refference)[0];
}

export { giveRandomSong };