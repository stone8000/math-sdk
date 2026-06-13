export default {
	"reveal": {
		"type": "reveal",
		"board": [
			[
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
				}
			],
			[
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
				}
			],
			[
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
					"name": "S",
					"scatter": true
				},
				{
					"name": "L3"
				}
			],
			[
				{
					"name": "W",
					"wild": true
				},
				{
					"name": "L2"
				},
				{
					"name": "L1"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "L2"
				}
			],
			[
				{
					"name": "L1"
				},
				{
					"name": "L4"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "L3"
				},
				{
					"name": "H3"
				}
			]
		],
		"paddingPositions": [
			27,
			41,
			53,
			52,
			5
		],
		"gameType": "basegame",
		"anticipation": [
			0,
			0,
			0,
			0,
			1
		]
	},
	"setTotalWin": {
		"type": "setTotalWin",
		"amount": 0
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
				"row": 3
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
		"globalMult": 2
	},
	"winInfo": {
		"type": "winInfo",
		"totalWin": 360,
		"wins": [
			{
				"symbol": "H4",
				"kind": 3,
				"win": 120,
				"positions": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 1
					}
				],
				"meta": {
					"lineIndex": 20,
					"multiplier": 4,
					"winWithoutMult": 30,
					"globalMult": 4,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "H4",
				"kind": 3,
				"win": 120,
				"positions": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					}
				],
				"meta": {
					"lineIndex": 26,
					"multiplier": 4,
					"winWithoutMult": 30,
					"globalMult": 4,
					"lineMultiplier": 1
				}
			},
			{
				"symbol": "H4",
				"kind": 3,
				"win": 120,
				"positions": [
					{
						"reel": 0,
						"row": 1
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
					"lineIndex": 30,
					"multiplier": 4,
					"winWithoutMult": 30,
					"globalMult": 4,
					"lineMultiplier": 1
				}
			}
		]
	},
	"setWin": {
		"type": "setWin",
		"amount": 360,
		"winLevel": 4
	},
	"freeSpinRetrigger": {
		"type": "freeSpinRetrigger",
		"totalFs": 10,
		"positions": [
			{
				"reel": 2,
				"row": 1
			},
			{
				"reel": 3,
				"row": 3
			},
			{
				"reel": 4,
				"row": 1
			}
		]
	},
	"freeSpinEnd": {
		"type": "freeSpinEnd",
		"amount": 1410,
		"winLevel": 4
	},
	"finalWin": {
		"type": "finalWin",
		"amount": 1410
	},
	"wincap": {
		"type": "wincap",
		"amount": 500000
	}
};
