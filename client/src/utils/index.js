import { suggestMePrompts } from '../constants';

export function getRandomPrompts(prompt) {
    const randomIndex = Math.floor(Math.random() * suggestMePrompts.length);
    const randomPrompt = suggestMePrompts[randomIndex];
    if (randomPrompt === prompt) return getRandoPrompt(prompt);

    return randomPrompt;
};
