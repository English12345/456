// ===================== Belajar Kata — Oxford 3000 Quiz =====================
// Data kata sudah tersedia lewat WORD_DATA (dari words_data.js)
// Direction: "id-en" artinya soal Bahasa Indonesia -> jawaban Bahasa Inggris
//            "en-id" artinya soal Bahasa Inggris -> jawaban Bahasa Indonesia
//
// Progres disimpan di localStorage per pasangan kata (level + en), lepas dari arah soal:
//   status "mastered"  -> kata sudah dikuasai, tidak muncul lagi di kuis utama
//   status "remedial"  -> kata pernah dijawab salah, masuk kartu Latihan Ulang
//                         sampai berhasil dijawab benar 7x BERTURUT-TURUT (streak).
//                         Sekali salah lagi, streak balik ke 0.

const NUM_OPTIONS = 5;
const MASTERY_STREAK = 7;
const STORAGE_KEY = 'belajarKata_progress_v1';
const STATS_KEY = 'belajarKata_stats_v1'; // riwayat total jawaban benar/salah sepanjang waktu
const COMFORT_KEY = 'belajarKata_comfort_v1';
const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2'];

// Audio hening berdurasi singkat, diputar loop selama mode "Bacakan" aktif.
// Trik ini membantu browser (terutama Android Chrome) memperlakukan tab sebagai
// sesi pemutaran media aktif, sehingga suara pembacaan lebih tahan saat layar
// terkunci/mati. Ini best-effort — perilaku akhir tetap bergantung pada OS/browser.
const SILENT_AUDIO_SRC = 'data:audio/wav;base64,UklGRqQlAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YYAlAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA=';

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

let remedialState = {
  pool: [],         // [{level, word, streak}]
  index: 0,
  total: 0,         // jumlah kartu unik di awal sesi (untuk progress bar)
  answered: false
};

// ---------- progress storage ----------
function loadProgress(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    console.warn('Gagal membaca progres, mulai dari kosong.', e);
    return {};
  }
}

function saveProgress(progress){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }catch(e){
    console.warn('Gagal menyimpan progres.', e);
  }
}

function ensureLevel(progress, level){
  if(!progress[level]) progress[level] = {};
  return progress[level];
}

function markMastered(level, en){
  const p = loadProgress();
  ensureLevel(p, level)[en] = { status: 'mastered' };
  saveProgress(p);
}

function markRemedial(level, en, streak){
  const p = loadProgress();
  ensureLevel(p, level)[en] = { status: 'remedial', streak: streak || 0 };
  saveProgress(p);
}

function getWordStatus(level, en){
  const p = loadProgress();
  return (p[level] && p[level][en]) || null;
}

// jumlah kata yang sudah "tuntas" (mastered) di sebuah level
function countMastered(level){
  const p = loadProgress();
  const lv = p[level] || {};
  return Object.values(lv).filter(v => v.status === 'mastered').length;
}

function countRemedial(level){
  const p = loadProgress();
  const lv = p[level] || {};
  return Object.values(lv).filter(v => v.status === 'remedial').length;
}

function countRemedialAll(){
  return Object.keys(WORD_DATA).reduce((sum, lv) => sum + countRemedial(lv), 0);
}

// kata yang belum pernah dijawab benar & belum masuk remedial -> pool kuis utama
function buildMainPool(level){
  const p = loadProgress();
  const lv = p[level] || {};
  return WORD_DATA[level].filter(w => !lv[w.en]);
}

function buildRemedialPool(){
  const p = loadProgress();
  const list = [];
  Object.keys(WORD_DATA).forEach(level => {
    const lv = p[level] || {};
    WORD_DATA[level].forEach(w => {
      const st = lv[w.en];
      if(st && st.status === 'remedial'){
        list.push({ level, word: w, streak: st.streak || 0 });
      }
    });
  });
  return list;
}

// ---------- lifetime stats (total jawaban benar/salah, terpisah dari status mastery) ----------
function loadStats(){
  try{
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : { totalCorrect: 0, totalWrong: 0, byLevel: {} };
  }catch(e){
    console.warn('Gagal membaca statistik, mulai dari kosong.', e);
    return { totalCorrect: 0, totalWrong: 0, byLevel: {} };
  }
}

