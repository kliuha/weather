<template>
  <div>
    <NavPanel />
    <router-view></router-view>
  </div>
</template>

<script setup>
import NavPanel from "@/components/NavPanel.vue";

</script>

<style>
  body {
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
  }

  .loader {
    margin: auto;
  }

  .card {
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    padding: 20px; 
    margin: 10px; 
    transition: box-shadow 0.3s ease; 
  }

  .card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  input {
    border: none;
    outline: none;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  .container {
    max-width: 1200px;
    margin: auto;
  }
  .basic-button {
    border: 2px solid #741507;
    color: #741507;
    height: 30px;
  }

  .basic-button-right {
    margin-left: 10px;
  }

  .toggle-btn_right {
    border-left: none;
  }

  .toggle-btn:disabled {
    background-color: #74160777;
    color: #fff;
  }

  @media (max-width: 500px) {
    body {
      padding: 10px;
    }

    .card {
      padding: 10px; 
      margin: 5px; 
    }
  }
</style>
