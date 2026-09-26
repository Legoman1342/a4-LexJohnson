const frequencies = {
    "0": 0, // 0 means a rest
    "1": 261.62,
    "2": 294.32,
    "3": 327.02,
    "4": 348.83,
    "5": 392.43,
    "6": 436.03,
    "7": 490.54,
    "8": 523.24
}

// List of notes to play
export let melody = $state([0, 0, 0, 0, 0, 0, 0, 0])

// Whether the melody is currently playing
export let playbackInfo = $state({
    currentlyPlaying: false
})

// Info about the current user
export let userInfo = $state({
    loggedIn: false,
    userID: null,
    username: null
});


/**
 * Plays the specified note for 1 eighth note (0.25 seconds).
 * @param {number} note Number (as a string) representing the note to play
 * @param {((this: AudioScheduledSourceNode, ev: Event) => any) | null} callback Function to call once the note has finished playing
 */
export function playNote(note, callback) {
    const audioContext = new AudioContext();
    const oscNode = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscNode.frequency.value = frequencies[note];
    oscNode.type = 'triangle'
    oscNode.onended = callback // Used to play the next notes in the melody once this one's done

    // Make a nice envelope for each note to prevent popping at the end of notes
    gainNode.gain.value = 0
    gainNode.gain.linearRampToValueAtTime(0.3, 0.01)
    gainNode.gain.linearRampToValueAtTime(0, 0.25)

    oscNode.start()
    oscNode.stop(0.25)
}