function saveStats(stats){
  try{
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }catch(e){
    console.warn('Gagal menyimpan statistik.', e);
  }
}

// dipanggil setiap kali user menjawab (baik di kuis utama maupun flashcard remedial)
function recordAttempt(level, correct){
  const s = loadStats();
  if(!s.byLevel[level]) s.byLevel[level] = { correct: 0, wrong: 0 };
  if(correct){
    s.totalCorrect++;
    s.byLevel[level].correct++;
  }else{
    s.totalWrong++;
    s.byLevel[level].wrong++;
  }
  saveStats(s);
}

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

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- viewport height fix (mobile address bar) ----------
function setVh(){
  document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
}
setVh();
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);

// ---------- mode nyaman mata (comfort/dark mode, minim cahaya biru & silau) ----------
function applyComfortMode(on){
  document.documentElement.setAttribute('data-theme', on ? 'comfort' : 'default');
  const btn = document.getElementById('comfortBtn');
  btn.classList.toggle('active-mode', on);
  btn.textContent = on ? '☀️' : '🌙';
  btn.title = on ? 'Mode Terang' : 'Mode Nyaman Mata';
}
let comfortOn = localStorage.getItem(COMFORT_KEY) === '1';
applyComfortMode(comfortOn);
document.getElementById('comfortBtn').addEventListener('click', () => {
  comfortOn = !comfortOn;
  localStorage.setItem(COMFORT_KEY, comfortOn ? '1' : '0');
  applyComfortMode(comfortOn);
});

// ---------- screens ----------
const screens = {
  home: document.getElementById('homeScreen'),
  quiz: document.getElementById('quizScreen'),
  remedial: document.getElementById('remedialScreen'),
  progress: document.getElementById('progressScreen'),
  result: document.getElementById('resultScreen')
};

function showScreen(name){
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('hidden', key !== name);
  });
  if(name === 'home') refreshHomeUI();
  if(name === 'progress') renderProgressScreen();
}

document.getElementById('progressBtn').addEventListener('click', () => {
  showScreen('progress');
});

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
  card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      card.click();
    }
  });
  card.addEventListener('click', () => {
    const level = card.dataset.level;
    const pool = buildMainPool(level);
    if(pool.length === 0){
      // semua kata di level ini sudah tuntas (mastered) — arahkan ke remedial kalau ada, atau kasih tahu.
      const rem = countRemedial(level);
      if(rem > 0){
        startRemedial();
      }else{
        alert('Level ' + level + ' sudah kamu kuasai semua! 🏆');
      }
      return;
    }
    startQuiz(level);
  });
});

document.getElementById('remedialBtn').addEventListener('click', () => {
  if(countRemedialAll() === 0) return;
  startRemedial();
});

document.getElementById('homeBtn').addEventListener('click', () => {
  if(!readerState.active){
    window.speechSynthesis && window.speechSynthesis.cancel();
  }
  showScreen('home');
});

document.getElementById('backHomeBtn').addEventListener('click', () => {
  showScreen('home');
});

document.getElementById('retryBtn').addEventListener('click', () => {
  // "Lanjut Belajar": kembali ke level yang sama kalau masih ada sisa, kalau tidak ke home
  if(state.level && buildMainPool(state.level).length > 0){
    startQuiz(state.level);
  }else{
    showScreen('home');
  }
});

function refreshHomeUI(){
  let totalMastered = 0, totalWords = 0;

  Object.keys(WORD_DATA).forEach(level => {
    const total = WORD_DATA[level].length;
    const mastered = countMastered(level);
    const remedial = countRemedial(level);
    totalMastered += mastered;
    totalWords += total;

    const countEl = document.querySelector(`[data-count="${level}"]`);
    if(countEl) countEl.textContent = `${mastered}/${total} kata`;

    const subEl = document.querySelector(`[data-remedial="${level}"]`);
    if(subEl){
      if(remedial > 0){
        subEl.textContent = `🔁 ${remedial} perlu diulang`;
        subEl.classList.remove('hidden');
      }else{
        subEl.classList.add('hidden');
      }
    }

    const doneEl = document.querySelector(`[data-done="${level}"]`);
    if(doneEl){
      doneEl.classList.toggle('hidden', !(mastered === total && remedial === 0));
    }
  });

  const subtitle = document.getElementById('brandSubtitle');
  subtitle.textContent = `${totalMastered.toLocaleString('id-ID')}/${totalWords.toLocaleString('id-ID')} kata dikuasai`;

  const remAllCount = countRemedialAll();
  const remBtn = document.getElementById('remedialBtn');
  const remBadge = document.getElementById('remedialBadge');
  remBadge.textContent = `${remAllCount} kata`;
  remBtn.classList.toggle('empty', remAllCount === 0);
}

