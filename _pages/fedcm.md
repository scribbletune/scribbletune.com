---
layout: page
title: Fed CM API
permalink: /fedcm/
---

This a unlisted testing page for Fed CM API using PayPal as the iDP. Make sure you are logged into PayPal and then click this button to begin.

<div id="root">
  <button id="btn">Try FedCM now!</button>
</div>

<script>
  (function(){
    const root = document.querySelector('#root');
    
    root.addEventListener('click', async (e) => {
      if (e.target.id !== 'btn') return;
      root.innerHTML = 'Any moment now...';
      try {
        const cred = await navigator.credentials.get({
          identity: {
            providers: [{
              configURL: "https://www.paypal.com/idapps/fedcm/fedcm.json",
              clientId: "DOESNT MATTER FOR NOW",
            }],
          }
        });
        const user = JSON.parse(cred.token);
        root.innerHTML = `<h6>Welcome ${user.given_name}<br>Logged in as ${user.email}`;
      } catch (e) {
        console.log(e);
        root.innerHTML = '<button id="btn">Try again</button>';
      }
    });
  }())
</script>