<script>
    import {userInfo, defaultComposer, melodyInfo, interfaceInfo, collection, playMelody} from "./shared.svelte.js";
    import NoteInput from "./lib/NoteInput.svelte";
    import CollectionItem from "./lib/CollectionItem.svelte";

    /**
     * Retrieves the collection from the server.
     */
    async function getCollection() {
        collection.length = 0; // Clear the collection before repopulating it

        const response = await fetch(`http://localhost:3000/collection`, {method: "GET"}) // TODO Change to http://${window.location.host}/collection
        let data = JSON.parse(await response.text()).reverse() // Reverse the data so the melodies appear in reverse chronological order
        for (let melody of data) {
            collection.push(melody)
        }
    }


    // Functions that run when interacting with UI elements

    /**
     * Runs when the play button is clicked.
     */
    function playButton() {
        let melodyClone = $state.snapshot(melodyInfo.melody);
        playMelody(melodyClone);
    }

    /**
     * Runs when the clear button is clicked.
     */
    function clearButton() {
        melodyInfo.melody = [0, 0, 0, 0, 0, 0, 0, 0];
        melodyInfo.title = "";
        melodyInfo.composer = defaultComposer;
        melodyInfo.modifiable = true;
    }


    // Run this code on page load
    getCollection()
</script>


<main>
    <h2>make a melody</h2>
    <div id="melody-maker">
        <div id="melody">
            <button id="play" onclick={playButton} disabled={interfaceInfo.currentlyPlaying}>▶</button>
            {#each {length: 8}, index}
                <NoteInput {index} />
            {/each}
        </div>
        <div id="instructions">
            1-8 are the notes of the major scale, 0 is silence.<br>
            write your melody, give it a title, and submit it to the collection.
        </div>
        <div id="details">
            <button id="clear" onclick={clearButton}>clear</button>
            <label for="title-input">melody title:</label> <input type="text" id="title-input" bind:value={melodyInfo.title} disabled={!melodyInfo.modifiable}>
            <label for="composer-input">composer:</label> <input type="text" id="composer-input" bind:value={melodyInfo.composer} disabled>
            <button id="submit" disabled={!userInfo.loggedIn || !melodyInfo.modifiable}>submit</button>
        </div>
    </div>
    <h2>collection</h2>
    <div id="show-user-collection-div">
        <input type="checkbox" id="show-user-collection" disabled={!userInfo.loggedIn}> <label for="show-user-collection">only show your collection</label>
    </div>
    <div id="collection">
        {#each collection as melody}
            <CollectionItem melody={melody} />
        {:else}
            <p>nothing here yet...</p>
        {/each}
    </div>
</main>