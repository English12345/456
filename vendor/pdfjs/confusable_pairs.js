// Pasangan kata yang sering ketuker (confusable words), dikurasi manual per level.
// Dipakai oleh mode "Kata Mirip" untuk latihan membedakan makna & penggunaan.
const CONFUSABLE_PAIRS = {
  "A1": [
    {
      "a": {
        "en": "see",
        "id": "melihat"
      },
      "b": {
        "en": "watch",
        "id": "menonton"
      },
      "tip": "\"see\" untuk melihat sesuatu tanpa sengaja/sekilas, \"watch\" untuk menonton sesuatu dengan sengaja & perhatian penuh (TV, film, pertandingan).",
      "quiz": [
        {
          "sentence": "I ___ a bird outside my window.",
          "answer": "a"
        },
        {
          "sentence": "We ___ a movie every Friday night.",
          "answer": "b"
        }
      ]
    },
    {
      "a": {
        "en": "say",
        "id": "mengatakan"
      },
      "b": {
        "en": "tell",
        "id": "memberitahu"
      },
      "tip": "\"say\" tidak perlu objek orang (say something), \"tell\" harus diikuti orangnya (tell someone something).",
      "quiz": [
        {
          "sentence": "She didn't ___ anything at the meeting.",
          "answer": "a"
        },
        {
          "sentence": "Can you ___ me your name?",
          "answer": "b"
        }
      ]
    },
    {
      "a": {
        "en": "listen",
        "id": "mendengarkan"
      },
      "b": {
        "en": "hear",
        "id": "mendengar"
      },
      "tip": "\"listen\" = mendengarkan dengan sengaja/fokus, \"hear\" = mendengar suara tanpa sengaja lewat telinga.",
      "quiz": [
        {
          "sentence": "I ___ to music every morning.",
          "answer": "a"
        },
        {
          "sentence": "Did you ___ that loud noise?",
          "answer": "b"
        }
      ]
    },
    {
      "a": {
        "en": "bring",
        "id": "membawa (ke sini)"
      },
      "b": {
        "en": "take",
        "id": "membawa (ke sana)"
      },
      "tip": "\"bring\" = membawa sesuatu MENUJU pembicara/tempat ini, \"take\" = membawa sesuatu MENJAUH dari sini ke tempat lain.",
      "quiz": [
        {
          "sentence": "Please ___ your umbrella when you leave.",
          "answer": "b"
        },
        {
          "sentence": "Can you ___ some snacks to my house tonight?",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "lose",
        "id": "kehilangan/kalah"
      },
      "b": {
        "en": "miss",
        "id": "merindukan/ketinggalan"
      },
      "tip": "\"lose\" = kehilangan barang atau kalah dalam pertandingan, \"miss\" = merindukan seseorang atau ketinggalan sesuatu (bus, kesempatan).",
      "quiz": [
        {
          "sentence": "I always ___ my keys!",
          "answer": "a"
        },
        {
          "sentence": "I really ___ my family back home.",
          "answer": "b"
        }
      ]
    },
    {
      "a": {
        "en": "other",
        "id": "yang lain (spesifik)"
      },
      "b": {
        "en": "another",
        "id": "yang lain (satu lagi)"
      },
      "tip": "\"another\" = satu lagi dari sesuatu yang jumlahnya banyak/tak terbatas, \"other\" = merujuk yang lain secara spesifik (the other one).",
      "quiz": [
        {
          "sentence": "Can I have ___ cup of coffee?",
          "answer": "b"
        },
        {
          "sentence": "Where is the ___ shoe?",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "then",
        "id": "lalu, kemudian"
      },
      "b": {
        "en": "than",
        "id": "daripada (perbandingan)"
      },
      "tip": "\"then\" untuk urutan waktu/kejadian (lalu, setelah itu), \"than\" khusus untuk kalimat perbandingan (lebih ... daripada).",
      "quiz": [
        {
          "sentence": "She is taller ___ her brother.",
          "answer": "b"
        },
        {
          "sentence": "We ate dinner, ___ we watched TV.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "fast",
        "id": "cepat (kata sifat/keterangan)"
      },
      "b": {
        "en": "quickly",
        "id": "dengan cepat (kata keterangan)"
      },
      "tip": "\"fast\" bisa jadi kata sifat (a fast car) maupun keterangan (run fast), \"quickly\" hanya kata keterangan yang menjelaskan cara melakukan sesuatu.",
      "quiz": [
        {
          "sentence": "He finished his homework very ___.",
          "answer": "b"
        },
        {
          "sentence": "That is a very ___ car.",
          "answer": "a"
        }
      ]
    }
  ],
  "A2": [
    {
      "a": {
        "en": "job",
        "id": "pekerjaan (posisi tertentu)"
      },
      "b": {
        "en": "career",
        "id": "karier (jalur profesi jangka panjang)"
      },
      "tip": "\"job\" = satu pekerjaan/posisi tertentu, \"career\" = seluruh perjalanan profesi seseorang dalam jangka panjang.",
      "quiz": [
        {
          "sentence": "She has a great ___ in medicine.",
          "answer": "b"
        },
        {
          "sentence": "He got a new ___ at the bank last month.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "travel",
        "id": "bepergian (kata kerja umum)"
      },
      "b": {
        "en": "trip",
        "id": "perjalanan (satu kali, kata benda)"
      },
      "tip": "\"travel\" = kata kerja umum untuk bepergian, \"trip\" = kata benda untuk satu perjalanan spesifik.",
      "quiz": [
        {
          "sentence": "We had a wonderful ___ to Bali.",
          "answer": "b"
        },
        {
          "sentence": "I love to ___ every year.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "home",
        "id": "rumah (tempat tinggal, terasa personal)"
      },
      "b": {
        "en": "house",
        "id": "rumah (bangunan fisik)"
      },
      "tip": "\"house\" = bangunan fisik rumah, \"home\" = tempat tinggal yang terasa personal/emosional (belum tentu berupa bangunan).",
      "quiz": [
        {
          "sentence": "They just bought a new ___ near the beach.",
          "answer": "b"
        },
        {
          "sentence": "I want to go ___ now, I'm tired.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "borrow",
        "id": "meminjam (dari orang lain)"
      },
      "b": {
        "en": "lend",
        "id": "meminjamkan (ke orang lain)"
      },
      "tip": "\"borrow\" = kamu menerima pinjaman DARI orang lain, \"lend\" = kamu memberi pinjaman KE orang lain.",
      "quiz": [
        {
          "sentence": "Can I ___ your pen for a minute?",
          "answer": "a"
        },
        {
          "sentence": "Could you ___ me some money, please?",
          "answer": "b"
        }
      ]
    },
    {
      "a": {
        "en": "fun",
        "id": "menyenangkan (kata sifat/benda)"
      },
      "b": {
        "en": "funny",
        "id": "lucu (membuat tertawa)"
      },
      "tip": "\"fun\" = menyenangkan/asyik secara umum, \"funny\" = lucu, spesifik membuat orang tertawa.",
      "quiz": [
        {
          "sentence": "He told a really ___ joke.",
          "answer": "b"
        },
        {
          "sentence": "The party last night was so ___!",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "remember",
        "id": "mengingat"
      },
      "b": {
        "en": "memory",
        "id": "ingatan/kenangan (kata benda)"
      },
      "tip": "\"remember\" adalah kata kerja (mengingat), \"memory\" adalah kata benda (sebuah ingatan/kenangan).",
      "quiz": [
        {
          "sentence": "I have a wonderful ___ of that trip.",
          "answer": "b"
        },
        {
          "sentence": "Do you ___ my name?",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "hope",
        "id": "berharap (yakin mungkin terjadi)"
      },
      "b": {
        "en": "wish",
        "id": "berandai (sulit/tak mungkin terjadi)"
      },
      "tip": "\"hope\" untuk harapan yang realistis/mungkin terjadi, \"wish\" untuk pengandaian yang sulit atau tidak mungkin terjadi.",
      "quiz": [
        {
          "sentence": "I ___ I could fly like a bird.",
          "answer": "b"
        },
        {
          "sentence": "I ___ you feel better soon.",
          "answer": "a"
        }
      ]
    }
  ],
  "B1": [
    {
      "a": {
        "en": "during",
        "id": "selama (+ kata benda)"
      },
      "b": {
        "en": "while",
        "id": "selama (+ kalimat/klausa)"
      },
      "tip": "\"during\" diikuti kata benda (during the movie), \"while\" diikuti klausa/kalimat lengkap (while we watched the movie).",
      "quiz": [
        {
          "sentence": "She fell asleep ___ the meeting.",
          "answer": "a"
        },
        {
          "sentence": "He called me ___ I was cooking dinner.",
          "answer": "b"
        }
      ]
    },
    {
      "a": {
        "en": "for",
        "id": "selama (durasi waktu)"
      },
      "b": {
        "en": "since",
        "id": "sejak (titik waktu tertentu)"
      },
      "tip": "\"for\" diikuti durasi/lama waktu (for two years), \"since\" diikuti titik waktu tertentu kapan dimulainya (since 2020).",
      "quiz": [
        {
          "sentence": "I have lived here ___ 2019.",
          "answer": "b"
        },
        {
          "sentence": "She has studied English ___ three years.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "ill",
        "id": "sakit (lebih formal, British English)"
      },
      "b": {
        "en": "sick",
        "id": "sakit (umum, sering juga berarti mual)"
      },
      "tip": "\"ill\" lebih formal dan umum di British English untuk sedang sakit, \"sick\" lebih umum dipakai sehari-hari dan juga bisa berarti mual.",
      "quiz": [
        {
          "sentence": "I felt ___ after eating too much cake.",
          "answer": "b"
        },
        {
          "sentence": "She has been seriously ___ for a week.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "country",
        "id": "negara"
      },
      "b": {
        "en": "countryside",
        "id": "pedesaan"
      },
      "tip": "\"country\" = sebuah negara, \"countryside\" = area pedesaan yang jauh dari kota (bukan negara).",
      "quiz": [
        {
          "sentence": "They own a small farm in the ___.",
          "answer": "b"
        },
        {
          "sentence": "Indonesia is a beautiful ___.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "comfortable",
        "id": "nyaman (fisik/perasaan)"
      },
      "b": {
        "en": "convenient",
        "id": "praktis/memudahkan"
      },
      "tip": "\"comfortable\" = nyaman secara fisik atau perasaan, \"convenient\" = praktis/memudahkan dari segi waktu atau cara.",
      "quiz": [
        {
          "sentence": "This sofa is very ___ to sit on.",
          "answer": "a"
        },
        {
          "sentence": "Online shopping is very ___ for busy people.",
          "answer": "b"
        }
      ]
    },
    {
      "a": {
        "en": "practice",
        "id": "latihan (kata benda)"
      },
      "b": {
        "en": "practise",
        "id": "berlatih (kata kerja, British English)"
      },
      "tip": "Dalam British English, \"practice\" adalah kata benda (a good practice), \"practise\" adalah kata kerja (to practise English).",
      "quiz": [
        {
          "sentence": "I ___ speaking English every day.",
          "answer": "b"
        },
        {
          "sentence": "Regular ___ will help you improve.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "advice",
        "id": "nasihat (kata benda)"
      },
      "b": {
        "en": "advise",
        "id": "menasihati (kata kerja)"
      },
      "tip": "\"advice\" adalah kata benda (some advice), \"advise\" adalah kata kerja (to advise someone).",
      "quiz": [
        {
          "sentence": "Can you give me some ___ about this?",
          "answer": "a"
        },
        {
          "sentence": "The doctor will ___ you on the best treatment.",
          "answer": "b"
        }
      ]
    }
  ],
  "B2": [
    {
      "a": {
        "en": "effect",
        "id": "efek/dampak (kata benda)"
      },
      "b": {
        "en": "affect",
        "id": "mempengaruhi (kata kerja)"
      },
      "tip": "\"effect\" adalah kata benda (a big effect), \"affect\" adalah kata kerja (to affect something).",
      "quiz": [
        {
          "sentence": "The weather can ___ your mood.",
          "answer": "b"
        },
        {
          "sentence": "The new law had a big ___ on prices.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "bored",
        "id": "merasa bosan (perasaan diri)"
      },
      "b": {
        "en": "boring",
        "id": "membosankan (sifat sesuatu)"
      },
      "tip": "\"bored\" menjelaskan perasaanmu (I am bored), \"boring\" menjelaskan sifat sesuatu yang membuatmu bosan (the movie is boring).",
      "quiz": [
        {
          "sentence": "The lecture was so ___ that I fell asleep.",
          "answer": "b"
        },
        {
          "sentence": "I feel ___ when I have nothing to do.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "excited",
        "id": "merasa bersemangat (perasaan diri)"
      },
      "b": {
        "en": "exciting",
        "id": "membuat bersemangat (sifat sesuatu)"
      },
      "tip": "\"excited\" menjelaskan perasaanmu (I am excited), \"exciting\" menjelaskan sifat sesuatu yang membuatmu bersemangat (the game is exciting).",
      "quiz": [
        {
          "sentence": "The football match was really ___ to watch.",
          "answer": "b"
        },
        {
          "sentence": "I am so ___ about the trip tomorrow!",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "interested",
        "id": "merasa tertarik (perasaan diri)"
      },
      "b": {
        "en": "interesting",
        "id": "membuat tertarik (sifat sesuatu)"
      },
      "tip": "\"interested\" menjelaskan perasaanmu (I am interested), \"interesting\" menjelaskan sifat sesuatu yang membuat tertarik (the book is interesting).",
      "quiz": [
        {
          "sentence": "This documentary is very ___.",
          "answer": "b"
        },
        {
          "sentence": "I am ___ in learning new languages.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "rise",
        "id": "naik (tanpa objek)"
      },
      "b": {
        "en": "raise",
        "id": "menaikkan (dengan objek)"
      },
      "tip": "\"rise\" tidak butuh objek (prices rise), \"raise\" harus punya objek yang dinaikkan (raise your hand).",
      "quiz": [
        {
          "sentence": "Please ___ your hand if you have a question.",
          "answer": "b"
        },
        {
          "sentence": "Prices usually ___ during the holiday season.",
          "answer": "a"
        }
      ]
    },
    {
      "a": {
        "en": "possibility",
        "id": "kemungkinan (bisa terjadi/tidak)"
      },
      "b": {
        "en": "opportunity",
        "id": "kesempatan (peluang baik)"
      },
      "tip": "\"possibility\" = kemungkinan sesuatu terjadi (baik/buruk), \"opportunity\" = kesempatan atau peluang yang baik untuk diambil.",
      "quiz": [
        {
          "sentence": "This job is a great ___ for your career.",
          "answer": "b"
        },
        {
          "sentence": "There is a ___ that it will rain tomorrow.",
          "answer": "a"
        }
      ]
    }
  ]
};
