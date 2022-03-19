// GLOBAL VARIABLES //
const form = document.getElementById('form');
const list = document.getElementById('list');

// CLASS //
class Awesome {
  constructor() {
    this.data = {};
    this.record = [];
  }

  addRecord(title, author) {
    this.data = { title, author };
    this.record.push(this.data);
    return this.data;
  }

  local() {
    localStorage.setItem('books', JSON.stringify(this.record));
    this.returnInfo();
  }

  returnInfo() {
    list.innerHTML = '';
    this.record = JSON.parse(localStorage.getItem('books'));
    if (this.record === null) {
      this.record = [];
    } else {
      let count = 0;
      this.record.forEach((element) => {
        count += 1;
        function color(counter) {
          let change;
          if (counter % 2 !== 0) {
            change = 'newColor';
            return change;
          }
          change = 'old';
          return change;
        }
        list.innerHTML += `
          <div id="books" class = "${color(count)}">
            <div class="bTitle">${element.title}</div>
            <div class="by">by</div>
            <div class="bAuthor">${element.author}</div>
            <button class="delete">Remove</button>
          </div>
          `;
      });
    }
  }

  eliminate(title, author) {
    let indexArray;
    this.record.forEach((element, index) => {
      if (element.title === title && element.author === author) {
        indexArray = index;
      }
    });
    this.record.splice(indexArray, 1);
    this.local();
  }
}

const awesome = new Awesome();

// EVEN LISTENERS //
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  if (title === '' || author === '') {
    alert('missing information');
  } else {
    awesome.addRecord(title, author);
    awesome.local();
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
});

list.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.innerHTML === 'Remove') {
    const eliminateBook = e.path[1].childNodes[1].childNodes[0].data;
    const eliminateAuthor = e.path[1].childNodes[3].childNodes[0].data;
    awesome.eliminate(eliminateBook, eliminateAuthor);
  }
});

// SECTIONS //

const change = (selection) => {
  const bookList = document.getElementById('bookList');
  const contact = document.querySelector('.contact');
  switch (selection) {
    case 'List':
      bookList.classList.remove('hidden');
      form.classList.add('hidden');
      contact.classList.add('hidden');
      break;
    case 'Add new':
      bookList.classList.add('hidden');
      form.classList.remove('hidden');
      contact.classList.add('hidden');
      break;
    case 'Contact':
      bookList.classList.add('hidden');
      form.classList.add('hidden');
      contact.classList.remove('hidden');
      break;
    default:
      bookList.classList.remove('hidden');
      form.classList.add('hidden');
      contact.classList.add('hidden');
  }
};

const links = document.querySelector('.links');
links.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'List' || e.target.innerHTML === 'Add new' || e.target.innerHTML === 'Contact') {
    const selection = e.target.innerHTML;
    change(selection);
  }
});

// Date section //

const currentDate = new Date();

const currentMonth = currentDate.getMonth();
let actualDate = currentDate.getDate();
const year = currentDate.getFullYear();
const time = currentDate.toLocaleTimeString();

const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = monthArray[currentMonth];

switch (actualDate) {
  case 1:
  case 21:
  case 31:
    actualDate += 'st';
    break;
  case 2:
  case 22:
    actualDate += 'nd';
    break;
  case 3:
  case 23:
    actualDate += 'rd';
    break;
  default:
    actualDate += 'th';
}

const date = (`${month} ${actualDate} ${year}, ${time}`);

const topDate = document.querySelector('.date');
topDate.textContent = date;

// event when the page loads //
document.addEventListener('DOMContentLoaded', awesome.returnInfo(), change());