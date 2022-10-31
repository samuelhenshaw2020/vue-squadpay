<template>
      <button @click="Pay">
          <slot>{{text}}</slot>
      </button>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import useISLoader from "./script-loader";
import {Squad} from "./typings"

declare var squad: any;

export default defineComponent({
  props: ["text", "params"],
  emits: ["close", "success", "loaded", "err"],
  setup(props, { emit }) {
    const loaded = ref<boolean>(false);

    async function loadScript() {
      try {
        loaded.value = await useISLoader();
      } catch (error) {
        loaded.value = false;
        onError();
      }
    }

    const onClose = () => {
        emit('close');
    }

    const onSuccess = (data: unknown) => {
        emit('success', data)
    }

    const onLoad = () => {
        emit('loaded')
    }

    const onError = () => {
        emit('err')
    }

    async function Pay() {

      if (loaded.value == false) return;

      const _params = {
        onClose: onClose,
        onLoad: onLoad,
        onSuccess: onSuccess,
        //required paramaters
        key:  props.params.key,
        email: props.params.email,
        amount: props.params.amount * 100,
        currency_code: props.params.currencyCode || "NGN",
        //non required parameters
        transaction_ref: props.params.reference || null,
        payment_channels: props.params.paymentChannels || null,
        Customer_name: props.params.customerName || null,
        callback_url: props.params.callbackUrl || null,
        metadata: props.params.metaData || null,
        pass_charge: props.params.passCharge || false,
      };

      const squadInstance: Squad = new squad(_params);
      squadInstance.setup();
      squadInstance.open();
    }

    onBeforeMount(() => {
      loadScript();
    })

    return { Pay };
  }
})
</script>
