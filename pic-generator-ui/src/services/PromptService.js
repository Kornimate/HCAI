export default function GeneratePromptJSONFromArrayOfInstructions(instructions, positions){
    return JSON.stringify({
        instructions: instructions,
        positions: positions
    })
}