// ---------- progress dashboard ----------
function renderProgressScreen(){
  const stats = loadStats();

  let totalWords = 0, totalMastered = 0, totalRemedial = 0;
  const perLevel = {};

  LEVEL_ORDER.forEach(level => {
    const total = WORD_DATA[level].length;
    const mastered = countMastered(level);
    const remedial = countRemedial(level);
    const untouched = total - mastered - remedial;
    perLevel[level] = { total, mastered, remedial, untouched };
    totalWords += total;
    totalMastered += mastered;
    totalRemedial += remedial;
  });
  const totalUntouched = totalWords - totalMastered - totalRemedial;
  const masteredPct = totalWords ? Math.round((totalMastered / totalWords) * 100) : 0;

  document.getElementById('progMasteredNum').textContent = totalMastered.toLocaleString('id-ID');
  document.getElementById('progTotalWords').textContent = totalWords.toLocaleString('id-ID');
  document.getElementById('progMasteredPct').textContent = `(${masteredPct}%)`;
  document.getElementById('progRemedialNum').textContent = totalRemedial.toLocaleString('id-ID');
  document.getElementById('progUntouchedNum').textContent = totalUntouched.toLocaleString('id-ID');

  const totalAttempts = stats.totalCorrect + stats.totalWrong;
  document.getElementById('progTotalCorrect').textContent = stats.totalCorrect.toLocaleString('id-ID');
  document.getElementById('progTotalWrong').textContent = stats.totalWrong.toLocaleString('id-ID');
  document.getElementById('progAccuracy').textContent = totalAttempts
    ? Math.round((stats.totalCorrect / totalAttempts) * 100) + '%'
    : '– (belum ada jawaban)';

  // level CEFR yang sedang dikerjakan: level pertama (urut A1->B2) yang belum 100% mastered
  let currentLevel = LEVEL_ORDER.find(lv => perLevel[lv].mastered < perLevel[lv].total);
  const cefrEmoji = document.getElementById('cefrEmoji');
  const cefrLevel = document.getElementById('cefrLevel');
  const cefrDesc = document.getElementById('cefrDesc');

  if(!currentLevel){
    cefrEmoji.textContent = '🏆';
    cefrLevel.textContent = 'Semua Level Tuntas!';
    cefrDesc.textContent = '3.308 kata Oxford 3000 sudah kamu kuasai semua.';
  }else{
    const lv = perLevel[currentLevel];
    const pct = lv.total ? Math.round((lv.mastered / lv.total) * 100) : 0;
    let emoji = '🌱', desc = 'Baru mulai level ini';
    if(pct >= 90){ emoji = '🔥'; desc = `Hampir tuntas — tinggal ${lv.total - lv.mastered} kata lagi`; }
    else if(pct >= 50){ emoji = '📘'; desc = `Sedang dipelajari, sudah ${pct}% dari level ini`; }
    else if(pct > 0){ emoji = '🌱'; desc = `Baru ${pct}% dari level ini, terus lanjut`; }
    cefrEmoji.textContent = emoji;
    cefrLevel.textContent = `Level saat ini: ${currentLevel}`;
    cefrDesc.textContent = desc;
  }

  // daftar progres per level
  const list = document.getElementById('levelProgressList');
  list.innerHTML = '';
  LEVEL_ORDER.forEach(level => {
    const lv = perLevel[level];
    const pct = lv.total ? Math.round((lv.mastered / lv.total) * 100) : 0;
    const levelNames = { A1: 'Pemula', A2: 'Dasar Lanjutan', B1: 'Menengah', B2: 'Menengah Atas' };

    const item = document.createElement('div');
    item.className = 'level-progress-item';
    item.innerHTML = `
      <div class="level-progress-head">
        <span>${level}<span class="lvl-name">${levelNames[level]}</span></span>
        <span>${pct}%</span>
      </div>
      <div class="level-progress-bar-outer">
        <div class="level-progress-bar-inner ${level.toLowerCase()}" style="width:${pct}%"></div>
      </div>
      <div class="level-progress-foot">
        <span>${lv.mastered}/${lv.total} kata dikuasai</span>
        ${lv.remedial > 0 ? `<span class="rem">🔁 ${lv.remedial} diulang</span>` : ''}
      </div>
    `;
    list.appendChild(item);
  });
}

