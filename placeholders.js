const Player = require('./models/Player');
const Pokemon = require('./models/Pokemon');
const Move = require('./models/Move');
const Ability = require('./models/Ability');
const Item = require('./models/Item');

module.exports = {
    p1: new Player(
        "p1name",
        [
            new Pokemon(
                "garchomp",
                [
                    new Move(
                        89,
                        "earthquake",
                        "physical",
                        "The user sets off an earthquake that strikes every\nPokémon around it.",
                        100,
                        100,
                        10,
                        0,
                        "all-other-pokemon",
                        "ground"
                    ),
                    new Move(
                        14,
                        "swords-dance",
                        "status",
                        "A frenetic dance to uplift the fighting spirit.\nThis sharply raises the user’s Attack stat.",
                        null,
                        null,
                        20,
                        0,
                        "user",
                        "normal"
                    ),
                    new Move(
                        444,
                        "stone-edge",
                        "physical",
                        "The user stabs the target from below with\nsharpened stones. Critical hits land more easily.",
                        100,
                        80,
                        5,
                        0,
                        "selected-pokemon",
                        "rock"
                    ),
                    new Move(
                        92,
                        "toxic",
                        "status",
                        "A move that leaves the target badly poisoned.\nIts poison damage worsens every turn.",
                        null,
                        90,
                        10,
                        0,
                        "selected-pokemon",
                        "poison"
                    ),
                ],
                new Ability(
                    24,
                    "rough-skin",
                    "Damages attacking Pokémon for 1/8 their max HP on contact."
                ),
                new Ability(
                    583,
                    "rocky-helmet",
                    "Held: When the holder is hit by a contact move, the attacking Pokémon takes 1/6 its max HP in damage."
                )
            )
        ],
        "un socketid"
    ),
    p2: new Player(
        
    ),
}