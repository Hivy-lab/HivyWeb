var fireworks = [];

var fireworkButton = document.getElementById('firework-button');

function FireAnimation() {
    console.log("Test");
    var fireworksCanvas = document.createElement('canvas');
    fireworksCanvas.classList.add("fireworksCanvas");
    fireworksCanvas.id = 'firework-canvas';
    document.body.appendChild(fireworksCanvas);

    var fireworksCtx = fireworksCanvas.getContext('2d');

    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    window.addEventListener('resize', function () {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    });

    function Particle(x, y, vx, vy, gravity, opacity, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.gravity = gravity;
        this.opacity = opacity;
        this.color = color;
    }

    Particle.prototype.update = function () {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.005;
    };

    Particle.prototype.draw = function (ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 5, 5);
    };

    function Firework(x, y, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.exploded = false;
        this.particles = [];
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';

        for (var i = 0; i < 100; i++) {
            var speed = Math.random() * 5 + 1;
            var angle = Math.random() * Math.PI * 2;
            var vx = Math.cos(angle) * speed;
            var vy = Math.sin(angle) * speed;

            this.particles.push(new Particle(this.x, this.y, vx, vy, 0.1, 1, this.color));
        }
    }

    Firework.prototype.update = function () {
        if (!this.exploded) { // si le feu d'artifice n'a pas explosé
            this.y -= 20; // faites monter le feu d'artifice en diminuant sa position y
            if (this.y <= window.innerHeight / 2) { // si le feu d'artifice atteint une certaine hauteur
                this.exploded = true; // le feu d'artifice a explosé
                for (var i = 0; i < 100; i++) { // créer des particules pour l'explosion
                    var speed = Math.random() * 10 + 5;
                    var angle = Math.random() * Math.PI * 2;
                    var vx = Math.cos(angle) * speed;
                    var vy = Math.sin(angle) * speed;

                    this.particles.push(new Particle(this.x, this.y, vx, vy, 0.1, 1, this.color));
                }
            }
        } else { // si le feu d'artifice a explosé
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].opacity <= 0) {
                    this.particles.splice(i, 1);
                }
            }
        }
    };

    Firework.prototype.draw = function (ctx) {
        if (this.exploded) { // si le feu d'artifice a explosé
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].draw(ctx);
            }
        } else { // si le feu d'artifice n'a pas explosé
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    };


    fireworks.push(new Firework(Math.random() * fireworksCanvas.width, fireworksCanvas.height));

    function animate() {
        fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        for (var i = 0; i < fireworks.length; i++) {
            fireworks[i].update();
            fireworks[i].draw(fireworksCtx);
            if (fireworks[i].particles.length === 0) {
                fireworks.splice(i, 1);
            }
        }

        if (fireworks.length < 10) { // limit to 10 fireworks at a time
            fireworks.push(new Firework(Math.random() * fireworksCanvas.width, fireworksCanvas.height));
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Remove canvas after 3 seconds
    setTimeout(function () {
        document.body.removeChild(fireworksCanvas);
        fireworkButton.removeEventListener('click', FireAnimation);
    }, 4000);
}

fireworkButton.addEventListener('click', FireAnimation);