const loading = document.getElementById('loading_div');

setTimeout(function() {
    loading.style.opacity = 0;
}, 2000);
setTimeout(function() {
    loading.remove();
    window.location.href = '/Website/index.html';
}, 3000);