// ---------- quiz flow (kuis utama, pilihan ganda) ----------
function startQuiz(level){
  stopReading();
  state.level = level;
  state.pool = shuffle(buildMainPool(level));
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

  const speakBtn = document.getElementById('speakMain');
  speakBtn.style.display = isIdToEn ? 'none' : 'flex';
  speakBtn.onclick = () => speak(word.en, 'en-US');

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
  document.getElementById('latihBtn').classList.remove('hidden');

  updateScoreRow();
}

function selectOption(i){
  if(state.answered) return;
  state.answered = true;
  document.getElementById('latihBtn').classList.add('hidden');

  const word = state.pool[state.index];
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
    markMastered(state.level, word.en);
    recordAttempt(state.level, true);
    banner.className = 'feedback-banner show good';
    banner.textContent = '✅ Benar! Mantap!';
  }else{
    state.bad++;
    markRemedial(state.level, word.en, 0);
    recordAttempt(state.level, false);
    banner.className = 'feedback-banner show bad';
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

// Tombol "Belum Tahu — Latih Kata Ini": dipakai saat sama sekali tidak tahu jawabannya.
// Kata langsung masuk daftar Latihan Ulang (remedial) tanpa perlu menebak pilihan ganda.
document.getElementById('latihBtn').addEventListener('click', () => {
  if(state.answered) return;
  state.answered = true;
  document.getElementById('latihBtn').classList.add('hidden');

  const word = state.pool[state.index];
  const options = document.querySelectorAll('.option');
  options.forEach((el, idx) => {
    el.classList.add('disabled');
    if(idx === state.currentCorrectIdx) el.classList.add('correct');
  });

  state.bad++;
  markRemedial(state.level, word.en, 0);
  recordAttempt(state.level, false);

  const banner = document.getElementById('feedbackBanner');
  banner.className = 'feedback-banner show bad';
  const correctText = state.direction === 'id-en' ? word.en : word.id;
  banner.textContent = `📌 Ditambahkan ke Latihan Ulang. Jawabannya: ${correctText}`;

  updateScoreRow();
  document.getElementById('nextBtn').classList.add('show');
});

function finishQuiz(){
  window.speechSynthesis && window.speechSynthesis.cancel();
  const total = state.good + state.bad;
  const pct = total ? Math.round((state.good / total) * 100) : 0;

  document.getElementById('resultStats').classList.remove('hidden');
  document.getElementById('resultGood').textContent = state.good;
  document.getElementById('resultBad').textContent = state.bad;
  document.getElementById('resultPct').textContent = pct + '%';

  let emoji = '🎉', title = 'Kuis Selesai!', subtitle = 'Kerja bagus, terus semangat belajar!';
  if(pct >= 90){ emoji='🏆'; title='Luar Biasa!'; subtitle='Kosakatamu makin kuat, pertahankan!'; }
  else if(pct >= 70){ emoji='🎉'; title='Kerja Bagus!'; subtitle='Sedikit lagi menuju sempurna.'; }
  else if(pct >= 50){ emoji='💪'; title='Terus Berlatih!'; subtitle='Kata yang salah sudah masuk Latihan Ulang.'; }
  else{ emoji='🌱'; title='Jangan Menyerah!'; subtitle='Kata yang salah sudah masuk Latihan Ulang.'; }

  if(state.bad > 0){
    subtitle += ` Ada ${state.bad} kata baru di Latihan Ulang.`;
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultSubtitle').textContent = subtitle;

  showScreen('result');
}

// ---------- remedial flow (flashcard, dengan jawaban diketik & dinilai otomatis) ----------
function startRemedial(){
  stopReading();
  remedialState.pool = shuffle(buildRemedialPool());
  remedialState.total = remedialState.pool.length;
  remedialState.index = 0;
  remedialState.answered = false;

  if(remedialState.pool.length === 0){
    showScreen('home');
    return;
  }

  showScreen('remedial');
  renderFlashcard();
}

function updateRemedialProgress(){
  document.getElementById('remedialCounter').textContent =
    `${remedialState.index + 1}/${remedialState.pool.length}`;
  const pct = (remedialState.index / remedialState.pool.length) * 100;
  document.getElementById('remedialProgressBar').style.width = pct + '%';
}

function renderStreakDots(streak){
  const wrap = document.getElementById('streakDots');
  wrap.innerHTML = '';
  for(let i = 0; i < MASTERY_STREAK; i++){
    const dot = document.createElement('div');
    dot.className = 'dot' + (i < streak ? ' filled' : '');
    wrap.appendChild(dot);
  }
}

// Menormalkan teks sebelum dibandingkan: huruf kecil, tanpa spasi berlebih,
// tanpa tanda baca, tanpa diakritik — supaya penilaian tidak terlalu kaku
// (mis. "Apple" / "apple " / "apple." semua dianggap sama).
function normalizeAnswer(str){
  return (str || '')
    .toString()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function renderFlashcard(){
  remedialState.answered = false;
  const item = remedialState.pool[remedialState.index];
  const isIdToEn = state.direction === 'id-en';
  const word = item.word;

  const questionText = isIdToEn ? word.id : word.en;
  const answerText = isIdToEn ? word.en : word.id;

  const chip = document.getElementById('remedialLevelChip');
  chip.textContent = item.level;
  chip.className = 'level-chip remedial-chip';

  document.getElementById('flashLabel').textContent = isIdToEn
    ? 'Ketik Bahasa Inggrisnya:'
    : 'Ketik artinya dalam Bahasa Indonesia:';
  document.getElementById('flashWord').textContent = questionText;
  document.getElementById('remStreak').textContent = item.streak;

  const speakBtn = document.getElementById('flashSpeak');
  speakBtn.style.display = isIdToEn ? 'none' : 'flex';
  speakBtn.onclick = (e) => {
    e.stopPropagation();
    speak(word.en, 'en-US');
  };

  const answerEl = document.getElementById('flashAnswer');
  answerEl.textContent = answerText;
  answerEl.classList.add('hidden');

  renderStreakDots(item.streak);

  const input = document.getElementById('remedialInput');
  input.value = '';
  input.disabled = false;
  input.classList.remove('correct', 'wrong');
  input.placeholder = isIdToEn ? 'Ketik dalam Bahasa Inggris…' : 'Ketik dalam Bahasa Indonesia…';

  document.getElementById('remedialFeedback').className = 'feedback-banner';
  document.getElementById('remedialFeedback').textContent = '';
  document.getElementById('checkAnswerBtn').classList.remove('hidden');
  document.getElementById('giveUpBtn').classList.remove('hidden');
  document.getElementById('remedialNextBtn').classList.remove('show');

  updateRemedialProgress();

  // fokuskan input supaya keyboard langsung siap dipakai (khususnya di HP)
  setTimeout(() => { try{ input.focus(); }catch(e){} }, 50);
}

function checkRemedialAnswer(forceEmpty){
  if(remedialState.answered) return;
  remedialState.answered = true;

  const item = remedialState.pool[remedialState.index];
  const isIdToEn = state.direction === 'id-en';
  const word = item.word;
  const correctAnswer = isIdToEn ? word.en : word.id;

  const input = document.getElementById('remedialInput');
  const typed = forceEmpty ? '' : input.value;
  if(forceEmpty) input.value = '';

  const typedNorm = normalizeAnswer(typed);
  const correct = typedNorm.length > 0 && typedNorm === normalizeAnswer(correctAnswer);

  input.disabled = true;
  input.classList.remove('correct', 'wrong');
  input.classList.add(correct ? 'correct' : 'wrong');

  document.getElementById('flashAnswer').classList.remove('hidden');

  const feedback = document.getElementById('remedialFeedback');
  if(correct){
    feedback.className = 'feedback-banner show good';
    feedback.textContent = '✅ Benar! Mantap!';
  }else{
    feedback.className = 'feedback-banner show bad';
    feedback.textContent = typed.trim()
      ? `❌ Kurang tepat. Jawaban benar: ${correctAnswer}`
      : `Jawaban benar: ${correctAnswer}`;
  }

  // tetap ada suaranya: bacakan pengucapan kata Bahasa Inggris setelah dinilai
  speak(word.en, 'en-US');

  const newStreak = correct ? (item.streak || 0) + 1 : 0;
  if(correct && newStreak >= MASTERY_STREAK){
    markMastered(item.level, item.word.en);
  }else{
    markRemedial(item.level, item.word.en, newStreak);
  }
  recordAttempt(item.level, correct);
  renderStreakDots(newStreak);
  document.getElementById('remStreak').textContent = newStreak;

  document.getElementById('checkAnswerBtn').classList.add('hidden');
  document.getElementById('giveUpBtn').classList.add('hidden');
  document.getElementById('remedialNextBtn').classList.add('show');
}

document.getElementById('checkAnswerBtn').addEventListener('click', () => checkRemedialAnswer(false));
document.getElementById('giveUpBtn').addEventListener('click', () => checkRemedialAnswer(true));

document.getElementById('remedialInput').addEventListener('keydown', (e) => {
  if(e.key !== 'Enter') return;
  e.preventDefault();
  if(!remedialState.answered){
    checkRemedialAnswer(false);
  }else{
    document.getElementById('remedialNextBtn').click();
  }
});

document.getElementById('flashcard').addEventListener('click', () => {
  if(!remedialState.answered){
    document.getElementById('remedialInput').focus();
  }
});

document.getElementById('remedialNextBtn').addEventListener('click', () => {
  advanceRemedial();
});

function advanceRemedial(){
  remedialState.index++;
  if(remedialState.index >= remedialState.pool.length){
    finishRemedialRound();
  }else{
    renderFlashcard();
  }
}

function finishRemedialRound(){
  window.speechSynthesis && window.speechSynthesis.cancel();
  const remaining = buildRemedialPool();

  if(remaining.length > 0){
    // masih ada kata yang belum genap 7x benar berturut-turut — lanjut putaran baru
    remedialState.pool = shuffle(remaining);
    remedialState.total = remedialState.pool.length;
    remedialState.index = 0;
    renderFlashcard();
    return;
  }

  document.getElementById('resultStats').classList.add('hidden');
  document.getElementById('resultEmoji').textContent = '🏆';
  document.getElementById('resultTitle').textContent = 'Latihan Ulang Tuntas!';
  document.getElementById('resultSubtitle').textContent =
    'Semua kata yang tadinya salah sudah kamu kuasai 7x berturut-turut.';
  showScreen('result');
}

// ---------- Bacakan: pembacaan kata acak terus-menerus per kelompok level ----------
// Membacakan pasangan kata (kata + arti) secara acak dan berulang (looping) sampai
// dihentikan. Menggunakan trik audio hening + Media Session API + Wake Lock supaya
// pembacaan lebih tahan berjalan di latar belakang / saat layar terkunci.
// Catatan: perilaku akhir tetap tergantung browser & OS — ini upaya terbaik (best-effort),
// bukan jaminan mutlak di semua perangkat (terutama iOS Safari yang lebih ketat).
let readerState = {
  active: false,
  level: null,
  queue: [],
  qi: 0,
  keepAliveTimer: null,
  silentAudio: null,
  wakeLock: null
};

function ensureSilentAudio(){
  if(readerState.silentAudio) return readerState.silentAudio;
  const audio = document.createElement('audio');
  audio.src = SILENT_AUDIO_SRC;
  audio.loop = true;
  audio.volume = 0.01;
  audio.setAttribute('playsinline', '');
  audio.style.display = 'none';
  document.body.appendChild(audio);
  readerState.silentAudio = audio;
  return audio;
}

async function requestWakeLockSafe(){
  try{
    if('wakeLock' in navigator){
      readerState.wakeLock = await navigator.wakeLock.request('screen');
    }
  }catch(e){
    // Tidak didukung atau ditolak — pembacaan tetap lanjut lewat sesi audio.
  }
}

function releaseWakeLockSafe(){
  if(readerState.wakeLock){
    try{ readerState.wakeLock.release(); }catch(e){/* ignore */}
    readerState.wakeLock = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'visible' && readerState.active){
    requestWakeLockSafe();
  }
});

function setupMediaSession(level){
  if(!('mediaSession' in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Bacakan Kosakata — Level ' + level,
    artist: 'Belajar Kata',
    album: 'Oxford 3000'
  });
  navigator.mediaSession.playbackState = 'playing';
  navigator.mediaSession.setActionHandler('pause', stopReading);
  navigator.mediaSession.setActionHandler('stop', stopReading);
  navigator.mediaSession.setActionHandler('play', () => {
    if(readerState.active) navigator.mediaSession.playbackState = 'playing';
  });
}

function clearMediaSession(){
  if(!('mediaSession' in navigator)) return;
  navigator.mediaSession.playbackState = 'none';
  try{
    navigator.mediaSession.setActionHandler('pause', null);
    navigator.mediaSession.setActionHandler('stop', null);
    navigator.mediaSession.setActionHandler('play', null);
  }catch(e){/* ignore */}
}

function buildReaderQueue(level){
  return shuffle(WORD_DATA[level]);
}

function updateReaderBarUI(word){
  const isIdToEn = state.direction === 'id-en';
  const text = isIdToEn ? `${word.id} — ${word.en}` : `${word.en} — ${word.id}`;
  const el = document.getElementById('readerWord');
  if(el) el.textContent = text;
}

function speakAsync(text, lang){
  return new Promise((resolve) => {
    if(!('speechSynthesis' in window)){ resolve(); return; }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.9;
    utter.onend = resolve;
    utter.onerror = resolve;
    window.speechSynthesis.speak(utter);
  });
}

async function readerLoop(sessionLevel){
  while(readerState.active && readerState.level === sessionLevel){
    if(readerState.qi >= readerState.queue.length){
      readerState.queue = buildReaderQueue(sessionLevel);
      readerState.qi = 0;
    }
    const word = readerState.queue[readerState.qi++];
    if(!readerState.active || readerState.level !== sessionLevel) break;
    updateReaderBarUI(word);
    await speakAsync(word.id, 'id-ID');
    if(!readerState.active || readerState.level !== sessionLevel) break;
    await new Promise(r => setTimeout(r, 250));
    if(!readerState.active || readerState.level !== sessionLevel) break;
    await speakAsync(word.en, 'en-US');
    if(!readerState.active || readerState.level !== sessionLevel) break;
    await new Promise(r => setTimeout(r, 550));
  }
}

async function startReading(level){
  if(readerState.active && readerState.level === level){
    stopReading();
    return;
  }
  stopReading();

  readerState.active = true;
  readerState.level = level;
  readerState.queue = buildReaderQueue(level);
  readerState.qi = 0;

  document.querySelectorAll('.read-btn').forEach(b => {
    b.classList.toggle('playing', b.dataset.read === level);
  });

  document.getElementById('readerLevel').textContent = `${level} • Bacakan Terus-menerus`;
  document.getElementById('readerWord').textContent = 'Memulai…';
  document.getElementById('readerBar').classList.remove('hidden');

  ensureSilentAudio().play().catch(() => {});
  setupMediaSession(level);
  await requestWakeLockSafe();

  if(readerState.keepAliveTimer) clearInterval(readerState.keepAliveTimer);
  readerState.keepAliveTimer = setInterval(() => {
    if('speechSynthesis' in window && readerState.active){
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 9000);

  readerLoop(level);
}

function stopReading(){
  readerState.active = false;
  readerState.level = null;
  readerState.queue = [];
  readerState.qi = 0;

  if(readerState.keepAliveTimer){
    clearInterval(readerState.keepAliveTimer);
    readerState.keepAliveTimer = null;
  }
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  if(readerState.silentAudio) readerState.silentAudio.pause();
  releaseWakeLockSafe();
  clearMediaSession();

  document.querySelectorAll('.read-btn').forEach(b => b.classList.remove('playing'));
  const bar = document.getElementById('readerBar');
  if(bar) bar.classList.add('hidden');
}

document.querySelectorAll('.read-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    startReading(btn.dataset.read);
  });
});
document.getElementById('readerStopBtn').addEventListener('click', stopReading);

// ---------- init ----------
refreshHomeUI();
