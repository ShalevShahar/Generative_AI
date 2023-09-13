


// Sample list of national soccer teams
const nationalTeams = [
    "Argentina",
    "Brazil",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "England",
    "Portugal",
    // Add more national teams as needed
];

// Function to populate a <select> element with options
function populateSelectElement(selectId, options) {
    const select = document.getElementById(selectId);
    for (const optionText of options) {
        const option = document.createElement("option");
        option.value = optionText.toLowerCase(); // Use lowercase as the value
        option.text = optionText;
        select.appendChild(option);
    }
}

// Populate the select elements with national teams
populateSelectElement("team1", nationalTeams);
populateSelectElement("team2", nationalTeams);

// Function to get predictions when the button is clicked
document.getElementById("predict-button").addEventListener("click", function() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;

    // Call a function to fetch predictions here
    getPrediction(team1, team2);
});




function getPrediction(team1, team2) {
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions'; // Specify the model here

    const prompt = `Guess the score of an imaginary soccer match between ${team1} and ${team2}. 
    Provide a short explanation and a fun fact about something imaginary and funny that happened game. don't use the term 'imaginary' in your answer.`;

    // Make an API request to your generative AI model with the prompt and model specified
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt,
            max_tokens: 150, // Adjust the max tokens based on the desired response length
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Extract and display the generated text (score prediction, explanation, fun fact)
        const generatedText = data.choices[0].text;
        displayPrediction(generatedText);
    })
    .catch(error => {
        console.error('Error fetching prediction:', error);
        // Handle the error and display an error message to the user
        displayPrediction('An error occurred while fetching the prediction.');
    });
}








// Function to display prediction results
function displayPrediction(result) {
    const predictionDiv = document.getElementById('prediction');
    predictionDiv.innerHTML = `<p>Predicted Score: ${result}</p>`;
}
