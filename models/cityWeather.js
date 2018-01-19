'use strict';

var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var cityweatherSchema = new mongoose.Schema({
  // name    :          { type: String, trim: true },
  // editOn  : 				 { type: Date, default: Date.now }

  name: 				{ type: String, trim: true },
  	desc: 				{ type: String, trim: true },
	bannerLink: 		{ type: String, trim: true },
  	geospot: 			{ type: [Number], index: '2dsphere'},

	places : [{
		name: 			{ type: String, trim: true },
		desc: 			{ type: String, trim: true },
		imageLinks: 	[{ type: String, trim: true }],
		geospot: 		{type: [Number], index: '2dsphere'},
		quickFacts: 	[{type: String, trim: true }],
	}],

  quickFacts: 			[{type: String, trim: true }],

  // editBy: 				{ type: Schema.Types.ObjectId, ref: 'User' },
  editOn: 				{ type: Date, default: Date.now }
});

module.exports = mongoose.model('cityWeather', cityweatherSchema,'cityWeather');
