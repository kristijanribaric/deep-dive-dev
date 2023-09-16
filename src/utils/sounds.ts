export const audioKeys = [new Audio('./sounds/key1.mp3'), new Audio('./sounds/key2.mp3'), new Audio('./sounds/key3.mp3'), new Audio('./sounds/key4.mp3')];

export async function typeSound() {
  const i = Math.floor(Math.random() * audioKeys.length);
  audioKeys[i].currentTime = 0;
  await audioKeys[i].play();
}
