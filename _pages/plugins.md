---
layout: page
title: Plugins
permalink: /plugins/
---

<style>
.plugin-tabs {
  display: flex;
  border-bottom: 2px solid #666;
  margin-bottom: 20px;
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
  <button class="tab-button active" onclick="showTab(event, 'riff-vst')">Riff VST</button>
  <button class="tab-button" onclick="showTab(event, 'riff-live')">Riff Max for Live</button>
  <button class="tab-button" onclick="showTab(event, 'drummer-live')">Drummer Max for Live</button>
</div>

<div id="riff-vst" class="tab-content active">
  <h2>Riff VST Plugin</h2>
  
  <img src="/images/riff-v0.8.0.png" alt="Riff VST Plugin">
  
  <p><strong>Riff</strong> is a VST3 plugin that brings Scribbletune's pattern-based music generation directly into your DAW. It's also available as an AU plugin and a standalone app for Mac OS and Windows.</p>
  
  <h4>Features</h4>
  
  <ul>
    <li>Pattern-based melody and rhythm generation</li>
    <li>Real-time parameter control</li>
    <li>Integration with popular DAWs</li>
    <li>Built on Scribbletune's proven algorithms</li>
  </ul>
  
  <h4>Download</h4>
  
  <ul>
    <li><a href="https://drive.google.com/file/d/1wPKkUUOQm4TvESknDTh9-nWHUUsZaW4Y/view?usp=drive_link">Download Riff v0.8.0 for Mac</a></li>
    <li><a href="https://drive.google.com/file/d/16IbCYZZI2HeX7k0CqvLbnGL-SrFmma5X/view?usp=drive_link">Download Riff v0.8.0 for Windows</a></li>
  </ul>
</div>

<div id="riff-live" class="tab-content">
  <h2>Riff Max for Live Device</h2>
  
  <img src="/images/riff4live11.png" alt="Riff Max for Live device">
  
  <p>A Max for Live version of Riff is available for Ableton Live 11.</p>
  
  <ul>
    <li><a href="https://drive.google.com/file/d/1GjoluU6yObhf_d-CvLnhKSYNNm108STW/view?usp=sharing">Download Riff v0.8.0 Max for Live for Ableton Live 11</a></li>
  </ul>
</div>

<div id="drummer-live" class="tab-content">
  <h2>Drummer Max for Live Device</h2>
  
  <p>A Max for Live device that generates drum patterns using Scribbletune's pattern language and concepts.</p>
  
  <img src="/images/drummer.png" alt="Drummer - Max for Live device">
  
  <p>Instead of algorithmic generation or generic loops, Drummer is built around the "260 Drum Machine Patterns" book extending it in interesting ways.</p>
  
  <h4>Key features:</h4>
  
  <ul>
    <li>260+ authentic patterns across 18+ genres (rock, funk, reggae, jazz, hip-hop, etc.)</li>
    <li>Intelligent variation engine that adds fills, flams, and human feel</li>
    <li>Genre-specific selection or full random mode</li>
    <li>Pattern complexity knob (minimal grooves → complex fills)</li>
    <li>Perfect integration with Live's drum devices and NI Battery</li>
    <li>Performance features like "remove kick" for live use</li>
  </ul>
  
  <ul>
    <li>Download (for Ableton Live 11): <a href="https://drive.google.com/file/d/1YuiqKTqj7lbhMboKzF_Yx23qalmeQ8SY/view?usp=sharing">https://drive.google.com/file/d/1YuiqKTqj7lbhMboKzF_Yx23qalmeQ8SY/view?usp=sharing</a></li>
  </ul>
  
  <p><em>Please note: Support for Ableton Live 12 is coming soon.</em></p>
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
  evt.currentTarget.classList.add("active");
}
</script>
