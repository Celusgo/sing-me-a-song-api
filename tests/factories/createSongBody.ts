import faker from 'faker';

export function generateNewSong() {
    return {
        name: faker.random.word(),
        youtubeLink: faker.internet.url()
    }
}