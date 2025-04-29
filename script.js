// WAVY TEXT ANIMATION
function updateText(text) {
  const delay = 200;
  const h1 = document.getElementById("animated");

  h1.innerHTML = text
    .split("")
    .map(letter => `<span>${letter}</span>`)
    .join("");

  Array.from(h1.children).forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("wavy");
    }, index * 60 + delay);
  });
}

// Set the animated text
updateText("Click");

// INTRO INTERACTION
const audio = document.getElementById('bg-music');
const intro = document.getElementById('intro-screen');

intro.addEventListener('click', () => {
  // Start background music
  audio.play().catch(err => console.error('Playback failed:', err));
  // Fade out intro screen
  intro.classList.add('hidden');
});

// RAIN EFFECT
const numDrops = 500;
const container = document.body;

for (let i = 0; i < numDrops; i++) {
  const drop = document.createElement('div');
  drop.classList.add('raindrop');
  drop.style.left = `${Math.random() * 100}vw`;
  drop.style.top = `${-Math.random() * 100}px`;
  drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
  drop.style.animationDelay = `${Math.random() * 2}s`;
  container.appendChild(drop);
}


// ADD ROSES AROUND SCREEN
const roseCount = 15;
const roseContainer = document.querySelector('.roses-container');

for (let i = 0; i < roseCount; i++) {
  const rose = document.createElement('img');
  rose.src = 'Images/rose.png';
  rose.classList.add('rose');
  rose.style.left = `${Math.random() * 100}vw`;
  rose.style.top = `${Math.random() * 100}vh`;
  rose.style.width = `${40 + Math.random() * 30}px`;
  rose.style.animationDelay = `${Math.random() * 4}s`;
  roseContainer.appendChild(rose);
}

// Make the birthday header wavy
function animateBirthdayHeader(text) {
  const header = document.getElementById('birthday-header');
  header.innerHTML = text
    .split("")
    .map(letter => {
      if (letter === " ") return " "; // keep spaces normal
      return `<span>${letter}</span>`;
    })
    .join("");

// Add delay between each letter's animation
  Array.from(header.children).forEach((span, index) => {
    span.style.animationDelay = `${index * 0.1}s`;
  });
}

// Call the function
animateBirthdayHeader("Happy Birthday my love ❤️");


const letters = document.querySelectorAll(".letter");
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const shuffledThings = Array.from(letters);
shuffleArray(shuffledThings);

shuffledThings.forEach((letter) => {
  lettersContainer.appendChild(letter);
  const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
  letter.style.left = `${center}px`;

  function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  if (!isOverflown(letter)) {
    letter.classList.add("center");
  }
  let offsetX, offsetY;
  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") {
      const rect = e.target.getBoundingClientRect();

      letter.style.position = "fixed";
      letter.style.left = `${rect.left}px`;
      letter.style.top = `${rect.top}px`;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      letter.style.zIndex = zIndexCounter++;
      const moveAt = (posX, posY) => {
        letter.style.left = `${posX - offsetX}px`;
        letter.style.top = `${posY - offsetY}px`;
      };
      const onMouseMove = (moveEvent) => moveAt(moveEvent.clientX, moveEvent.clientY);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });
});
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) {
      letter.style.display = "none";
    }
  });
});