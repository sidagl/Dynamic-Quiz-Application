// Main quiz logic with animations, splash, shuffle, theme, progress bar
let filteredQuestions = [];
let currentIndex = 0;
let userAnswers = [];
let questionStartTs = null;
let remainingSec = 0;
let timerInterval = null;

const categorySelect = document.getElementById('categorySelect');
const difficultySelect = document.getElementById('difficultySelect');
const startBtn = document.getElementById('startBtn');

const landing = document.getElementById('landing');
const quizSection = document.getElementById('quizSection');
const resultSection = document.getElementById('resultSection');

const qIndex = document.getElementById('qIndex');
const timerEl = document.getElementById('timer');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const questionContainer = document.getElementById('questionContainer');

const progressFill = document.getElementById('progressFill');

const splash = document.getElementById('splash');
const app = document.getElementById('app');
const themeToggle = document.getElementById('themeToggle');

function init(){
  // splash
  app.setAttribute('aria-hidden', 'true');
  setTimeout(()=>{ splash.style.display='none'; app.setAttribute('aria-hidden','false'); }, 700);

  // categories
  categorySelect.innerHTML = '';
  let allOpt = document.createElement('option');
  allOpt.value = 'all'; allOpt.textContent='All';
  categorySelect.appendChild(allOpt);

  CATEGORIES.forEach(c=>{
    let o = document.createElement('option');
    o.value = c; o.textContent = capitalize(c); categorySelect.appendChild(o);
  });

  // theme init
  const stored = localStorage.getItem('frugal_theme');
  if(stored === 'dark'){ document.body.classList.add('dark'); themeToggle.checked = true; }
  themeToggle.addEventListener('change', e=>{
    if(themeToggle.checked){ document.body.classList.add('dark'); localStorage.setItem('frugal_theme','dark'); }
    else{ document.body.classList.remove('dark'); localStorage.setItem('frugal_theme','light'); }
  });
}

function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

startBtn.addEventListener('click', ()=>{
  const cat = categorySelect.value;
  const diff = difficultySelect.value;

  // filter first
  let pool = QUIZ_QUESTIONS.filter(q=>{
    if(cat !== 'all' && q.category !== cat) return false;
    if(diff && q.difficulty !== diff) return false;
    return true;
  });
  if(pool.length === 0){ alert('No questions found for selected filters. Choose All or different difficulty.'); return; }

  // shuffle questions (Fisher-Yates)
  filteredQuestions = shuffleArray(pool.slice());

  // shuffle options per question and maintain mapping to correct answer
  filteredQuestions = filteredQuestions.map(q => {
    const options = q.options.map((opt, idx) => ({opt, idx}));
    const shuffled = shuffleArray(options);
    const newAnswerIndex = shuffled.findIndex(o => o.idx === q.answerIndex);
    return {
      ...q,
      options: shuffled.map(o => o.opt),
      answerIndex: newAnswerIndex
    };
  });

  currentIndex = 0;
  userAnswers = filteredQuestions.map(q => ({qid: q.id, selectedIndex: null, timeTaken: 0}));
  landing.classList.add('hidden'); quizSection.classList.remove('hidden'); resultSection.classList.add('hidden');

  renderQuestion(true);
});

