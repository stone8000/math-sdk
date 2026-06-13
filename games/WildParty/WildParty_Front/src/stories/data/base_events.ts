export default {
	"reveal": {
		"type": "reveal",
		"board": [
			[
				{
					"name": "H1"
				},
				{
					"name": "H3"
				},
				{
					"name": "W",
					"wild": true
				},
				{
					"name": "H2"
				},
				{
					"name": "L2"
				}
			],
			[
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
				}
			],
			[
				{
					"name": "H3"
				},
				{
					"name": "L3"
				},
				{
					"name": "W",
					"wild": true
				},
				{
					"name": "H1"
				},
				{
					"name": "L4"
				}
			],
			[
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
					"name": "W",
					"wild": true
				},
				{
					"name": "L3"
				}
			],
			[
				{
					"name": "L4"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "L2"
				},
				{
					"name": "H4"
				},
				{
					"name": "S",
					"scatter": true
				}
			]
		],
		"paddingPositions": [
			40,
			54,
			14,
			45,
			21
		],
		"gameType": "basegame",
		"anticipation": [
			0,
			0,
			0,
			0,
			0
		]
	},
	"winInfo": {
		"type": "winInfo",
		"totalWin": 270,
		"wins": [
			{
				"symbol": "L3",
				"kind": 3,
				"win": 10,
				"positions": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 2
					}
				],
				"meta": {
					"lineIndex": 1,
					"multiplier": 1,
					"winWithoutMult": 10,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "L1",
				"kind": 3,
				"win": 20,
				"positions": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					}
				],
				"meta": {
					"lineIndex": 10,
					"multiplier": 1,
					"winWithoutMult": 20,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "H4",
				"kind": 4,
				"win": 100,
				"positions": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"meta": {
					"lineIndex": 11,
					"multiplier": 1,
					"winWithoutMult": 100,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "L3",
				"kind": 3,
				"win": 10,
				"positions": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					}
				],
				"meta": {
					"lineIndex": 16,
					"multiplier": 1,
					"winWithoutMult": 10,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "H4",
				"kind": 3,
				"win": 30,
				"positions": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 2
					}
				],
				"meta": {
					"lineIndex": 22,
					"multiplier": 1,
					"winWithoutMult": 30,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "L1",
				"kind": 4,
				"win": 70,
				"positions": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 2
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"meta": {
					"lineIndex": 23,
					"multiplier": 1,
					"winWithoutMult": 70,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "L3",
				"kind": 4,
				"win": 30,
				"positions": [
					{
						"reel": 0,
						"row": 2
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					},
					{
						"reel": 3,
						"row": 3
					}
				],
				"meta": {
					"lineIndex": 35,
					"multiplier": 1,
					"winWithoutMult": 30,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			}
		]
	},
	"setWin": {
		"type": "setWin",
		"amount": 270,
		"winLevel": 4
	},
	"setTotalWin": {
		"type": "setTotalWin",
		"amount": 270
	},
	"finalWin": {
		"type": "finalWin",
		"amount": 270
	},
	"freeSpinTrigger": {
		"type": "freeSpinTrigger",
		"totalFs": 5,
		"positions": [
			{
				"reel": 2,
				"row": 3
			},
			{
				"reel": 3,
				"row": 1
			},
			{
				"reel": 4,
				"row": 2
			}
		]
	},
	"updateFreeSpin": {
		"type": "updateFreeSpin",
		"amount": 0,
		"total": 5
	},
	"updateGlobalMult": {
		"type": "updateGlobalMult",
		"globalMult": 3
	},
	"freeSpinEnd": {
		"type": "freeSpinEnd",
		"amount": 320,
		"winLevel": 2
	},
	"freeSpinRetrigger": {
		"type": "freeSpinRetrigger",
		"totalFs": 10,
		"positions": [
			{
				"reel": 2,
				"row": 3
			},
			{
				"reel": 3,
				"row": 2
			},
			{
				"reel": 4,
				"row": 3
			}
		]
	},
	"wincap": {
		"type": "wincap",
		"amount": 500000
	}
};
