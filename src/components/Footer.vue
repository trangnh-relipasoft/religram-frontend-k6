<template>
  <div class="footer">
    <div class="post-event">
      <span class="icon-home">
        <a @click="$router.push({name: 'home'})" title>
          <img src="images/footer-icon-home.png" alt />
        </a>
      </span>
      <span class="icon-search">
        <a title>
          <img src="images/footer-icon-search.png" alt />
        </a>
      </span>
      <span class="icon-plus">
        <a title>
          <img src="images/footer-icon-plus.png" alt />
        </a>
      </span>
      <span class="post-icon-like">
        <a title></a>
      </span>
      <span class="icon-my-page">
        <a @click="$router.push({name: 'profile'})" title>
          <img src="images/footer-icon-my-page.png" alt />
        </a>
      </span>
    </div>
  </div>
</template>