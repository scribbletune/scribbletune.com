---
layout: page
title: Plugins
permalink: /plugins/
---

<style>
 .tab-content a {
    display: inline-block;
    background-color: #000;
    color: white !important;
    padding: 10px 16px;
    text-decoration: none !important;
    border-radius: 5px;
    font-weight: 500;
    margin: 4px 8px 4px 0;
    transition: background-color 0.3s ease;
  }
  
  .tab-content a:hover {
    background-color: #333;
    transform: translateY(-1px);
  }

  .video-wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    margin: 20px 0;
  }
  
  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
.plugin-tabs {
  display: flex;
  border-bottom: 2px solid #666;
  margin-bottom: 20px;
  position: relative;
  z-index: 1000;
}

.tab-button {
  padding: 12px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #333;
}

.tab-button.active {
  color: white;
  background-color: #333;
  border-bottom-color: #000;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

Explore plugins and extensions that extend Scribbletune's concepts and pattern language into different music production environments.

<div class="plugin-tabs">
  <button class="tab-button active" onclick="showTab(event, 'riff-vst')">Riff VST3/AU Plugin</button>
  <button class="tab-button" onclick="showTab(event, 'riff-live')">Riff Max for Live</button>
  <button class="tab-button" onclick="showTab(event, 'drummer-vst')">Drummer VST3/AU Plugin</button>
  <button class="tab-button" onclick="showTab(event, 'drummer-live')">Drummer Max for Live</button>
</div>

<div id="riff-vst" class="tab-content active">
  <h2>Riff VST3/AU Plugin v0.8.0</h2>
  
  <p><strong>Riff</strong> is a VST3/AU plugin that brings Scribbletune's pattern-based music generation directly into your DAW. It's also available as an AU plugin and a standalone app for Mac OS and Windows.</p>
  
  <img src="/images/riff-v0.8.0.png" alt="Riff VST3 Plugin">

  <p>
    <a href="https://drive.google.com/file/d/1wPKkUUOQm4TvESknDTh9-nWHUUsZaW4Y/view?usp=drive_link">Download Riff for Mac</a>
  <br>
    <a href="https://drive.google.com/file/d/16IbCYZZI2HeX7k0CqvLbnGL-SrFmma5X/view?usp=drive_link">Download Riff for Windows</a>
  </p>
  
  
  <div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/IlwI-7ojcyI" title="Riff VST3/AU Plugin Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  
  <h4>Features</h4>
  
  <ul>
    <li>Pattern-based melody and rhythm generation</li>
    <li>Real-time parameter control</li>
    <li>Integration with popular DAWs</li>
    <li>Built on Scribbletune's proven algorithms</li>
  </ul>
</div>

<div id="riff-live" class="tab-content">
  <h2>Riff Max for Live Device</h2>

  <p>Transform your music production workflow with Riff, a sophisticated Max for Live device that generates realistic drum sequences and melodic patterns. Built with TypeScript and optimized for professional music creation.</p>

  <img src="/images/riff4live11.png" alt="Riff Max for Live device">

  <div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/cA_SYO2TI3M" title="Riff Max for Live Device Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>

  <p><a href="https://drive.google.com/file/d/1GjoluU6yObhf_d-CvLnhKSYNNm108STW/view?usp=sharing">Download Riff Max for Live device</a> (works with Ableton Live 11 & 12)</p>
  
  <ul>
    <li><strong>Melodic Riff Generation</strong> - Create melodic patterns with scale and chord progression support for complete musical arrangements</li>
    <li><strong>Real-Time Integration</strong> - Seamlessly generates MIDI clips directly in Ableton Live for immediate use in your productions OR live performance</li>
    <li><strong>Manual and preset pattern generation</strong> - Enter patterns manually or chose a preset for generation</li>
  </ul>
</div>

<div id="drummer-vst" class="tab-content">
  <h2>Drummer VST3/AU Plugin</h2>
  
  <p><strong>Drummer</strong> is a VST3/AU plugin that generates drum patterns using Scribbletune's pattern language and concepts. It's also available as an AU plugin and a standalone app for Mac OS and Windows.</p>
  
  <img src="/images/drummer-vst.png" alt="Drummer VST3/AU Plugin">

  <p>
    <a href="https://drive.google.com/file/d/1FknTYhUTATRqrbprQO7LwKLNtMSMNO1x/view?usp=sharing">Download Drummer VST3/AU for Mac</a>
  <br>
    <a href="https://drive.google.com/file/d/1iLJVHdXyFhUqYDjIGrtFlIJseSo17YKd/view?usp=sharing">Drummer VST3/Clap/exe for Windows</a>
  <br>
    <h6>Download Issue:</h6> In case Windows Defender prevents the download because of the standalone exe provided in it, you can download VST and Clap separately.
  <ul>
    <li><a href="https://drive.google.com/file/d/1nDIMd1lkdk6Fa2m-T5Icrmul6Br5X7_b/view?usp=sharing">VST 3</a></li>
    <li><a href="https://drive.google.com/file/d/1huIBme_8a6th9Cv0GC1QoZUgI3XXotHQ/view?usp=sharing">Clap (for Bitwig)</a></li>
  </ul>
  </p>

  <div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/nB3zI5J2Yls" title="Drummer VST3/AU Plugin Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  
  <h4>Key features:</h4>
  
  <ul>
    <li>260+ authentic patterns across 18+ genres (rock, funk, reggae, jazz, hip-hop, etc.)</li>
    <li>Intelligent variation engine that adds fills, flams, and human feel</li>
    <li>Genre-specific selection or full random mode</li>
    <li>Pattern complexity knob (minimal grooves → complex fills)</li>
    <li>Perfect integration with popular DAWs and drum devices</li>
    <li>Performance features like "remove kick" for live use</li>
    <li>Real-time parameter control</li>
    <li>Built on Scribbletune's proven algorithms</li>
  </ul>
</div>

<div id="drummer-live" class="tab-content">
  <h2>Drummer Max for Live Device</h2>
  
  <p>A Max for Live device that generates drum patterns using Scribbletune's pattern language and concepts.</p>
  
  <img src="/images/drummer.png" alt="Drummer - Max for Live device">

  <p><a href="https://maxforlive.com/library/device.php?id=13431">Download Drummer Max for Live Device</a> (works with Ableton Live 11 & 12)</p>
  
  <p>Instead of algorithmic generation or generic loops, Drummer is built around the "260 Drum Machine Patterns" book extending it in interesting ways.</p>

  <div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/H76q-O8APdI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
  
  <h4>Key features:</h4>
  
  <ul>
    <li>260+ authentic patterns across 18+ genres (rock, funk, reggae, jazz, hip-hop, etc.)</li>
    <li>Intelligent variation engine that adds fills, flams, and human feel</li>
    <li>Genre-specific selection or full random mode</li>
    <li>Pattern complexity knob (minimal grooves → complex fills)</li>
    <li>Perfect integration with Live's drum devices and NI Battery</li>
    <li>Performance features like "remove kick" for live use</li>
  </ul>
</div>

<script>
function showTab(evt, tabName) {
  var i, tabcontent, tablinks;
  
  // Hide all tab contents
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }
  
  // Remove active class from all tab buttons
  tablinks = document.getElementsByClassName("tab-button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  
  // Show the selected tab and mark button as active
  document.getElementById(tabName).classList.add("active");
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  } else {
    // Find and activate the correct button when called programmatically
    var buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(function(button) {
      if (button.getAttribute('onclick').includes(tabName)) {
        button.classList.add('active');
      }
    });
  }
  
  // Update URL hash
  window.location.hash = tabName;
}

function loadTabFromHash() {
  var hash = window.location.hash.substring(1);
  var validTabs = ['riff-vst', 'riff-live', 'drummer-vst', 'drummer-live'];
  
  if (hash && validTabs.includes(hash)) {
    showTab(null, hash);
    
    // Scroll to tab buttons instead of content
    setTimeout(function() {
      var tabsContainer = document.querySelector('.plugin-tabs');
      if (tabsContainer) {
        tabsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }
}

// Load tab based on hash when page loads
document.addEventListener('DOMContentLoaded', function() {
  loadTabFromHash();
});

// Handle browser back/forward navigation
window.addEventListener('hashchange', function() {
  loadTabFromHash();
});
</script>
