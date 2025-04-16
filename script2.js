const gameArea = document.getElementById("game-area");
const scoreElement = document.getElementById("score");
const progressBar = document.querySelector(".progress");
let score = 0;
let giftInterval;

function spawnGift() {
    if (score >= 10) return;

    const gift = document.createElement("div");
    gift.classList.add("gift");
    gift.textContent = "🎁"; // Birthday gift symbol
    gift.style.left = `${Math.random() * 90}vw`;
    gift.style.top = `-50px`;

    gift.addEventListener("click", () => {
        score++;
        scoreElement.textContent = score;
        progressBar.style.width = `${(score / 10) * 100}%`;
        gift.remove();

        if (score === 10) {
            // Add countdown message
            let countdown = 5;
            const countdownMessage = document.createElement("div");
            countdownMessage.style.position = "fixed";
            countdownMessage.style.top = "50%";
            countdownMessage.style.left = "50%";
            countdownMessage.style.transform = "translate(-50%, -50%)";
            countdownMessage.style.fontSize = "24px";
            countdownMessage.style.color = "#ff0066";
            countdownMessage.style.fontWeight = "bold";
            document.body.appendChild(countdownMessage);

            const countdownInterval = setInterval(() => {
                countdownMessage.textContent = `Congratulations! 🎉🎁\n Moving to the next level in ${countdown} seconds...`;
                countdown--;

                if (countdown < 0) {
                    clearInterval(countdownInterval);
                    window.location.href = "flowers.html";
                }
            }, 1000);
        }
    });

    gameArea.appendChild(gift);

    setTimeout(() => {
        gift.remove();
    }, 4000);
}

giftInterval = setInterval(spawnGift, 1000);

// Particles in the background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 2,
        speedY: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
    };
}

for (let i = 0; i < 50; i++) {
    particles.push(createParticle());
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let particle of particles) {
        ctx.fillStyle = `rgba(255, 0, 100, ${particle.opacity})`;
        ctx.font = `${particle.size}px Arial`;
        ctx.fillText("🎁", particle.x, particle.y); // Replace heart with gift
        particle.y -= particle.speedY;

        if (particle.y < -10) {
            particle.y = canvas.height;
            particle.x = Math.random() * canvas.width;
        }
    }

    requestAnimationFrame(drawParticles);
}

drawParticles();
