const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li'); //list item
  
  const span = document.createElement('span'); //text container
  span.textContent = text;

  const chk = document.createElement('input');
  chk.type = 'checkbox';
  chk.addEventListener('change', () => {
    if (chk.checked) span.classList.add('done');
    else span.classList.remove('done');
  });



  //const del = document.createElement('button');
  //del.textContent = 'Delete';
  //del.className = 'small-btn';
  //del.addEventListener('click', () => li.remove());

  li.appendChild(chk);
  li.appendChild(span);
  //li.appendChild(del);
  list.appendChild(li);

  input.value = '';
}

addBtn.addEventListener('click', addTask);