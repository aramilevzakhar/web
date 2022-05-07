// global variables
let run; 
let _quest = document.querySelector('#quest'); 
let _title = document.querySelector('#title');
let _help = document.querySelector('#help'); 

// functions
const init = function () { 
  run = true; 
  _title.innerHTML = es.title;
  _help.innerHTML = 'Нажми на картинку для сброса';
  print_dialog(es.start); 
};

const print_dialog = function (post) { 
  document
    .querySelectorAll('.line') 
    .forEach(line => line.hidden = true); 

  let answers = es.dict[post]; 

  if (typeof answers === 'undefined') { 
    run = false; 
    _quest.innerHTML = `Вам подойдёт ${post.toUpperCase()}`; 
    document.getElementById('img').src = "./Файлы/Картинки/" + post + ".jpg";
  }
  else {
    if (answers.length === 0) { 
      run = false; 
      _quest.innerHTML = `Для категории "${post}" нет выбора.`;
    }
    else {  
      _quest.innerHTML = `${post}`;  
      answers
        .forEach((answer, index) => {
          document.querySelector('#answer' + String(index)).innerHTML = answer;
          document.querySelector('.line' + String(index)).hidden = false;
        });
    }
  }
}

// event handlers
document 
  .addEventListener("DOMContentLoaded", init); 
  //.addEventListener("DOMContentLoaded", alert("Привет"));

document 
  .querySelectorAll('#dialog .answer') 
  .forEach(td_answer => { 
    td_answer.addEventListener("click", () => { 
			console.log(td_answer.innerHTML);
			print_dialog(td_answer.innerHTML);
		}); 
    td_answer.addEventListener('mouseenter', () => td_answer.style.backgroundColor = "#48f3ac");
    td_answer.addEventListener('mouseleave', () => td_answer.style.backgroundColor = "#ffffff");
  });
