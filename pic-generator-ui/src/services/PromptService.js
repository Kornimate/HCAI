export default function GeneratePromptFromArrayOfInstructions(instructions, positions){
    const instructionArray = Object.values(instructions);
    
    let prompt = "Use the input image as a base. Apply the following modifications precisely at the specified coordinates (origin at top-left corner, x increases to the right, y increases downward): ";
    
    for(let i=0; i<instructionArray.length; i++){
        prompt += "" + (i+1) + ". " + instructionArray[i] + " at (x: "+ Math.floor(positions[i].x) + ", y: " + Math.floor(positions[i].y) + ", width: " + Math.floor(positions[i].width) + ", height: " + Math.floor(positions[i].height) + "). ";
    }

    console.log(prompt);
    return prompt;
}