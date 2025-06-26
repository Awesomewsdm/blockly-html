// Combined toggle and resize functionality
const toggleWebsite = document.getElementById('toggleWebsite');
const toggleCode = document.getElementById('toggleCode');
const websiteFrame = document.getElementById('websiteFrame');
const sourcecode = document.getElementById('sourcecode');
const websiteResize = document.getElementById('websiteResize');

let websiteHeight = '45%';
let codeHeight = '45%';

toggleWebsite.addEventListener('click', function() {
  websiteFrame.classList.toggle('collapsed');
  websiteResize.classList.toggle('collapsed');
  toggleWebsite.textContent = websiteFrame.classList.contains('collapsed') ? '▼' : '▲';
  
  if (websiteFrame.classList.contains('collapsed')) {
    document.getElementById('container').style.gridTemplateRows = `50px 30px 0 ${codeHeight}`;
  } else {
    document.getElementById('container').style.gridTemplateRows = `50px 30px ${websiteHeight} ${codeHeight}`;
  }
});

toggleCode.addEventListener('click', function() {
  sourcecode.classList.toggle('collapsed');
  toggleCode.textContent = sourcecode.classList.contains('collapsed') ? '▼' : '▲';
  
  if (sourcecode.classList.contains('collapsed')) {
    document.getElementById('container').style.gridTemplateRows = `50px 30px ${websiteHeight} 0`;
  } else {
    document.getElementById('container').style.gridTemplateRows = `50px 30px ${websiteHeight} ${codeHeight}`;
  }
});

// Resize functionality
let isResizing = false;

websiteResize.addEventListener('mousedown', function(e) {
  if (websiteFrame.classList.contains('collapsed')) return;
  
  isResizing = true;
  document.body.style.cursor = 'row-resize';
  e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
  if (!isResizing) return;
  
  const container = document.getElementById('container');
  const title = document.getElementById('title');
  
  const titleRect = title.getBoundingClientRect();
  const newHeight = e.clientY - titleRect.bottom;
  const newHeightPercent = (newHeight / window.innerHeight) * 100;
  
  websiteHeight = `${newHeightPercent}%`;
  container.style.gridTemplateRows = `50px 30px ${websiteHeight} ${codeHeight}`;
});

document.addEventListener('mouseup', function() {
  isResizing = false;
  document.body.style.cursor = '';
});