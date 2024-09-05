class SoundEffectsManager {
  constructor() {
    if (!SoundEffectsManager.instance) {
      if (typeof window !== 'undefined') {
        this.sounds = {
          click: new Audio('/sounds/click.mp3'),
          wrong: new Audio('/sounds/wrong.mp3'),
          right: new Audio('/sounds/right.mp3'),
          failed: new Audio('/sounds/failed.mp3'),
        };
      }
      SoundEffectsManager.instance = this;
    }

    return SoundEffectsManager.instance;
  }

  playSound(soundName) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.play().catch((error) => {
        console.error(`Failed to play ${soundName} sound:`, error);
      });
    } else {
      console.error(`Sound ${soundName} not found.`);
    }
  }
}

const soundEffectsManager = new SoundEffectsManager();
Object.freeze(soundEffectsManager); // To ensure a single instance is used

export default soundEffectsManager;
