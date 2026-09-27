// =========================================================
// WEDDING INVITATION — JAVASCRIPT
// =========================================================

const WEDDING_DATE = new Date("2026-10-21T10:00:00+07:00");

// ---------- Gambar fallback ----------
function imageFallback(img) {
  img.onerror = null;
  img.classList.add("image-placeholder");
  img.alt = "Ganti gambar ini di folder assets/images";
  img.src =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000">
        <rect width="100%" height="100%" fill="#ad9b83"/>
        <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle"
          fill="white" font-family="Georgia" font-size="38">GANTI FOTO</text>
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
          fill="white" font-family="Arial" font-size="20">assets/images</text>
      </svg>
    `);
}

// ---------- Nama tamu dari URL ----------
// Contoh:
// index.html?to=Indera%20Nata%20Raharja
// atau:
// index.html?nama=Indera%20Nata%20Raharja
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("to") || params.get("nama") || "Bapak/Ibu/Saudara/i";
}

document.getElementById("recipientName").textContent = getGuestName();

// ---------- Buka undangan ----------

const openButton = document.getElementById("openInvitation");
const mainContent = document.getElementById("mainContent");

// ---------- Musik ----------

const musicButton = document.getElementById("musicButton");
const audio = document.getElementById("weddingMusic");
const musicIcon = document.getElementById("musicIcon");

// Musik selalu mulai dari detik 15
const musicStartTime = 15;

// Menyimpan apakah musik sedang aktif sebelum halaman ditinggalkan
let musicWasPlaying = false;

// Status apakah musik pernah dimulai oleh pengguna
let musicStarted = false;

// ---------- Buka Undangan ----------

openButton.addEventListener("click", async () => {
  document.getElementById("cover").style.display = "none";
  mainContent.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant",
  });

  // Mulai musik dari detik 15
  try {
    audio.currentTime = musicStartTime;

    await audio.play();

    musicStarted = true;
    musicWasPlaying = true;

    musicButton.classList.add("playing");

    if (musicIcon) {
      musicIcon.textContent = "♫";
    }
  } catch (error) {
    console.error("Musik gagal diputar:", error);
  }
});

// ---------- Pengaturan Musik ----------

if (audio) {
  // Jika musik dimainkan sebelum detik 15,
  // otomatis lompat ke detik 15
  audio.addEventListener("play", function () {
    if (audio.currentTime < musicStartTime) {
      audio.currentTime = musicStartTime;
    }
  });

  // Jika lagu selesai,
  // ulang kembali dari detik 15
  audio.addEventListener("ended", async function () {
    audio.currentTime = musicStartTime;

    try {
      await audio.play();

      musicStarted = true;
      musicWasPlaying = true;

      if (musicButton) {
        musicButton.classList.add("playing");
      }

      if (musicIcon) {
        musicIcon.textContent = "♫";
      }
    } catch (error) {
      console.error("Musik gagal diputar ulang:", error);
    }
  });
}

// ---------- Tombol Musik ----------

if (musicButton && audio) {
  musicButton.addEventListener("click", async function () {
    // Jika musik sedang mati
    if (audio.paused) {
      try {
        // Jika belum mencapai detik 15,
        // mulai dari detik 15
        if (audio.currentTime < musicStartTime) {
          audio.currentTime = musicStartTime;
        }

        await audio.play();

        musicStarted = true;
        musicWasPlaying = true;

        musicButton.classList.add("playing");

        if (musicIcon) {
          musicIcon.textContent = "♫";
        }
      } catch (error) {
        console.error("Musik gagal diputar:", error);
      }
    } else {
      // Jika musik sedang menyala,
      // matikan musik
      audio.pause();

      musicWasPlaying = false;

      musicButton.classList.remove("playing");

      if (musicIcon) {
        musicIcon.textContent = "♪";
      }
    }
  });
}

// ---------- Musik saat keluar dari Chrome ----------

document.addEventListener("visibilitychange", async function () {
  // Pengguna keluar dari halaman / menekan Home
  if (document.hidden) {
    // Simpan status musik sebelum dihentikan
    musicWasPlaying = !audio.paused;

    // Matikan musik
    audio.pause();

    if (musicButton) {
      musicButton.classList.remove("playing");
    }

    if (musicIcon) {
      musicIcon.textContent = "♪";
    }
  }

  // Pengguna kembali ke Chrome
  else {
    // Hanya nyalakan kembali jika
    // musik memang sedang menyala sebelumnya
    if (musicWasPlaying && musicStarted) {
      try {
        await audio.play();

        if (musicButton) {
          musicButton.classList.add("playing");
        }

        if (musicIcon) {
          musicIcon.textContent = "♫";
        }
      } catch (error) {
        console.error("Musik gagal dilanjutkan:", error);
      }
    }
  }
});
// ---------- Countdown ----------
function updateCountdown() {
  const now = new Date();
  const distance = WEDDING_DATE - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Copy nomor rekening / alamat ----------
document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;

    try {
      await navigator.clipboard.writeText(value);
      const oldText = button.textContent;
      button.textContent = "✓ Berhasil Disalin";
      setTimeout(() => {
        button.textContent = oldText;
      }, 1500);
    } catch (error) {
      // Fallback untuk browser lama
      const textarea = document.createElement("textarea");
      textarea.value = value;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      button.textContent = "✓ Berhasil Disalin";
    }
  });
});

// ---------- Ucapan / komentar ----------
// Ini memakai localStorage agar langsung berfungsi tanpa database.
// Untuk website publik, nanti bisa diganti Firebase / Supabase / Google Sheets.
const COMMENTS_API =
  "https://script.google.com/macros/s/AKfycbz-yT0Bfn6XwGPlXYLIqc7_5DD_7ozl9fPhGWR6TJjBf_CH6S0ZeqLXjJnGmMbOg7NPxA/exec";

const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");
const commentCount = document.getElementById("commentCount");

// ---------- Keamanan teks ----------

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ---------- Menampilkan ucapan ----------

async function loadComments() {
  try {
    const response = await fetch(COMMENTS_API);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Gagal mengambil ucapan");
    }

    const comments = result.comments || [];

    commentCount.textContent = comments.length;

    commentList.innerHTML = comments
      .map(
        (comment) => `
          <article class="comment-item">
            <h4>${escapeHtml(comment.nama)}</h4>
            <p>${escapeHtml(comment.ucapan)}</p>
            <small>${escapeHtml(comment.kehadiran)}</small>
          </article>
        `,
      )
      .join("");
  } catch (error) {
    console.error("Gagal mengambil ucapan:", error);

    commentCount.textContent = "0";

    commentList.innerHTML = `
      <p class="comment-empty">
          
      </p>
    `;
  }
}

// ---------- Mengirim ucapan ----------

commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("commentName").value.trim();
  const text = document.getElementById("commentText").value.trim();
  const attendance = document.getElementById("attendance").value;

  if (!name || !text || !attendance) {
    alert("Mohon lengkapi nama, ucapan, dan kehadiran.");
    return;
  }

  // Cari tombol submit
  const submitButton = commentForm.querySelector('button[type="submit"]');

  const oldButtonText = submitButton ? submitButton.textContent : "";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Mengirim...";
  }

  try {
    const formData = new URLSearchParams();

    formData.append("nama", name);
    formData.append("ucapan", text);
    formData.append("kehadiran", attendance);

    await fetch(COMMENTS_API, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    // Bersihkan form
    commentForm.reset();

    // Langsung tampilkan ucapan yang baru
    const newComment = {
      nama: name,
      ucapan: text,
      kehadiran: attendance,
    };

    const article = document.createElement("article");
    article.className = "comment-item";

    article.innerHTML = `
  <h4>${escapeHtml(newComment.nama)}</h4>
  <p>${escapeHtml(newComment.ucapan)}</p>
  <small>${escapeHtml(newComment.kehadiran)}</small>
`;

    commentList.prepend(article);

    // Update jumlah ucapan
    const currentCount = parseInt(commentCount.textContent) || 0;
    commentCount.textContent = currentCount + 1;

    // Ambil ulang dari Google Sheets setelah 1 detik
    setTimeout(() => {
      loadComments();
    }, 1000);
  } catch (error) {
    console.error("Gagal mengirim ucapan:", error);

    alert("Ucapan gagal dikirim. Silakan coba lagi.");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = oldButtonText;
    }
  }
});

// ---------- Load ucapan saat halaman dibuka ----------

loadComments();

/* =========================================================
   WEDDING GIFT
   ========================================================= */

const giftButton = document.getElementById("giftButton");
const giftCards = document.getElementById("giftCards");

if (giftButton && giftCards) {
  giftButton.addEventListener("click", function () {
    const isOpen = giftCards.classList.contains("show");

    if (!isOpen) {
      giftCards.classList.add("show");

      giftButton.innerHTML = "🎁 Tutup";

      setTimeout(function () {
        giftCards.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 250);
    } else {
      giftCards.classList.remove("show");

      giftButton.innerHTML = "🎁 Klik Disini";
    }
  });
}

// ---------- Scroll Reveal Animation ----------

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-pop",
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});
