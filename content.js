
	const q_images = {
		q1: {
			img:"1.png",
      id: "img-1",
      alt: "A white curtain beside a white wall with light leaking through the curtains."
			},
		q2: {
			img:"2.png",
			id: "img-2",
      alt: "A close-up of the reflection of illuminated buildings present on wet, brown pavement."
			},
		q3: {
			img:"3.png",
			id: "img-3",
      alt: "A white coffee cup sitting on a shelf with items strewn about: a stuffed animal, string, postcards, stickers, a pen, and a sweater."
			},
		q4: {
			img:"4.png",
			id: "img-4",
      alt: "A keychain of an illustrated koala with leaves in its mouth and in its hand. Beneath the koala is the text 'me.jpg' with additional info about the image."
			},
		q5: {
			img:"5.png",
			id: "img-5",
      alt: "An illustration of an automatic faucet with two emoji hands beneath it."
			},
		q6: {
			img:"6.png",
			id: "img-6",
      alt: "A photo of someone's reflection in the corner of a bus window."
			},
		q7: {
			img:"7.png",
			id: "img-7",
      alt: "An assembled Popin' Cookin' Summer Desserts DIY kit."
			},
		q8: {
			img:"8.png",
			id: "img-8",
      alt: "A pink toy balloon dog."
			},
		q9: {
			img:"9.png",
			id: "img-9",
      alt: "A screenshot of search history for 'cinderella mice names'."
			},
		q10: {
			img:"10.png",
			id: "img-10",
      alt: "The Vancouver skyline as seen from Kitsilano Beach at night."
			}
};

const q_titles = {
  q1: "⏰ wakeup",
  q2: "🌧️ puddle",
  q3: "☕️ coffee",
  q4: "👀 waiting",
  q5: "🚰 faucet",
  q6: "🚌 reflection",
  q7: "🥧 recipe",
  q8: "🧸 balloon dog",
  q9: "📱 brushing",
  q10: "🛌 sleep"
}

const q_descriptions = {
q1: "<a href='https://tiffanyq.github.io/sunrise/' target='_blank'>good morning</a>. it's a work day! you wake up to your alarm, which was set to:",
q2: "you put on your rain boots and head for the bus stop. along the way, you approach a shallow puddle.",
q3: "now at work, you brew a cup of coffee to start off the day. you take your first sip:",
q4: "lunch time! you wait for your friend outside. your phone is in your pocket. the road is remarkably calm today. the hum of passing traffic soothes you, reminds you of <a href='https://www.oceanorlaptopfan.com/' target='_blank'>the ocean</a>. in front of you, a <a href='https://tiffanyq.github.io/thats-enough-touching-grass-for-today/' target='_blank'>grass patch</a> dances. <br><br> you tilt your gaze upward and see your friend heading directly toward you. they're still a block away and haven't made eye contact with you yet. it will probably take them another minute to arrive.",
q5: "the <a href='https://tiffanyq.github.io/automatic-sink/' target='_blank'>automatic faucet</a> in the work bathroom just isn't working today!",
q6: "on your <a href='https://tiffanyq.github.io/commute/' target='_blank'>commute</a> home, you see your <a href='https://tiffanyq.github.io/smiley/' target='_blank'>reflection</a> in the bus window.",
q7: "you are making something new for dinner tonight: a pie! you looked at many recipes to prepare for this moment. <a href='https://closethistab.com/' target='_blank'>lots of open tabs</a>! to make this pie, you:",
q8: "while tidying up the living room after dinner, you notice your toy balloon dog, nobie, sitting on the window ledge. he's watching the <a href='https://tiffanyq.github.io/sunset/' target='_blank'>sunset</a>. that's new. a friend must have taken nobie from the stuffed animal pile in the corner and placed him by the window during board games night.",
q9: "time to brush your teeth!",
q10: "another day has gone by. you <a href='https://tiffanyq.github.io/beach/' target='_blank'>scroll</a> on your phone for a while. eventually, it's time. you turn off the lights and get into bed."
}; 
const q_choices = {
	q1: {
		choice0: "7:00am",
		choice1: "7:14am"
	},
	q2: {
		choice0: "go around the puddle",
		choice1: "go straight through the puddle"
	},
	q3: {
		choice0: "immediately",
		choice1: "after getting to your desk"
	},
	q4: {
		choice0: "take out your phone and check your messages",
		choice1: "continue observing your surroundings until you or your friend wave hello"
	},
	q5: {
		choice0: "wave your hands around until the faucet turns on",
		choice1: "immediately try a different sink"
	},
	q6: {
		choice0: "stare into your reflection",
		choice1: "look away"
	},
	q7: {
		choice0: "follow one recipe",
		choice1: "synthesize all the recipes you viewed and freestyle the pie off of vibes"
	},
	q8: {
		choice0: "put nobie back into the stuffed animal pile",
		choice1: "nobie is watching every sunset from that ledge from now on"
	},
	q9: {
		choice0: "go on your phone",
		choice1: "do not go on your phone"
	},
	q10: {
		choice0: "close your eyes",
		choice1: "stare into the darkness for a bit before trying to sleep"
	}
};