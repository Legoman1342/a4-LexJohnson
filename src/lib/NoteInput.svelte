<script>
    import {melody, playbackInfo, playNote} from "../shared.svelte.js";

    let {index} = $props()

    /**
     * Triggers when a note value is changed.
     * @param {any} event
     */
    function onChangeFunction(event) {
        let note = event.target.value;
        playNote(note, null);
        melody[index] = note;
    }
</script>

<input
        id="note-input-{index}"
        class="note-input"
        aria-label="note {index}"
        type="number"
        min="0"
        max="8"
        value={melody[index]}
        onchange={onChangeFunction}
        disabled="{playbackInfo.currentlyPlaying}"
/>