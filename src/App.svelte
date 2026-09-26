<script>
    import {melody, playbackInfo, userInfo, playNote} from "./shared.svelte.js";
    import NoteInput from "./lib/NoteInput.svelte";

    /**
     * Plays all notes in the given melody. This is destructive, so the function should only be given snapshots of the melody.
     * @param {any[]} melody
     */
    function playMelody(melody) {
        if (melody.length > 0) {
            playbackInfo.currentlyPlaying = true;
            // for (let loadButton of document.getElementsByClassName('coll-item-load')) {
            //     loadButton.disabled = true;
            // }

            let note = melody.shift()
            playNote(note, () => {playMelody(melody)})
        } else {
            playbackInfo.currentlyPlaying = false;
            // for (let loadButton of document.getElementsByClassName('coll-item-load')) {
            //     loadButton.disabled = false;
            // }
        }
    }

    function playButton() {
        let melodyClone = $state.snapshot(melody);
        playMelody(melodyClone);
    }
</script>


<main>
    <h2>make a melody</h2>
    <div id="melody-maker">
        <div id="melody">
            <button id="play" onclick={playButton} disabled={playbackInfo.currentlyPlaying}>▶</button>
            {#each {length: 8}, index}
                <NoteInput {index} />
            {/each}
        </div>
        Melody:
        {#each melody as note}
            {note}
        {/each}
        <div id="instructions">
            1-8 are the notes of the major scale, 0 is silence.<br>
            write your melody, give it a title, and submit it to the collection.
        </div>
        <div id="details">
            <button id="clear">clear</button>
            <label for="title-input">melody title:</label> <input type="text" id="title-input">
            <label for="composer-input">composer:</label> <input type="text" id="composer-input" disabled>
            <button id="submit">submit</button>
        </div>
    </div>
    <h2>collection</h2>
    <div id="show-user-collection-div">
        <input type="checkbox" id="show-user-collection"> <label for="show-user-collection">only show your collection</label>
    </div>
    <div id="collection">
        <!-- Collection items are generated here in code -->
        <p>nothing here yet...</p>
    </div>
</main>