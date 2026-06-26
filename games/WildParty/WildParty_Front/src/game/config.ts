export default {
	"providerName": "sample_provider",
	"gameName": "wild_party",
	"gameID": "WildParty",
	"rtp": 0.96,
	"numReels": 5,
	"numRows": [
		3,
		3,
		3,
		3,
		3
	],
	"betModes": {
		"base": {
			"cost": 1.0,
			"feature": true,
			"buyBonus": false,
			"rtp": 0.96,
			"max_win": 5000.0
		},
		"bonus": {
			"cost": 100.0,
			"feature": false,
			"buyBonus": true,
			"rtp": 0.96,
			"max_win": 5000.0
		},
		"bonus_quick": {
			"cost": 50.0,
			"feature": false,
			"buyBonus": true,
			"rtp": 0.96,
			"max_win": 5000.0
		},
		"bonus_super": {
			"cost": 200.0,
			"feature": false,
			"buyBonus": true,
			"rtp": 0.96,
			"max_win": 5000.0
		}
	},
	"paylines": {
		"1": [
			1,
			1,
			1,
			1,
			1
		],
		"2": [
			0,
			0,
			0,
			0,
			0
		],
		"3": [
			2,
			2,
			2,
			2,
			2
		],
		"4": [
			0,
			1,
			2,
			1,
			0
		],
		"5": [
			2,
			1,
			0,
			1,
			2
		],
		"6": [
			1,
			0,
			0,
			0,
			1
		],
		"7": [
			1,
			2,
			2,
			2,
			1
		],
		"8": [
			0,
			0,
			1,
			2,
			2
		],
		"9": [
			2,
			2,
			1,
			0,
			0
		],
		"10": [
			1,
			2,
			1,
			0,
			1
		],
		"11": [
			1,
			0,
			1,
			2,
			1
		],
		"12": [
			0,
			1,
			1,
			1,
			0
		],
		"13": [
			2,
			1,
			1,
			1,
			2
		],
		"14": [
			0,
			1,
			0,
			1,
			0
		],
		"15": [
			2,
			1,
			2,
			1,
			2
		],
		"16": [
			1,
			1,
			0,
			1,
			1
		],
		"17": [
			1,
			1,
			2,
			1,
			1
		],
		"18": [
			0,
			0,
			2,
			0,
			0
		],
		"19": [
			2,
			2,
			0,
			2,
			2
		],
		"20": [
			0,
			2,
			0,
			2,
			0
		],
		"21": [
			2,
			0,
			2,
			0,
			2
		],
		"22": [
			1,
			0,
			1,
			0,
			1
		],
		"23": [
			1,
			2,
			1,
			2,
			1
		],
		"24": [
			0,
			1,
			2,
			2,
			2
		],
		"25": [
			2,
			1,
			0,
			0,
			0
		],
		"26": [
			0,
			2,
			2,
			2,
			0
		],
		"27": [
			2,
			0,
			0,
			0,
			2
		],
		"28": [
			1,
			0,
			2,
			0,
			1
		],
		"29": [
			1,
			2,
			0,
			2,
			1
		],
		"30": [
			0,
			2,
			1,
			2,
			0
		],
		"31": [
			2,
			0,
			1,
			0,
			2
		],
		"32": [
			0,
			0,
			1,
			0,
			0
		],
		"33": [
			2,
			2,
			1,
			2,
			2
		],
		"34": [
			1,
			1,
			2,
			0,
			1
		],
		"35": [
			1,
			1,
			0,
			2,
			1
		]
	},
	"symbols": {
		"S": {
			"paytable": null,
			"special_properties": [
				"scatter"
			]
		},
		"L3": {
			"paytable": [
				{
					"3": 0.1
				},
				{
					"4": 0.3
				},
				{
					"5": 0.7
				}
			]
		},
		"H3": {
			"paytable": [
				{
					"3": 0.3
				},
				{
					"4": 1.3
				},
				{
					"5": 3.9
				}
			]
		},
		"W": {
			"paytable": [
				{
					"3": 1.5
				},
				{
					"4": 15.4
				},
				{
					"5": 46.3
				}
			],
			"special_properties": [
				"wild"
			]
		},
		"L2": {
			"paytable": [
				{
					"3": 0.2
				},
				{
					"4": 0.5
				},
				{
					"5": 1.5
				}
			]
		},
		"H1": {
			"paytable": [
				{
					"3": 0.8
				},
				{
					"4": 7.7
				},
				{
					"5": 23.1
				}
			]
		},
		"H4": {
			"paytable": [
				{
					"3": 0.3
				},
				{
					"4": 1.0
				},
				{
					"5": 3.1
				}
			]
		},
		"H2": {
			"paytable": [
				{
					"3": 0.8
				},
				{
					"4": 3.9
				},
				{
					"5": 11.6
				}
			]
		},
		"L4": {
			"paytable": [
				{
					"3": 0.1
				},
				{
					"4": 0.3
				},
				{
					"5": 0.5
				}
			]
		},
		"L1": {
			"paytable": [
				{
					"3": 0.2
				},
				{
					"4": 0.7
				},
				{
					"5": 2.1
				}
			]
		}
	},
	"paddingReels": {
		"basegame": [
			[
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L3"
				},
				{
					"name": "L1"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H3"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H1"
				},
				{
					"name": "W"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "W"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "W"
				},
				{
					"name": "H2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L3"
				},
				{
					"name": "H3"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "W"
				},
				{
					"name": "H4"
				},
				{
					"name": "H3"
				},
				{
					"name": "H1"
				},
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				}
			],
			[
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L3"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H2"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L1"
				},
				{
					"name": "W"
				},
				{
					"name": "H4"
				},
				{
					"name": "H3"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H1"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "L4"
				},
				{
					"name": "L1"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H1"
				},
				{
					"name": "H4"
				},
				{
					"name": "H2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L1"
				},
				{
					"name": "H2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				}
			],
			[
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L1"
				},
				{
					"name": "L3"
				},
				{
					"name": "W"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "H3"
				},
				{
					"name": "L1"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "L1"
				},
				{
					"name": "H3"
				},
				{
					"name": "L3"
				},
				{
					"name": "W"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "H3"
				},
				{
					"name": "H1"
				},
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L3"
				},
				{
					"name": "W"
				},
				{
					"name": "H3"
				},
				{
					"name": "L1"
				},
				{
					"name": "H2"
				},
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "H4"
				},
				{
					"name": "L1"
				},
				{
					"name": "H2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H3"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "H1"
				},
				{
					"name": "W"
				},
				{
					"name": "H4"
				},
				{
					"name": "H3"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "S"
				},
				{
					"name": "H2"
				},
				{
					"name": "L4"
				},
				{
					"name": "H1"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "H2"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				}
			],
			[
				{
					"name": "L4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H1"
				},
				{
					"name": "L2"
				},
				{
					"name": "W"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "L1"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "L4"
				},
				{
					"name": "W"
				},
				{
					"name": "H1"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				},
				{
					"name": "L1"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "L3"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "W"
				},
				{
					"name": "H4"
				},
				{
					"name": "H3"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "H1"
				},
				{
					"name": "W"
				},
				{
					"name": "H4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L2"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H3"
				},
				{
					"name": "W"
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "H2"
				},
				{
					"name": "S"
				},
				{
					"name": "H1"
				},
				{
					"name": "H2"
				}
			],
			[
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L1"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "H3"
				},
				{
					"name": "S"
				},
				{
					"name": "H2"
				},
				{
					"name": "L1"
				},
				{
					"name": "S"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "W"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "W"
				},
				{
					"name": "H2"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "L1"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "H2"
				},
				{
					"name": "H1"
				},
				{
					"name": "S"
				},
				{
					"name": "L1"
				},
				{
					"name": "L2"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H4"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "H1"
				},
				{
					"name": "W"
				},
				{
					"name": "H2"
				},
				{
					"name": "L1"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L2"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H2"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H1"
				},
				{
					"name": "H3"
				}
			]
		],
		"freegame": [
			[
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				}
			],
			[
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				}
			],
			[
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "S"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				}
			],
			[
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "S"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				}
			],
			[
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "S"
				},
				{
					"name": "L4"
				},
				{
					"name": "L4"
				},
				{
					"name": "S"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S"
				},
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "S"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "W"
				},
				{
					"name": "W"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S"
				},
				{
					"name": "H4"
				},
				{
					"name": "H4"
				},
				{
					"name": "S"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "S"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "S"
				}
			]
		]
	}
};
