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
                {
                    hp: 108,
                    atk: 130,
                    def: 95,
                    speAtk: 80,
                    speDef: 85,
                    speed: 102
                },
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
                new Item(
                    583,
                    "rocky-helmet",
                    "Held: When the holder is hit by a contact move, the attacking Pokémon takes 1/6 its max HP in damage."
                )
            )
        ],
        "un socketid"
    ),
    p2: new Player(
        "p2name",
        [
            new Pokemon(
                "gliscor",
                {
                    hp: 75,
                    atk: 95,
                    def: 125,
                    speAtk: 45,
                    speDef: 75,
                    speed: 95
                },
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
                        355,
                        "roost",
                        "status",
                        "The user lands and rests its body. This move restores\nthe user’s HP by up to half of its max HP.",
                        null,
                        null,
                        10,
                        0,
                        "user",
                        "flying"
                    ),
                    new Move(
                        282,
                        "knock-off",
                        "physical",
                        "The user slaps down the target’s held item, and that\nitem can’t be used in that battle. The move does\nmore damage if the target has a held item.",
                        65,
                        100,
                        20,
                        0,
                        "selected-pokemon",
                        "dark"
                    ),
                ],
                new Ability(
                    90,
                    "poison-heal",
                    "Restores HP if the Pokémon is poisoned instead of\nlosing HP."
                ),
                new Item(
                    249,
                    "toxic-orb",
                    "Held: Inflicts Toxic on the holder at the end of the turn. Activates after Poison damage would occur."
                )
            )
        ],
        "un socketid"
    ),
}