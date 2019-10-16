<template>
  <div class="wrap">
    <div class="content">
      <div class="form form-forgot-pw form-forgot-pw-success">
        <p class="center">
          <img alt src="images/icon-lock.png" />
        </p>
        <div class="box-info-forgot-pw">
          <p>Thanks. Please check your mail for a link to reset password</p>
        </div>
      </div>
      <div class="box-back">
        <a @click="$router.push({name:'login'})" title>Back to log in</a>
      </div>
    </div>
  </div>
</template>