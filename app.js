// ===================== Belajar Kata — Oxford 3000 Quiz =====================
// Data kata sudah tersedia lewat WORD_DATA (dari words_data.js)
// Direction: "id-en" artinya soal Bahasa Indonesia -> jawaban Bahasa Inggris
//            "en-id" artinya soal Bahasa Inggris -> jawaban Bahasa Indonesia

const QUIZ_LENGTH = 15;
const NUM_OPTIONS = 5;

let state = {
  direction: 'id-en',
  level: null,
  pool: [],        // shuffled subset of words for this quiz session
  index: 0,
  good: 0,
  bad: 0,
  answered: false,
  currentOptions: [],
  currentCorrectIdx: -1
};

// ---------- helpers ----------
function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(level, correctWord, count){
  const pool = WORD_DATA[level];
  const key = state.direction === 'id-en' ? 'en' : 'id';
  const used = new Set([correctWord[key]]);
  const candidates = shuffle(pool);
  const result = [];
  for(const w of candidates){
    if(result.length >= count) break;
    if(used.has(w[key])) continue;
    used.add(w[key]);
    result.push(w[key]);
  }
  return result;
}

function speak(text, lang){
  if(!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.92;
  window.speechSynthesis.speak(utter);
}

// ---------- screens ----------
const screens = {
  home: document.getElementById('homeScreen'),
  quiz: document.getElementById('quizScreen'),
  result: document.getElementById('resultScreen')
};

function showScreen(name){
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('hidden', key !== name);
  });
}

// ---------- home screen ----------
const dirIDEN = document.getElementById('dirIDEN');
const dirENID = document.getElementById('dirENID');

dirIDEN.addEventListener('click', () => {
  state.direction = 'id-en';
  dirIDEN.classList.add('active');
  dirENID.classList.remove('active');
});
dirENID.addEventListener('click', () => {
  state.direction = 'en-id';
  dirENID.classList.add('active');
  dirIDEN.classList.remove('active');
});

document.querySelectorAll('.level-card').forEach(card => {
  card.addEventListener('click', () => {
    startQuiz(card.dataset.level);
  });
});

document.getElementById('homeBtn').addEventListener('click', () => {
  window.speechSynthesis && window.speechSynthesis.cancel();
  showScreen('home');
});

document.getElementById('backHomeBtn').addEventListener('click', () => {
  showScreen('home');
});

document.getElementById('retryBtn').addEventListener('click', () => {
  startQuiz(state.level);
});

// ---------- quiz flow ----------
function startQuiz(level){
  state.level = level;
  const all = shuffle(WORD_DATA[level]);
  state.pool = all.slice(0, Math.min(QUIZ_LENGTH, all.length));
  state.index = 0;
  state.good = 0;
  state.bad = 0;

  const chip = document.getElementById('quizLevelChip');
  chip.textContent = level;
  chip.className = 'level-chip ' + level.toLowerCase();

  updateScoreRow();
  showScreen('quiz');
  renderQuestion();
}

function updateScoreRow(){
  document.getElementById('scoreGood').textContent = state.good;
  document.getElementById('scoreBad').textContent = state.bad;
  document.getElementById('quizCounter').textContent = `${state.index + 1}/${state.pool.length}`;
  const pct = (state.index / state.pool.length) * 100;
  document.getElementById('progressBar').style.width = pct + '%';
}