// Fisher-Yates shuffle
function shuffleArray(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

function renderQuestion(first=false){
  clearTimer();
  const q = filteredQuestions[currentIndex];
  qIndex.textContent = `Question ${currentIndex+1} / ${filteredQuestions.length}`;
  // animate out old content if not first
  const qb = document.getElementById('questionBox');
  qb.classList.remove('show');
  qb.classList.add('slide-out');
  setTimeout(()=>{
    // populate content
    questionText.textContent = q.question;
    optionsList.innerHTML = '';
    q.options.forEach((opt, idx)=>{
      const li = document.createElement('li');
      li.textContent = opt;
      li.dataset.idx = idx;
      li.setAttribute('role','listitem');
      if(userAnswers[currentIndex].selectedIndex === idx) li.classList.add('selected');
      li.addEventListener('click', ()=>{
        const elapsed = Math.round((Date.now() - questionStartTs)/1000);
        userAnswers[currentIndex].timeTaken += elapsed;
        userAnswers[currentIndex].selectedIndex = idx;
        [...optionsList.children].forEach(c=>c.classList.remove('selected'));
        li.classList.add('selected');
      });
      optionsList.appendChild(li);
    });

    // animate in
    qb.classList.remove('slide-out');
    qb.classList.add('slide-in');
    setTimeout(()=> qb.classList.add('show'), 40);

    // update nav button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === filteredQuestions.length -1;

    // start timer and progress
    remainingSec = q.timeLimitSec || 15;
    startTimer(remainingSec);
    questionStartTs = Date.now();
  }, 220);
}

function startTimer(sec){
  updateTimerDisplay(sec);
  updateProgressBar(1); // full
  const total = sec;
  let elapsed = 0;
  timerInterval = setInterval(()=>{
    elapsed++;
    const rem = Math.max(0, total - elapsed);
    remainingSec = rem;
    updateTimerDisplay(rem);
    updateProgressBar((rem)/total);
    if(rem <= 0){
      // time's up
      userAnswers[currentIndex].timeTaken += Math.round((Date.now() - questionStartTs)/1000);
      clearTimer();
      if(currentIndex < filteredQuestions.length - 1){
        currentIndex++; renderQuestion();
      } else {
        finishQuiz();
      }
    }
  }, 1000);
}

function updateTimerDisplay(sec){
  const s = sec % 60; const m = Math.floor(sec / 60);
  timerEl.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function updateProgressBar(ratio){
  ratio = Math.max(0, Math.min(1, ratio));
  progressFill.style.width = `${Math.round(ratio*100)}%`;
}

function clearTimer(){
  if(timerInterval){ clearInterval(timerInterval); timerInterval = null; }
  questionStartTs = Date.now();
}

prevBtn.addEventListener('click', ()=>{
  userAnswers[currentIndex].timeTaken += Math.round((Date.now() - questionStartTs)/1000);
  if(currentIndex > 0){ currentIndex--; renderQuestion(); }
});
nextBtn.addEventListener('click', ()=>{
  userAnswers[currentIndex].timeTaken += Math.round((Date.now() - questionStartTs)/1000);
  if(currentIndex < filteredQuestions.length -1){ currentIndex++; renderQuestion(); }
});
submitBtn.addEventListener('click', ()=>{
  userAnswers[currentIndex].timeTaken += Math.round((Date.now() - questionStartTs)/1000);
  if(!confirm('Submit quiz now?')) return;
  finishQuiz();
});

function finishQuiz(){
  clearTimer();
  quizSection.classList.add('hidden'); resultSection.classList.remove('hidden');

  let correct=0, incorrect=0;
  const labels=[]; const timeData=[]; const breakdownHtml=[];

  filteredQuestions.forEach((q,i)=>{
    const ua = userAnswers[i];
    const isCorrect = ua.selectedIndex === q.answerIndex;
    if(isCorrect) correct++; else incorrect++;
    labels.push(`Q${i+1}`); timeData.push(ua.timeTaken || 0);
    breakdownHtml.push(`<div><strong>Q${i+1}:</strong> ${q.question}<br>
      <strong>Your:</strong> ${ua.selectedIndex===null?'<em>Unanswered</em>':q.options[ua.selectedIndex]} |
      <strong>Correct:</strong> ${q.options[q.answerIndex]} |
      <strong>Time:</strong> ${ua.timeTaken || 0}s</div><hr>`);
  });

  const total = filteredQuestions.length;
  const scoreText = document.getElementById('scoreText');
  scoreText.innerHTML = `<strong>Score:</strong> ${correct} / ${total} (${Math.round((correct/total)*100)}%)<br/>
    <strong>Correct:</strong> ${correct} &nbsp; <strong>Incorrect:</strong> ${incorrect}`;

  document.getElementById('breakdown').innerHTML = breakdownHtml.join('');

  const ctx1 = document.getElementById('answersChart').getContext('2d');
  if(window.answersChart) window.answersChart.destroy();
  window.answersChart = new Chart(ctx1, {
    type: 'doughnut',
    data: { labels:['Correct','Incorrect'], datasets:[{ data:[correct,incorrect] }]},
    options:{ responsive:true }
  });

  const ctx2 = document.getElementById('timeChart').getContext('2d');
  if(window.timeChart) window.timeChart.destroy();
  window.timeChart = new Chart(ctx2, {
    type:'bar',
    data:{ labels:labels, datasets:[{ label:'Time (s)', data:timeData }]},
    options:{ responsive:true, scales:{ y:{ beginAtZero:true } } }
  });

  localStorage.setItem('frugal_quiz_result', JSON.stringify({timestamp:Date.now(), total, correct, incorrect, details:userAnswers}));
}

restartBtn.addEventListener('click', ()=>{
  landing.classList.remove('hidden'); quizSection.classList.add('hidden'); resultSection.classList.add('hidden');
});

init();
