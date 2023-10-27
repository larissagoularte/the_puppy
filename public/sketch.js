let puppyData;
let WIDTH;
let HEIGHT;
let feedButton;
let petButton;
let waterButton;

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);

  loadPuppyData();

  img = loadImage('assets/puppy.jpg');

  //feed puppy
  feedButton = createButton('Feed');
  feedButton.position(WIDTH/2 - (110), HEIGHT - 100);

  feedButton.mousePressed(feed)
 
  //pet puppy
  petButton = createButton('Pet');
  petButton.position(WIDTH/2 - (30), HEIGHT - 100);

  petButton.mousePressed(pet)

  //give water to puppy
  waterButton = createButton('Give Water');
  waterButton.position(WIDTH/2 + (40), HEIGHT - 100);

  waterButton.mousePressed(water)

}

function loadPuppyData() {
  loadJSON('/puppy', (data) => {
    puppyData = data;
  });
}

function draw() {
  background('#fffff');
  if (puppyData) {
    push()
    textSize(30)
    fill('blue')
    text(`${puppyData.name}`, WIDTH/2 - (30), 50);
    pop()
    text(`Hunger: ${puppyData.hunger}`, WIDTH/2 - (110), 80);
    text(`Thirst: ${puppyData.thirst}`, WIDTH/2 - (30), 80);
    text(`Happiness: ${puppyData.happy}`, WIDTH/2 + (40) , 80);
  }

  image(img, WIDTH/2 - (200), HEIGHT/6, 400, 400)
}

function feed(){

  const updateUrl = '/updateHunger';
  if(puppyData.hunger === 0){
    reset();
  } else{
  const data = {
    name: puppyData.name,
    newHungerValue: puppyData.hunger - 10,
  };

  fetch(updateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Hunger updated: ',result);
      puppyData.hunger = data.newHungerValue;
    })
    
    .catch(error => {
      console.error('Error: ', error);
    });
  }
}

function pet(){
  const updateUrl = '/updateHappy';
  if(puppyData.happy===100){
    reset();
  }else{
  const data = {
    name: puppyData.name,
    newHappyValue: puppyData.happy + 10,
  };

  fetch(updateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Happiness updated: ',result);
      puppyData.happy = data.newHappyValue;
    })
    
    .catch(error => {
      console.error('Error: ', error);
    });
  }
}

function water(){
  const updateUrl = '/updateThirst';

  if(puppyData.thirst === 0){
    reset();
  } else{
  const data = {
    name: puppyData.name,
    newThirstValue: puppyData.thirst - 10
  }

  fetch(updateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
      console.log('Thirst updated: ',result);
      puppyData.thirst = data.newThirstValue;
    })
    
    .catch(error => {
      console.error('Error: ', error);
    });
  }
}

function reset(){
  fetch('/resetPuppy', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(result => {
      console.log('Puppy reset successfully:', result);
      puppyData.happy = 50;
      puppyData.hunger = 50;
      puppyData.thirst = 50;
    })
    .catch(error => {
      console.error('Error puppy values:', error);
    });

  resetButton.remove();
}