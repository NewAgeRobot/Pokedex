//Example fetch using pokemonapi.co
const synth = window.speechSynthesis;
document.querySelector('button').addEventListener('click', fetchPokemon)
let dword;
function fetchPokemon(){
  const choice = document.querySelector('input').value.toLowerCase()
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        pullAndPlugDetails(data);
        fetchPokeDesc();
      })
      .catch(err => {
          console.log(`error ${err}`)
          alert("No Pokemon found, please try again");
      });
}

function fetchPokeDesc(){
  const chosenSpecies = document.querySelector('input').value
  const url = 'https://pokeapi.co/api/v2/pokemon-species/'+chosenSpecies

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        let desc = getDesc(data.flavor_text_entries);
        readEntry(desc);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function pullAndPlugDetails(data){
  document.querySelector("#sprite").src = data.sprites.front_default;
  let height = ((data.height/10)*3);
  let heightFixed = height.toFixed(1);
  document.querySelector("#height").innerText = `${heightFixed}"`;
  let weight = (data.weight/10);
  let weightFixed = weight.toFixed(1);
  document.querySelector("#weight").innerText = `${weightFixed} kg`;
}

function getDesc(flavourTexts){
  let enEntries = flavourTexts.filter(val => {
    if(val.language.name === "en") return true;
  });
  let stripOut = enEntries[0].flavor_text.replace(/\n/g, ' ');
  console.log(stripOut);
  return stripOut;
}

function readEntry(desc){
   let readDesc = new SpeechSynthesisUtterance(desc);

   synth.speak(readDesc);
}