function renderQuestion(){
  state.answered = false;
  const word = state.pool[state.index];
  const isIdToEn = state.direction === 'id-en';

  const questionText = isIdToEn ? word.id : word.en;
  const correctAnswer = isIdToEn ? word.en : word.id;

  document.getElementById('questionLabel').textContent = isIdToEn
    ? 'Apa Bahasa Inggrisnya?'
    : 'Apa artinya dalam Bahasa Indonesia?';
  document.getElementById('questionWord').textContent = questionText;

  // speaker button: always speaks the English side of the word pair
  const speakBtn = document.getElementById('speakMain');
  speakBtn.style.display = isIdToEn ? 'none' : 'flex'; // for en->id, question itself is English, show speaker
  speakBtn.onclick = () => speak(word.en, 'en-US');

  // build options
  const distractors = pickDistractors(state.level, word, NUM_OPTIONS - 1);
  const optionTexts = shuffle([correctAnswer, ...distractors]);
  state.currentCorrectIdx = optionTexts.indexOf(correctAnswer);
  state.currentOptions = optionTexts;

  const list = document.getElementById('optionsList');
  list.innerHTML = '';
  const letters = ['A','B','C','D','E'];

  optionTexts.forEach((text, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `
      <span class="letter">${letters[i]}</span>
      <span class="opt-text">${escapeHtml(text)}</span>
    `;
    // if id->en, options are English words -> add small speaker per option
    if(isIdToEn){
      const sp = document.createElement('span');
      sp.className = 'speak-btn small';
      sp.title = 'Dengarkan';
      sp.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;
      sp.addEventListener('click', (e) => {
        e.stopPropagation();
        speak(text, 'en-US');
      });
      btn.appendChild(sp);
    }
    btn.addEventListener('click', () => selectOption(i));
    list.appendChild(btn);
  });

  document.getElementById('feedbackBanner').className = 'feedback-banner';
  document.getElementById('feedbackBanner').textContent = '';
  document.getElementById('nextBtn').classList.remove('show');

  updateScoreRow();
}

function selectOption(i){
  if(state.answered) return;
  state.answered = true;

  const options = document.querySelectorAll('.option');
  const correct = i === state.currentCorrectIdx;

  options.forEach((el, idx) => {
    el.classList.add('disabled');
    if(idx === state.currentCorrectIdx) el.classList.add('correct');
    if(idx === i && !correct) el.classList.add('wrong');
  });

  const banner = document.getElementById('feedbackBanner');
  if(correct){
    state.good++;
    banner.className = 'feedback-banner show good';
    banner.textContent = '✅ Benar! Mantap!';
  }else{
    state.bad++;
    banner.className = 'feedback-banner show bad';
    const word = state.pool[state.index];
    const correctText = state.direction === 'id-en' ? word.en : word.id;
    banner.textContent = `❌ Kurang tepat. Jawaban benar: ${correctText}`;
  }

  updateScoreRow();
  document.getElementById('nextBtn').classList.add('show');
}

document.getElementById('nextBtn').addEventListener('click', () => {
  state.index++;
  if(state.index >= state.pool.length){
    finishQuiz();
  }else{
    renderQuestion();
  }
});

function finishQuiz(){
  window.speechSynthesis && window.speechSynthesis.cancel();
  const total = state.good + state.bad;
  const pct = total ? Math.round((state.good / total) * 100) : 0;

  document.getElementById('resultGood').textContent = state.good;
  document.getElementById('resultBad').textContent = state.bad;
  document.getElementById('resultPct').textContent = pct + '%';

  let emoji = '🎉', title = 'Kuis Selesai!', subtitle = 'Kerja bagus, terus semangat belajar!';
  if(pct >= 90){ emoji='🏆'; title='Luar Biasa!'; subtitle='Kosakatamu makin kuat, pertahankan!'; }
  else if(pct >= 70){ emoji='🎉'; title='Kerja Bagus!'; subtitle='Sedikit lagi menuju sempurna.'; }
  else if(pct >= 50){ emoji='💪'; title='Terus Berlatih!'; subtitle='Ulangi lagi supaya makin hafal.'; }
  else{ emoji='🌱'; title='Jangan Menyerah!'; subtitle='Ulangi levelnya, kamu pasti bisa!'; }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultSubtitle').textContent = subtitle;

  showScreen('result');
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- init: fill actual word counts ----------
(function initCounts(){
  Object.keys(WORD_DATA).forEach(level => {
    const el = document.querySelector(`[data-count="${level}"]`);
    if(el) el.textContent = `${WORD_DATA[level].length} kata`;
  });
})();
