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
  match: document.getElementById('matchScreen'),
  novel: document.getElementById('novelScreen'),
  novelReader: document.getElementById('novelReaderScreen'),
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

document.getElementById('novelBtn').addEventListener('click', () => {
  openNovelScreen();
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

document.querySelectorAll('#homeScreen .level-card').forEach(card => {
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
  if(!readerState.active && !novelReaderState.active){
    window.speechSynthesis && window.speechSynthesis.cancel();
  }
  showScreen('home');
});

let resultContext = 'quiz'; // 'quiz' | 'match' — menentukan perilaku tombol di layar hasil

document.getElementById('backHomeBtn').addEventListener('click', () => {
  if(resultContext === 'match'){
    document.getElementById('matchGame').classList.add('hidden');
    document.getElementById('matchLevelSelect').classList.remove('hidden');
    showScreen('match');
    return;
  }
  showScreen('home');
});

document.getElementById('retryBtn').addEventListener('click', () => {
  if(resultContext === 'match'){
    startMatchQuiz(matchState.level);
    return;
  }
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
  stopNovelReading();
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
  resultContext = 'quiz';
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
  document.getElementById('retryBtn').textContent = '🔁 Lanjut Belajar';
  document.getElementById('backHomeBtn').textContent = '🏠 Pilih Level Lain';

  showScreen('result');
}

// ---------- remedial flow (flashcard, dengan jawaban diketik & dinilai otomatis) ----------
function startRemedial(){
  stopReading();
  stopNovelReading();
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
    // baru dihitung ke statistik akurasi SETELAH kata ini benar-benar berhasil dikuasai —
    // percobaan selama masih di Latihan Ulang (masih membangun streak) tidak dihitung dulu.
    recordAttempt(item.level, true);
  }else{
    markRemedial(item.level, item.word.en, newStreak);
  }
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

// Web Speech API di banyak browser (terutama Chrome/Android) punya bug lama:
// kadang speechSynthesis "macet" — utterance tidak pernah memicu onend/onerror,
// sehingga suara jadi diam total dan proses menunggu (await) tidak pernah lanjut.
// speakAsync() dibuat tahan terhadap ini dengan:
// 1) watchdog timeout — kalau lebih lama dari perkiraan wajar tanpa onend/onerror,
//    paksa reset & lanjut, supaya pembacaan tidak macet selamanya.
// 2) retry sekali — kalau speak() dipanggil tapi browser diam-diam tidak mulai
//    bicara sama sekali, coba panggil ulang sekali.
function speakAsync(text, lang){
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if(!synth || !text){ resolve(); return; }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.9;

    let done = false;
    let retried = false;
    let watchdogTimer = null;
    let retryTimer = null;

    const finish = () => {
      if(done) return;
      done = true;
      if(watchdogTimer) clearTimeout(watchdogTimer);
      if(retryTimer) clearTimeout(retryTimer);
      resolve();
    };

    utter.onend = finish;
    utter.onerror = finish;

    // perkiraan lama bicara (~90ms/karakter), dengan batas bawah & atas yang wajar
    const estMs = Math.min(Math.max(text.length * 90, 1200), 15000);
    watchdogTimer = setTimeout(() => {
      try{ synth.cancel(); }catch(e){/* abaikan */}
      finish();
    }, estMs);

    try{
      synth.speak(utter);
    }catch(e){
      finish();
      return;
    }

    // kalau setelah sesaat browser tidak kunjung mulai bicara sama sekali
    // (kemungkinan panggilan speak() diabaikan diam-diam), coba sekali lagi
    retryTimer = setTimeout(() => {
      if(!done && !retried && !synth.speaking && !synth.pending){
        retried = true;
        try{ synth.speak(utter); }catch(e){/* abaikan */}
      }
    }, 350);
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

  // reset paksa kalau ada antrean lama yang macet sebelum sesi baru dimulai
  if('speechSynthesis' in window) window.speechSynthesis.cancel();

  if(readerState.keepAliveTimer) clearInterval(readerState.keepAliveTimer);
  readerState.keepAliveTimer = setInterval(() => {
    // hanya "colek" (pause+resume) kalau memang sedang aktif bicara — memanggil
    // ini saat idle justru berisiko membuat mesin suara macet di beberapa browser
    if('speechSynthesis' in window && readerState.active && window.speechSynthesis.speaking){
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

// ---------- Novel Reader: perpustakaan PDF + mode baca immersive (teks reflow) ----------
// PDF novel diekstrak teksnya (bukan sekadar difoto per halaman), lalu ditata ulang
// (reflow) menjadi halaman-halaman virtual yang pas dengan layar — supaya tulisan besar,
// lega, dan warna latar bisa dibuat coklat hangat ala buku sungguhan (ramah mata/glaukoma),
// bukan terikat pada gambar PDF yang putih terang. File PDF & posisi baca terakhir
// disimpan (IndexedDB + localStorage) sehingga novel tidak hilang dan bisa dilanjutkan.
const NOVEL_DB_NAME = 'belajarKataNovelDB';
const NOVEL_DB_STORE = 'pdfs';
const NOVEL_PROGRESS_KEY = 'belajarKata_novel_progress_v1';

let bookState = {
  pdf: null,
  numPages: 0,
  title: '',
  fileId: null,
  paragraphs: [],     // [{text, sourcePage}] — seluruh teks novel, sudah dipecah per paragraf
  pages: [],           // hasil reflow: array of array-of-paragraph (halaman virtual)
  currentPageIdx: 0,
  transitioning: false,
  ready: false
};

let novelReaderState = {
  active: false,
  keepAliveTimer: null
};

let novelLibraryCache = []; // cache daftar novel dari IndexedDB, untuk render & delete cepat

// ---------- IndexedDB: simpan file PDF supaya tidak hilang ----------
function openNovelDB(){
  return new Promise((resolve, reject) => {
    if(!('indexedDB' in window)){ reject(new Error('IndexedDB tidak didukung')); return; }
    const req = indexedDB.open(NOVEL_DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(NOVEL_DB_STORE, { keyPath: 'id' });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveNovelToDB(file, id, title){
  try{
    const db = await openNovelDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(NOVEL_DB_STORE, 'readwrite');
      tx.objectStore(NOVEL_DB_STORE).put({ id, title, file, savedAt: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }catch(e){ return false; }
}

async function loadAllNovelsFromDB(){
  try{
    const db = await openNovelDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(NOVEL_DB_STORE, 'readonly');
      const req = tx.objectStore(NOVEL_DB_STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }catch(e){ return []; }
}

async function deleteNovelFromDB(id){
  try{
    const db = await openNovelDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(NOVEL_DB_STORE, 'readwrite');
      tx.objectStore(NOVEL_DB_STORE).delete(id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  }catch(e){ return false; }
}

async function hashFile(file){
  return `${file.name}_${file.size}_${file.lastModified}`;
}

// ---------- progres baca (localStorage, ringan & cepat) ----------
function loadAllNovelProgress(){
  try{
    const raw = localStorage.getItem(NOVEL_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function getNovelProgress(fileId){
  return loadAllNovelProgress()[fileId] || null;
}
function saveNovelProgress(){
  if(!bookState.fileId) return;
  try{
    const all = loadAllNovelProgress();
    const firstPara = bookState.pages[bookState.currentPageIdx] && bookState.pages[bookState.currentPageIdx][0];
    all[bookState.fileId] = {
      paraGlobalIndex: firstPara ? firstPara.globalIndex : 0,
      currentPageIdx: bookState.currentPageIdx,
      totalPages: bookState.pages.length,
      progressPct: bookState.pages.length > 1
        ? Math.round((bookState.currentPageIdx / (bookState.pages.length - 1)) * 100)
        : 100,
      updatedAt: Date.now()
    };
    localStorage.setItem(NOVEL_PROGRESS_KEY, JSON.stringify(all));
  }catch(e){/* abaikan */}
}
function deleteNovelProgress(fileId){
  try{
    const all = loadAllNovelProgress();
    delete all[fileId];
    localStorage.setItem(NOVEL_PROGRESS_KEY, JSON.stringify(all));
  }catch(e){/* abaikan */}
}

function timeAgo(ts){
  if(!ts) return '';
  const diffMs = Date.now() - ts;
  const min = Math.floor(diffMs / 60000);
  if(min < 1) return 'baru saja';
  if(min < 60) return `${min} menit lalu`;
  const hr = Math.floor(min / 60);
  if(hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  if(day < 30) return `${day} hari lalu`;
  const month = Math.floor(day / 30);
  return `${month} bulan lalu`;
}

// ---------- ekstraksi teks PDF & pemecahan jadi paragraf ----------
async function extractPageParagraphs(pdf, pageNum){
  const page = await pdf.getPage(pageNum);
  const content = await page.getTextContent();
  const items = content.items.filter(it => it.str !== undefined && it.str !== '');
  if(items.length === 0) return [];

  // lintasan pertama: kumpulkan semua jarak-y antar baris berurutan, untuk
  // menebak jarak antar-baris "normal" (nilai yang paling sering muncul di
  // halaman ini) — supaya batas paragraf terdeteksi relatif terhadap gaya
  // baris PDF tersebut, bukan angka tetap yang belum tentu cocok semua PDF.
  const gapCounts = {};
  for(let i = 1; i < items.length; i++){
    const y0 = items[i - 1].transform ? items[i - 1].transform[5] : null;
    const y1 = items[i].transform ? items[i].transform[5] : null;
    if(y0 === null || y1 === null) continue;
    const g = Math.round(Math.abs(y0 - y1));
    if(g > 1) gapCounts[g] = (gapCounts[g] || 0) + 1;
  }
  let typicalGap = 14;
  let bestCount = 0;
  for(const g in gapCounts){
    if(gapCounts[g] > bestCount){ bestCount = gapCounts[g]; typicalGap = Number(g); }
  }

  // lintasan kedua: susun paragraf — jarak jauh lebih besar dari jarak baris
  // normal dianggap batas paragraf baru, jarak sekitar normal dianggap masih
  // baris lanjutan dari paragraf yang sama (disambung dengan spasi).
  const paragraphs = [];
  let current = '';
  let prevY = null;
  for(const it of items){
    const y = it.transform ? it.transform[5] : null;
    if(prevY !== null && y !== null){
      const gap = Math.abs(prevY - y);
      if(gap > typicalGap * 1.6){
        if(current.trim()) paragraphs.push(current.trim());
        current = '';
      }else if(gap > 1 && current && !/\s$/.test(current)){
        current += ' ';
      }
    }
    current += it.str;
    prevY = y;
  }
  if(current.trim()) paragraphs.push(current.trim());
  return paragraphs.map(text => ({ text, sourcePage: pageNum }));
}

async function extractAllParagraphs(pdf, onProgress){
  const all = [];
  for(let p = 1; p <= pdf.numPages; p++){
    const paras = await extractPageParagraphs(pdf, p);
    all.push(...paras);
    if(onProgress) onProgress(p, pdf.numPages);
  }
  all.forEach((para, idx) => { para.globalIndex = idx; });
  return all;
}

// ---------- reflow: menata paragraf jadi halaman virtual yang pas layar ----------
function fitsInMeasure(html){
  const measureEl = document.getElementById('readerMeasure');
  measureEl.innerHTML = html;
  return measureEl.scrollHeight <= measureEl.clientHeight + 1;
}
function paragraphsToHtml(paras){
  return paras.map(p => `<p>${escapeHtml(p.text)}</p>`).join('');
}
function splitParagraphIntoFittingChunks(para){
  const words = para.text.split(/\s+/).filter(Boolean);
  if(words.length === 0) return [para];
  const chunks = [];
  let start = 0;
  while(start < words.length){
    let lo = start + 1, hi = words.length, best = start + 1;
    while(lo <= hi){
      const mid = Math.floor((lo + hi) / 2);
      const candidate = words.slice(start, mid).join(' ');
      if(fitsInMeasure(`<p>${escapeHtml(candidate)}</p>`)){
        best = mid;
        lo = mid + 1;
      }else{
        hi = mid - 1;
      }
    }
    chunks.push({ text: words.slice(start, best).join(' '), sourcePage: para.sourcePage, globalIndex: para.globalIndex });
    start = best;
  }
  return chunks;
}

function buildPagination(){
  const pages = [];
  let current = [];
  const paras = bookState.paragraphs;

  for(let i = 0; i < paras.length; i++){
    const para = paras[i];
    if(current.length === 0 && !fitsInMeasure(`<p>${escapeHtml(para.text)}</p>`)){
      const chunks = splitParagraphIntoFittingChunks(para);
      chunks.forEach((chunk, ci) => {
        if(ci < chunks.length - 1){
          pages.push([chunk]);
        }else{
          current = [chunk];
        }
      });
      continue;
    }
    const testHtml = paragraphsToHtml(current.concat([para]));
    if(fitsInMeasure(testHtml) || current.length === 0){
      current.push(para);
    }else{
      pages.push(current);
      current = [para];
    }
  }
  if(current.length) pages.push(current);
  bookState.pages = pages.length ? pages : [[{ text: '(Novel ini tidak memiliki teks yang bisa ditampilkan — kemungkinan berupa hasil pindai/gambar.)', sourcePage: 1, globalIndex: 0 }]];
}

// ---------- render & navigasi halaman baca ----------
function renderReaderPageContent(idx){
  const contentEl = document.getElementById('readerPageContent');
  contentEl.innerHTML = paragraphsToHtml(bookState.pages[idx] || []);
  contentEl.scrollTop = 0;
}

function updateReaderUI(){
  const total = bookState.pages.length;
  const idx = bookState.currentPageIdx;
  document.getElementById('readerOverlayTitle').textContent = bookState.title || 'Novel';
  document.getElementById('readerPageLabel').textContent = `${idx + 1} / ${total}`;
  const pct = total > 1 ? (idx / (total - 1)) * 100 : 100;
  document.getElementById('readerProgressFill').style.width = pct + '%';
}

function waitFrame(){
  return new Promise(r => requestAnimationFrame(r));
}

async function goReaderPage(newIdx, direction){
  if(bookState.transitioning) return;
  if(newIdx < 0 || newIdx >= bookState.pages.length) return;
  bookState.transitioning = true;

  const contentEl = document.getElementById('readerPageContent');
  const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
  const inClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

  contentEl.classList.add(outClass);
  await new Promise(resolve => setTimeout(resolve, 230));

  bookState.currentPageIdx = newIdx;
  renderReaderPageContent(newIdx);

  contentEl.classList.remove(outClass);
  contentEl.classList.add(inClass);
  void contentEl.offsetWidth;
  await waitFrame();
  contentEl.classList.remove(inClass);

  await new Promise(resolve => setTimeout(resolve, 260));
  bookState.transitioning = false;

  updateReaderUI();
  saveNovelProgress();
}

function goReaderNext(){ goReaderPage(bookState.currentPageIdx + 1, 'next'); }
function goReaderPrev(){ goReaderPage(bookState.currentPageIdx - 1, 'prev'); }

// ---------- overlay minimal (muncul sebentar saat area tengah disentuh) ----------
let readerOverlayTimer = null;
function showReaderOverlay(){
  document.getElementById('readerOverlay').classList.remove('hidden');
  if(readerOverlayTimer) clearTimeout(readerOverlayTimer);
  readerOverlayTimer = setTimeout(hideReaderOverlay, 3800);
}
function hideReaderOverlay(){
  document.getElementById('readerOverlay').classList.add('hidden');
  if(readerOverlayTimer){ clearTimeout(readerOverlayTimer); readerOverlayTimer = null; }
}
function toggleReaderOverlay(){
  const el = document.getElementById('readerOverlay');
  if(el.classList.contains('hidden')) showReaderOverlay(); else hideReaderOverlay();
}

// ---------- gerakan sentuh: geser/tap untuk balik halaman, seperti buku ----------
(function setupReaderGestures(){
  const pageEl = document.getElementById('readerPage');
  let startX = null, startY = null, moved = false;

  pageEl.addEventListener('touchstart', (e) => {
    const t = e.touches[0];
    startX = t.clientX; startY = t.clientY; moved = false;
  }, { passive: true });

  pageEl.addEventListener('touchmove', (e) => {
    if(startX === null) return;
    const t = e.touches[0];
    if(Math.abs(t.clientX - startX) > 8 || Math.abs(t.clientY - startY) > 8) moved = true;
  }, { passive: true });

  pageEl.addEventListener('touchend', (e) => {
    if(startX === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    const width = pageEl.clientWidth;
    const tapX = t.clientX;
    startX = null;

    if(Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)){
      if(dx < 0) goReaderNext(); else goReaderPrev();
      return;
    }
    if(moved) return;

    if(tapX < width * 0.28){ goReaderPrev(); }
    else if(tapX > width * 0.72){ goReaderNext(); }
    else{ toggleReaderOverlay(); }
  });

  // fallback klik mouse untuk pratinjau di desktop (tidak ada event sentuh)
  pageEl.addEventListener('click', (e) => {
    if('ontouchstart' in window) return;
    const rect = pageEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if(x < rect.width * 0.28){ goReaderPrev(); }
    else if(x > rect.width * 0.72){ goReaderNext(); }
    else{ toggleReaderOverlay(); }
  });
})();

// ---------- membacakan halaman yang sedang tampil (suara) ----------
function splitIntoSpeechChunks(text){
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  return parts.length ? parts : (text ? [text] : []);
}

async function speakCurrentPageAsync(){
  const paras = bookState.pages[bookState.currentPageIdx] || [];
  const text = paras.map(p => p.text).join(' ');
  const chunks = splitIntoSpeechChunks(text);
  if(chunks.length === 0){
    await speakAsync('Halaman ini tidak memiliki teks yang bisa dibaca.', 'id-ID');
    return;
  }
  for(const chunk of chunks){
    if(!novelReaderState.active) return;
    await speakAsync(chunk, 'en-US');
  }
}

async function startNovelReading(){
  if(novelReaderState.active){ stopNovelReading(); return; }
  if(!bookState.ready) return;
  stopReading(); // hentikan Bacakan kosakata dulu, supaya suara tidak tabrakan

  novelReaderState.active = true;
  const btn = document.getElementById('readerPlayBtn');
  btn.textContent = '⏸ Berhenti';
  btn.classList.add('playing');

  ensureSilentAudio().play().catch(() => {});
  if('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Membaca Novel — ' + (bookState.title || 'Novel'),
      artist: 'Belajar Kata',
      album: 'Reading Practice'
    });
    navigator.mediaSession.playbackState = 'playing';
    navigator.mediaSession.setActionHandler('pause', stopNovelReading);
    navigator.mediaSession.setActionHandler('stop', stopNovelReading);
    navigator.mediaSession.setActionHandler('play', () => {
      if(novelReaderState.active) navigator.mediaSession.playbackState = 'playing';
    });
  }
  await requestWakeLockSafe();

  if('speechSynthesis' in window) window.speechSynthesis.cancel();

  if(novelReaderState.keepAliveTimer) clearInterval(novelReaderState.keepAliveTimer);
  novelReaderState.keepAliveTimer = setInterval(() => {
    if('speechSynthesis' in window && novelReaderState.active && window.speechSynthesis.speaking){
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 9000);

  while(novelReaderState.active && bookState.currentPageIdx < bookState.pages.length){
    await speakCurrentPageAsync();
    if(!novelReaderState.active) break;
    if(bookState.currentPageIdx >= bookState.pages.length - 1) break;
    await goReaderPage(bookState.currentPageIdx + 1, 'next');
    if(!novelReaderState.active) break;
    await new Promise(r => setTimeout(r, 300));
  }
  if(novelReaderState.active) stopNovelReading();
}

function stopNovelReading(){
  novelReaderState.active = false;
  if(novelReaderState.keepAliveTimer){
    clearInterval(novelReaderState.keepAliveTimer);
    novelReaderState.keepAliveTimer = null;
  }
  if('speechSynthesis' in window) window.speechSynthesis.cancel();
  if(readerState.silentAudio && !readerState.active) readerState.silentAudio.pause();
  if(!readerState.active) releaseWakeLockSafe();
  clearMediaSession();

  const btn = document.getElementById('readerPlayBtn');
  if(btn){
    btn.textContent = '🔊 Bacakan';
    btn.classList.remove('playing');
  }
}

document.getElementById('readerPlayBtn').addEventListener('click', startNovelReading);

document.getElementById('readerBackBtn').addEventListener('click', () => {
  stopNovelReading();
  showScreen('novel');
  renderNovelLibrary();
});

// ---------- buka & siapkan satu novel untuk dibaca ----------
async function openNovelReader(rec, opts){
  opts = opts || {};
  stopReading();
  stopNovelReading();

  showScreen('novelReader');
  document.getElementById('readerOverlay').classList.add('hidden');
  document.getElementById('readerLoading').classList.remove('hidden');
  document.getElementById('readerLoadingText') &&
    (document.getElementById('readerLoadingText').textContent = `Menyiapkan "${rec.title || 'novel'}"…`);

  bookState = {
    pdf: null, numPages: 0, title: rec.title || 'Novel', fileId: rec.id,
    paragraphs: [], pages: [], currentPageIdx: 0, transitioning: false, ready: false
  };

  try{
    if(!window.pdfjsLib) throw new Error('Pustaka PDF.js belum siap.');
    const arrayBuffer = await rec.file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    bookState.pdf = pdf;
    bookState.numPages = pdf.numPages;

    bookState.paragraphs = await extractAllParagraphs(pdf);

    // ukur & susun ulang setelah tata letak selesai render (perlu 1 frame supaya
    // elemen pengukur sudah punya ukuran akhir yang benar)
    await waitFrame();
    buildPagination();

    const progress = getNovelProgress(bookState.fileId);
    let startIdx = 0;
    if(progress && progress.paraGlobalIndex != null){
      for(let i = 0; i < bookState.pages.length; i++){
        const firstPara = bookState.pages[i][0];
        if(firstPara && firstPara.globalIndex >= progress.paraGlobalIndex){
          startIdx = i;
          break;
        }
      }
    }
    bookState.currentPageIdx = Math.min(startIdx, bookState.pages.length - 1);
    bookState.ready = true;

    renderReaderPageContent(bookState.currentPageIdx);
    updateReaderUI();
    saveNovelProgress();

    document.getElementById('readerLoading').classList.add('hidden');
  }catch(err){
    console.warn('Gagal membuka novel:', err);
    document.getElementById('readerLoading').classList.add('hidden');
    alert('Gagal membuka novel ini. Pastikan filenya PDF berisi teks (bukan hasil pindai gambar) ya.');
    showScreen('novel');
  }
}

// ---------- perpustakaan novel (daftar, unggah, hapus) ----------
function renderNovelLibrary(){
  const listEl = document.getElementById('novelList');
  const emptyEl = document.getElementById('novelEmpty');

  if(novelLibraryCache.length === 0){
    listEl.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');
  listEl.classList.remove('hidden');

  const sorted = [...novelLibraryCache].sort((a, b) => b.savedAt - a.savedAt);
  listEl.innerHTML = sorted.map(rec => {
    const progress = getNovelProgress(rec.id);
    const pct = progress ? progress.progressPct : 0;
    const sub = progress
      ? `Halaman ${progress.currentPageIdx + 1} dari ${progress.totalPages} · ${timeAgo(progress.updatedAt)}`
      : 'Belum pernah dibaca';
    return `
      <div class="novel-item" data-id="${escapeHtml(rec.id)}">
        <div class="novel-item-cover">📗</div>
        <div class="novel-item-info">
          <div class="novel-item-title">${escapeHtml(rec.title)}</div>
          <div class="novel-item-progress-row">
            <div class="book-progress-bar"><div class="book-progress-fill" style="width:${pct}%"></div></div>
            <span>${pct}%</span>
          </div>
          <div class="novel-item-sub">${escapeHtml(sub)}</div>
        </div>
        <button class="novel-item-delete" data-delete-id="${escapeHtml(rec.id)}" title="Hapus novel ini">🗑️</button>
      </div>`;
  }).join('');

  listEl.querySelectorAll('.novel-item').forEach(itemEl => {
    itemEl.addEventListener('click', (e) => {
      if(e.target.closest('.novel-item-delete')) return;
      const id = itemEl.dataset.id;
      const rec = novelLibraryCache.find(r => r.id === id);
      if(rec) openNovelReader(rec);
    });
  });
  listEl.querySelectorAll('.novel-item-delete').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.dataset.deleteId;
      const rec = novelLibraryCache.find(r => r.id === id);
      const ok = confirm(`Hapus novel "${rec ? rec.title : ''}" dari perangkat ini?`);
      if(!ok) return;
      await deleteNovelFromDB(id);
      deleteNovelProgress(id);
      novelLibraryCache = novelLibraryCache.filter(r => r.id !== id);
      renderNovelLibrary();
    });
  });
}

async function refreshNovelLibrary(){
  document.getElementById('novelEmpty').classList.add('hidden');
  document.getElementById('novelList').classList.add('hidden');
  document.getElementById('novelLoading').classList.remove('hidden');
  novelLibraryCache = await loadAllNovelsFromDB();
  document.getElementById('novelLoading').classList.add('hidden');
  renderNovelLibrary();
}

async function handleNovelFileInput(e){
  const file = e.target.files && e.target.files[0];
  e.target.value = '';
  if(!file) return;

  const id = await hashFile(file);
  const title = file.name.replace(/\.pdf$/i, '');
  await saveNovelToDB(file, id, title);

  const existingIdx = novelLibraryCache.findIndex(r => r.id === id);
  const rec = { id, title, file, savedAt: Date.now() };
  if(existingIdx >= 0) novelLibraryCache[existingIdx] = rec;
  else novelLibraryCache.push(rec);

  openNovelReader(rec);
}

document.getElementById('novelFileInput').addEventListener('change', handleNovelFileInput);
document.getElementById('novelFileInput2').addEventListener('change', handleNovelFileInput);

function openNovelScreen(){
  stopReading();
  showScreen('novel');
  refreshNovelLibrary();
}

document.getElementById('novelBackToHomeBtn').addEventListener('click', () => {
  showScreen('home');
});

// ---------- Kuis Pasangan: cocokkan 15 kata acak dengan artinya ----------
let matchState = {
  level: null,
  pairs: [],           // [{pid, id, en, matched, flaggedRemedial}]
  leftOrder: [],
  rightOrder: [],
  selectedLeftId: null,
  selectedRightId: null,
  matchedCount: 0,
  wrongCount: 0,
  lockInput: false
};

const MATCH_QUIZ_SIZE = 15;

function matchItemHtml(pair, side){
  const text = side === 'left' ? pair.en : pair.id;
  const cls = ['match-item'];
  if(pair.matched) cls.push('matched');
  return `<button type="button" class="${cls.join(' ')}" data-pid="${pair.pid}" data-side="${side}" ${pair.matched ? 'disabled' : ''}>${escapeHtml(text)}</button>`;
}

function renderMatchColumns(){
  const leftEl = document.getElementById('matchColLeft');
  const rightEl = document.getElementById('matchColRight');

  leftEl.innerHTML = matchState.leftOrder
    .map(pid => matchItemHtml(matchState.pairs.find(p => p.pid === pid), 'left'))
    .join('');
  rightEl.innerHTML = matchState.rightOrder
    .map(pid => matchItemHtml(matchState.pairs.find(p => p.pid === pid), 'right'))
    .join('');

  leftEl.querySelectorAll('.match-item').forEach(el => {
    el.addEventListener('click', () => onMatchItemClick(el));
  });
  rightEl.querySelectorAll('.match-item').forEach(el => {
    el.addEventListener('click', () => onMatchItemClick(el));
  });
}

function updateMatchSelectionUI(){
  document.querySelectorAll('.match-item').forEach(el => {
    const pid = Number(el.dataset.pid);
    const side = el.dataset.side;
    const isSelected = (side === 'left' && pid === matchState.selectedLeftId) ||
                        (side === 'right' && pid === matchState.selectedRightId);
    el.classList.toggle('selected', isSelected);
  });
}

function updateMatchScoreUI(){
  document.getElementById('matchScoreText').textContent =
    `Cocok: ${matchState.matchedCount}/${matchState.pairs.length}`;
}

function onMatchItemClick(el){
  if(matchState.lockInput) return;
  const pid = Number(el.dataset.pid);
  const side = el.dataset.side;
  const pair = matchState.pairs.find(p => p.pid === pid);
  if(!pair || pair.matched) return;

  if(side === 'left') matchState.selectedLeftId = pid;
  else matchState.selectedRightId = pid;

  updateMatchSelectionUI();

  if(matchState.selectedLeftId != null && matchState.selectedRightId != null){
    evaluateMatchSelection();
  }
}

function evaluateMatchSelection(){
  const leftPid = matchState.selectedLeftId;
  const rightPid = matchState.selectedRightId;
  matchState.lockInput = true;

  const leftEl = document.querySelector(`.match-item[data-side="left"][data-pid="${leftPid}"]`);
  const rightEl = document.querySelector(`.match-item[data-side="right"][data-pid="${rightPid}"]`);
  const correct = leftPid === rightPid;

  if(correct){
    const pair = matchState.pairs.find(p => p.pid === leftPid);
    pair.matched = true;
    matchState.matchedCount++;
    if(leftEl) leftEl.classList.add('correct-flash');
    if(rightEl) rightEl.classList.add('correct-flash');
    updateMatchScoreUI();

    setTimeout(() => {
      matchState.selectedLeftId = null;
      matchState.selectedRightId = null;
      matchState.lockInput = false;
      if(matchState.matchedCount >= matchState.pairs.length){
        finishMatchQuiz();
      }else{
        renderMatchColumns();
      }
    }, 380);
  }else{
    matchState.wrongCount++;
    if(leftEl) leftEl.classList.add('wrong-flash');
    if(rightEl) rightEl.classList.add('wrong-flash');

    const pair = matchState.pairs.find(p => p.pid === leftPid);
    if(pair && !pair.flaggedRemedial){
      pair.flaggedRemedial = true;
      markRemedial(matchState.level, pair.en, 0);
    }

    setTimeout(() => {
      if(leftEl) leftEl.classList.remove('wrong-flash', 'selected');
      if(rightEl) rightEl.classList.remove('wrong-flash', 'selected');
      matchState.selectedLeftId = null;
      matchState.selectedRightId = null;
      matchState.lockInput = false;
    }, 480);
  }
}

function startMatchQuiz(level){
  stopReading();
  stopNovelReading();

  const source = shuffle(WORD_DATA[level] || []).slice(0, MATCH_QUIZ_SIZE);
  matchState = {
    level,
    pairs: source.map((w, idx) => ({ pid: idx, id: w.id, en: w.en, matched: false, flaggedRemedial: false })),
    leftOrder: [],
    rightOrder: [],
    selectedLeftId: null,
    selectedRightId: null,
    matchedCount: 0,
    wrongCount: 0,
    lockInput: false
  };
  matchState.leftOrder = shuffle(matchState.pairs.map(p => p.pid));
  matchState.rightOrder = shuffle(matchState.pairs.map(p => p.pid));

  const chip = document.getElementById('matchLevelChip');
  chip.textContent = level;
  chip.className = 'level-chip ' + level.toLowerCase();
  updateMatchScoreUI();

  document.getElementById('matchLevelSelect').classList.add('hidden');
  document.getElementById('matchGame').classList.remove('hidden');
  showScreen('match');

  renderMatchColumns();
}

function finishMatchQuiz(){
  resultContext = 'match';
  window.speechSynthesis && window.speechSynthesis.cancel();

  const total = matchState.pairs.length;
  const attempts = total + matchState.wrongCount;
  const pct = attempts ? Math.round((total / attempts) * 100) : 100;

  document.getElementById('resultStats').classList.remove('hidden');
  document.getElementById('resultGood').textContent = total;
  document.getElementById('resultBad').textContent = matchState.wrongCount;
  document.getElementById('resultPct').textContent = pct + '%';

  let emoji = '🎉', title = 'Kuis Pasangan Selesai!';
  let subtitle = `${total} pasangan berhasil dicocokkan di level ${matchState.level}.`;
  if(matchState.wrongCount === 0){
    emoji = '🏆'; title = 'Sempurna!';
    subtitle = `Semua ${total} pasangan cocok tanpa satu pun kesalahan!`;
  }else if(pct >= 80){
    emoji = '🎉'; title = 'Kerja Bagus!';
    subtitle = `${total} pasangan cocok, meleset ${matchState.wrongCount} kali.`;
  }else{
    emoji = '💪'; title = 'Terus Berlatih!';
    subtitle = `${total} pasangan cocok, meleset ${matchState.wrongCount} kali.`;
  }
  if(matchState.wrongCount > 0){
    subtitle += ' Kata yang sempat salah sudah masuk Latihan Ulang.';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultSubtitle').textContent = subtitle;
  document.getElementById('retryBtn').textContent = '🔁 Main Lagi';
  document.getElementById('backHomeBtn').textContent = '🔗 Pilih Level Lain';

  showScreen('result');
}

function openMatchScreen(){
  stopReading();
  stopNovelReading();
  document.getElementById('matchGame').classList.add('hidden');
  document.getElementById('matchLevelSelect').classList.remove('hidden');
  showScreen('match');
}

document.getElementById('matchBtn').addEventListener('click', openMatchScreen);
document.getElementById('matchBackBtn').addEventListener('click', () => {
  showScreen('home');
});

document.querySelectorAll('#matchLevelSelect .match-level-card').forEach(card => {
  card.addEventListener('click', () => startMatchQuiz(card.dataset.mlevel));
  card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      card.click();
    }
  });
});

// ---------- init ----------
refreshHomeUI();
