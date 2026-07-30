const myName = "Hunter Baldwin";
const canvas = document.getElementById('static-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawStatic() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 255;
        imageData.data[i] = value;     // Red
        imageData.data[i + 1] = value; // Green
        imageData.data[i + 2] = value; // Blue
        imageData.data[i + 3] = 255;   // Alpha
    }
    ctx.putImageData(imageData, 0, 0);
}

setInterval(drawStatic, 100);

// Typewriter effect
const typewriter = document.getElementById('typewriter');

let prevTimeout;
function typeLetters(name) {
    clearTimeout(prevTimeout);
    return (idx) => {
        if (idx < name.length) {
            typewriter.textContent = name.substring(0, idx + 1);
            prevTimeout = setTimeout(() => typeLetters(name)(++idx), 100);
            return prevTimeout;
        }

        prevTimeout = null;
        return null;
    }
}

window.addEventListener('load', () => {
    if (document.getElementById('home').classList.contains('active')) {
        typeLetters(myName)(0);
    }

    const footer = document.getElementById('footer-text');
    // get the current year
    const year = new Date().getFullYear();
    footer.innerHTML = `&copy; ${year} ${myName}`;

    const hash = window.location.hash.substring(1);
    if (hash) {
        const section = document.getElementById(hash);
        if (section) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            section.classList.add('active');
        }
    }

});

const navLinks = document.querySelectorAll('nav a');
const pages = document.querySelectorAll('.page');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');

        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        if (sectionId === 'home') {
            typewriter.textContent = '';
            typeLetters(myName)(0);
        }

        window.location.hash = sectionId;
    });
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!document.body.classList.contains('no-animations')) {
            card.classList.add('glitch');
        }
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('glitch');
    });
});
