const loading = document.getElementById('loading_div');

setTimeout(function() {
    loading.style.opacity = 0;
}, 5000);
setTimeout(function() {
    loading.remove();
    window.location.href = '/index.html';
}, 7000);