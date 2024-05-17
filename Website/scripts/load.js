const loading = document.getElementById('loading_div');

setTimeout(function() {
    loading.style.opacity = 0;
}, 2000);
setTimeout(function() {
    loading.remove();
    window.location.href = 'index.html';
}, 3000);