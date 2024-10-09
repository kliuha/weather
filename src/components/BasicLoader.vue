<template>
  <div class="progress progress--md">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
  </div>
</template>
<script setup>
</script>

<style scoped>
.progress {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  backface-visibility: hidden;
}

  .progress--md {
    gap: 10px;
    width: 300px;
    margin-top: 5%;
  }

  .progress--md .inner {
      height: 12px;
      width: 12px;
      animation: md 1.2s ease-in infinite;
    }

.inner:nth-child(1),
.inner:nth-child(2),
.inner:nth-child(3) {
  border-radius: 100%;
  background-color: #ff6f00;
}

.inner:nth-child(1) {
  animation-delay: 0.35s;
}

.inner:nth-child(2) {
  animation-delay: 0.55s;
}

.inner:nth-child(3) {
  animation-delay: 0.75s;
}

@keyframes md {
  0% {
    transform: translateY(0px);
    opacity: 1;
  }

  50% {
    transform: translateY(-15px);
    opacity: 0.5;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
