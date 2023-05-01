let typeEctoplasma=['Spectre','Poison'];

// Définition des objets Pokémon
let Nidorino = {
    name: 'Nidorino',
    type: 'Poison',
    level: 34,
    hp: 120,
    attack: 72,
    defense: 57,
    speed: 65
}

let Ectoplasma = {
    name: 'Ectoplasma',
    type: typeEctoplasma,
    level: 10,
    hp: 125,
    attack: 65,
    defense: 60,
    speed: 110
}

// Définition des objets d'attaque
let Picpic = {
    name: 'Picpic',
    power: 35,
    accuracy: 100,
    type: 'Vol'
}
let KoudKorne = {
    name: "Koud'Korne",
    power: 65,
    accuracy: 100,
    type: 'Normal'
}
let DardVenin={
    name: "Dard-Venin",
    power: 35,
    accuracy: 100,
    type: 'Poison'
}
let Telluriforce={
    name: "Telluriforce",
    power: 90,
    accuracy: 100,
    type: 'Sol'
}

// Fonction pour calculer les dégâts d'une attaque
function calculateDamage(attacker, defender, attack) {
    const typeBonus = getTypeBonus(attack.type, defender.type)
    const randomFactor = Math.random() * 0.15 + 0.85 // facteur aléatoire entre 0.85 et 1
    const baseDamage = Math.floor((2 * attacker.level / 5 + 2) * attack.power * (attacker.attack / defender.defense) / 50 + 2)
    const damage = Math.floor(baseDamage * typeBonus * randomFactor)
    return damage
}
