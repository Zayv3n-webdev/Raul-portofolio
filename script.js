var typed = new Typed(".typing", {
    strings: [
        "Student at SMK Negeri 2 Tanjung Selor",
        "RPL Student",
        "Keep learning, keep growing."
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const playBtn = document.getElementById("playBtn");
const song = document.getElementById("mySong");

playBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    playBtn.textContent = "⏹ Stop Song"; // ganti icon jadi stop
  } else {
    song.pause();
    song.currentTime = 0; // reset ke awal
    playBtn.textContent = "🎵 Play Song"; // balik lagi ke play
  }
});

// kalau lagu selesai otomatis balik ke Play
song.addEventListener("ended", () => {
  playBtn.textContent = "🎵 Play Song";
});

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        document.querySelector("header nav a[href*='" + id + "']").classList.add("active");
      });
    }
  });
};


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusMsg = document.getElementById("status-msg");
  if (!form || !statusMsg) return; // aman kalau elemen belum ada

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Reset status
    statusMsg.className = "status-msg";
    statusMsg.textContent = "Sending...";
    statusMsg.classList.add("show");

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        statusMsg.textContent = "✅ Message sent successfully!";
        statusMsg.classList.add("success");
        form.reset();
      } else {
        // coba baca pesan error dari Formspree
        let msg = "❌ Failed to send message. Try again!";
        try {
          const j = await res.json();
          if (j && j.errors && j.errors[0]?.message) msg = `❌ ${j.errors[0].message}`;
        } catch {}
        statusMsg.textContent = msg;
        statusMsg.classList.add("error");
      }
    } catch (err) {
      statusMsg.textContent = "⚠️ Network error. Please try again!";
      statusMsg.classList.add("error");
    } finally {
      // auto-hide setelah 5 detik
      setTimeout(() => {
        statusMsg.classList.remove("show");
        // tunggu transisi selesai sebelum sembunyikan
        setTimeout(() => (statusMsg.style.display = "none"), 400);
        // kembalikan display agar siap dipakai lagi
        setTimeout(() => (statusMsg.style.display = ""), 500);
      }, 5000);
    }
  });
});

AOS.init({
  once: true, // animasi hanya sekali
  duration: 1000, // default durasi
  easing: "ease-in-out",
});

