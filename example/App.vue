<script setup lang="ts">
import SquadPay from "vue-squadpay"
import {ref} from 'vue'



const params = ref({
    key: "sandbox_pk_570ae070b2d3c21cc0bf84416927b74e3323d0203686",
    email: "example@mail.com", // from HTML form
    amount: 5000, // no need to multiply by 100 for kobo, its taken care for you
    currencyCode: "NGN",
    reference: Date.now().toString(),
  })

  const onSuccess = (data: unknown) => {
    console.log(data)
  }

  const onLoad = () => {
    console.log("module loaded")
  }

  const onError = () => {
    console.log("Error occured")
  }

   const onClose = () => {
    console.log("Widget Closed")
  }
</script>

<template>
  <SquadPay text="Pay now" :params="params" class="btn btn-primary" @err="onError" @close="onClose" @success="onSuccess" @loaded="onLoad" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
