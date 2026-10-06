(function(){

  // ---- starfield ----
  var starfield = document.getElementById('starfield');
  var ns = 'http://www.w3.org/2000/svg';
  for (var i = 0; i < 26; i++) {
    var s = document.createElementNS(ns, 'circle');
    var x = Math.random() * 400;
    var y = Math.random() * 380;
    var r = Math.random() * 1.4 + 0.6;
    s.setAttribute('cx', x);
    s.setAttribute('cy', y);
    s.setAttribute('r', r);
    s.setAttribute('class', 'star');
    s.style.animationDelay = (Math.random() * 3.6).toFixed(2) + 's';
    starfield.appendChild(s);
  }

  // ---- book data ----
  var palette = ['#3B3162', '#4A3B27', '#2F4A46', '#5C3A46', '#33405C', '#4A3350'];
  var books = [
    { title: 'O Peso das Marés', author: 'Iracema Volt', genre: 'ficcao', label: 'Ficção científica' },
    { title: 'Sete Chaves para Nínive', author: 'Doran Fell', genre: 'fantasia', label: 'Fantasia' },
    { title: 'Arquivo 33', author: 'C. Andrade Reis', genre: 'distopia', label: 'Distopia' },
    { title: 'A Última Colheita Solar', author: 'Mireille Tanaka', genre: 'ficcao', label: 'Ficção científica' },
    { title: 'O Jardim de Vidro Negro', author: 'Selin Marques', genre: 'fantasia', label: 'Fantasia' },
    { title: 'Cidade sem Domingo', author: 'Yuri Bastos', genre: 'distopia', label: 'Distopia' },
    { title: 'Constelação Menor', author: 'Nadia Prokop', genre: 'ficcao', label: 'Ficção científica' },
    { title: 'A Rainha de Ferrugem', author: 'Bela Duarte', genre: 'fantasia', label: 'Fantasia' }
  ];

  var shelf = document.getElementById('shelf');
  books.forEach(function(b, idx){
    var el = document.createElement('div');
    el.className = 'book';
    el.dataset.genre = b.genre;
    el.innerHTML =
      '<div class="cover" style="background:' + palette[idx % palette.length] + '">' +
        '<div class="spine-title" style="color:#F1ECDF">' + b.title + '</div>' +
      '</div>' +
      '<div class="author">' + b.author + '</div>' +
      '<div class="genre-tag">' + b.label + '</div>';
    shelf.appendChild(el);
  });

  // ---- filters ----
  var chips = document.querySelectorAll('.chip');
  chips.forEach(function(chip){
    chip.addEventListener('click', function(){
      chips.forEach(function(c){ c.setAttribute('aria-pressed', 'false'); });
      chip.setAttribute('aria-pressed', 'true');
      var genre = chip.dataset.genre;
      document.querySelectorAll('.book').forEach(function(book){
        var show = genre === 'todos' || book.dataset.genre === genre;
        book.classList.toggle('is-hidden', !show);
      });
    });
  });

  // ---- shelf scroll controls ----
  document.getElementById('shelf-prev').addEventListener('click', function(){
    shelf.scrollBy({ left: -320, behavior: 'smooth' });
  });
  document.getElementById('shelf-next').addEventListener('click', function(){
    shelf.scrollBy({ left: 320, behavior: 'smooth' });
  });

  // ---- newsletter form ----
  var form = document.getElementById('signup-form');
  var msg = document.getElementById('signup-msg');
  var emailInput = document.getElementById('signup-email');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var value = emailInput.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      msg.textContent = 'Isso não parece um e-mail válido — confira e tente de novo.';
      msg.className = 'form-msg err';
      emailInput.focus();
      return;
    }
    msg.textContent = 'Pronto — o próximo envio chega em breve em ' + value + '.';
    msg.className = 'form-msg ok';
    form.reset();
  });

})();
