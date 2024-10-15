particlesJS("particles-js", {
	"particles": {
		"number": {
			"value": 110,
			"density": {
				"enable": true,
				"value_area": 630
			}
		},
		"color": {
			"value": "#ffffff"
		},
		"shape": {
			"type": "circle", // Keep as circle for bubbles
		},
		"opacity": {
			"value": 0.5,
			"random": false,
		},
		"size": {
			"value": 20, // Increased size for a bubble effect
			"random": true, // Make size random to simulate bubbles
		},
		"line_linked": {
			"enable": false // Disable lines to enhance the bubble effect
		},
		"move": {
			"enable": true,
			"speed": 2, // Slow down movement for a gentle floating effect
			"direction": "none",
			"random": false,
			"straight": false,
			"out_mode": "out",
			"bounce": false,
		}
	},
	"interactivity": {
		"detect_on": "canvas",
		"events": {
			"onhover": {
				"enable": true, // Enable hover interaction
				"mode": "bubble" // Use bubble mode on hover
			},
			"onclick": {
				"enable": true,
				"mode": "push"
			},
			"resize": true
		},
		"modes": {
			"bubble": {
				"distance": 400,
				"size": 10,
				"duration": 2,
				"opacity": 3.5,
				"speed": 3
			},
			"push": {
				"particles_nb": 4
			},
			"remove": {
				"particles_nb": 2
			}
		}
	},
	"retina_detect": true
});

var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
	stats.begin();
	stats.end();
	if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
		count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
	}
	requestAnimationFrame(update);
};
requestAnimationFrame(update);
